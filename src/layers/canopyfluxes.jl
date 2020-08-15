###############################################################################
#
# Update canopy fluxes
#
###############################################################################
"""
    canopy_fluxes!(can::Canopy4RT{FT}, can_opt::CanopyOpticals{FT}, can_rad::CanopyRads{FT}, in_rad::IncomingRadiation{FT}, soil_opt::SoilOpticals{FT}, leaf_array::Array{LeafBios{FT},1}, wl_set::WaveLengths{FT}, rt_con::RTContainer) where {FT<:AbstractFloat}

Computes a variety of integrated fluxes from the spectrally resolved
    computations in the short-wave Canopy RT (e.g. absorbed soil radiation,
    absorbed direct and diffuse PAR by layer (and angles for direct), net
    direct and diffuse energy balance per layer), given
- `can` A [`Canopy4RT`](@ref) struct
- `can_opt` A [`CanopyOpticals`](@ref) struct
- `can_rad` A [`CanopyRads`](@ref) struct
- `in_rad` An [`IncomingRadiation`](@ref) struct
- `soil_opt` A [`SoilOpticals`](@ref) type struct for soil optical properties
- `leaf_array` An array of [`LeafBios`](@ref) type struct (i.e. leaf optical
    properties can change with canopy height)
- `wl_set` An [`WaveLengths`](@ref) type struct
- `rt_con` [`RTContainer`](@ref) type container
"""
function canopy_fluxes!(
            can::Canopy4RT{FT},
            can_opt::CanopyOpticals{FT},
            can_rad::CanopyRads{FT},
            in_rad::IncomingRadiation{FT},
            soil_opt::SoilOpticals{FT},
            leaf_array::Array{LeafBios{FT},1},
            wl_set::WaveLengths{FT},
            rt_con::RTContainer{FT}
) where {FT<:AbstractFloat}
    # 1. unpack variables from structures
    @unpack iLAI, nLayer = can;
    @unpack albedo_SW, emsvty_SW = soil_opt;
    @unpack dWL, dWL_iPAR, iPAR, WL, WL_iPAR = wl_set;
    cf_con = rt_con.cf_con;

    # 2. compute some useful variables
    fac  = FT(1e-3);

    # 3. Compute some fluxes, can be done separately if needed
    #    this is absolute fluxes now, for the entire soil
    last_ind_cr            = lastindex(can_rad.E_down,2);
    cf_con.abs_wave       .= view(can_rad.E_down, :, last_ind_cr) .* emsvty_SW;
    can_rad.RnSoil_diffuse = fac * fast∫!(cf_con.abs_wave, dWL);
    cf_con.abs_wave       .= view(can_opt.Es_, :, last_ind_cr) .* emsvty_SW;
    can_rad.RnSoil_direct  = fac * fast∫!(cf_con.abs_wave, dWL);
    can_rad.RnSoil         = can_rad.RnSoil_direct + can_rad.RnSoil_diffuse;

    # 4. Normalization factor for leaf direct PAR
    #    weighted sum has to be 1 to conserve net SW direct
    #    Direct PAR is normalized by layer Ps value
    mul!(cf_con.absfs_lidf, can_opt.absfs', can.lidf);
    normi       = 1 / mean(cf_con.absfs_lidf);
    cf_con.lPs .= (view(can_opt.Ps, 1:nLayer  ) .+
                  view(can_opt.Ps, 2:nLayer+1)) ./ 2;
    @unpack lPs = cf_con;

    @inbounds for j in 1:nLayer
        if length(leaf_array)>1
            cf_con.kChlrel .= view(leaf_array[j].kChlrel, iPAR);
        else
            cf_con.kChlrel .= view(leaf_array[1].kChlrel, iPAR);
        end
        # for diffuse PAR
        cf_con.E_iPAR .= view(can_rad.netSW_shade, iPAR, j);
        e2phot!(WL_iPAR, cf_con.E_iPAR, cf_con.PAR_diff);
        cf_con.PAR_diff .*= fac / iLAI;
        # for direct PAR
        cf_con.E_iPAR .= view(can_rad.netSW_sunlit, iPAR, j);
        e2phot!(WL_iPAR, cf_con.E_iPAR, cf_con.PAR_dir);
        cf_con.PAR_dir .*= fac / iLAI;
        cf_con.PAR_dir .+= cf_con.PAR_diff;
        # for leaf absorbed
        cf_con.PAR_diffCab .= cf_con.kChlrel .* cf_con.PAR_diff;
        cf_con.PAR_dirCab  .= cf_con.kChlrel .* cf_con.PAR_dir;

        # Absorbed PAR per leaf for shaded, PAR_diff and PAR_dir changed!
        _dif = fast∫!(cf_con.PAR_diff, dWL_iPAR);
        _dir = fast∫!(cf_con.PAR_dir, dWL_iPAR) * normi;
        can_rad.absPAR_shade[j] = _dif;
        can_rad.absPAR_sun[:,:,j] .= can_opt.absfs .* _dir;

        # absorbed PAR for photosynthesis
        _difCab = fast∫!(cf_con.PAR_diffCab, dWL_iPAR);
        _dirCab = fast∫!(cf_con.PAR_dirCab , dWL_iPAR) * normi;
        can_rad.absPAR_shadeCab[j] = _difCab;
        can_rad.absPAR_sunCab[:,:,j] .= can_opt.absfs .* _dirCab;
    end

    # 5. Total PAR
    # TODO considering remove this part, if we are not using it
    #    re-use the PAR_dir and PAR_diff in the rt_con
    cf_con.E_iPAR .= view(in_rad.E_direct, iPAR);
    e2phot!(WL_iPAR, cf_con.E_iPAR, cf_con.PAR_dir);
    cf_con.E_iPAR .= view(in_rad.E_diffuse, iPAR);
    e2phot!(WL_iPAR, cf_con.E_iPAR, cf_con.PAR_diff);
    can_rad.incomingPAR_direct  = fac * fast∫!(cf_con.PAR_dir , dWL_iPAR);
    can_rad.incomingPAR_diffuse = fac * fast∫!(cf_con.PAR_diff, dWL_iPAR);
    can_rad.incomingPAR         = can_rad.incomingPAR_diffuse +
                                  can_rad.incomingPAR_direct;
    @inbounds for i in 1:nLayer
        cf_con.E_all .= view(can_rad.netSW_shade, :, i);
        can_rad.intNetSW_shade[i]  = fast∫!(cf_con.E_all, dWL) * fac / iLAI;
        cf_con.E_all .= view(can_rad.netSW_sunlit, :, i);
        can_rad.intNetSW_sunlit[i] = fast∫!(cf_con.E_all, dWL) *
                                     fac / iLAI / lPs[i] +
                                     can_rad.intNetSW_shade[i];
    end

    return nothing
end
