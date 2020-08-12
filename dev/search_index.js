var documenterSearchIndex = {"docs":
[{"location":"#CanopyRadiation.jl","page":"Home","title":"CanopyRadiation.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"CanopyRadiation module refactored from original CliMA Land model.","category":"page"},{"location":"#Usage","page":"Home","title":"Usage","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"using CanopyRadiation\n\ninitialize_rt_module(n_layer=20, LAI=Float32(3.0));","category":"page"},{"location":"API/#CanopyRadiation","page":"API","title":"CanopyRadiation","text":"","category":"section"},{"location":"API/","page":"API","title":"API","text":"CurrentModule = CanopyRadiation","category":"page"},{"location":"API/#Types","page":"API","title":"Types","text":"","category":"section"},{"location":"API/","page":"API","title":"API","text":"Canopy4RT\nCanopyOpticals\nCanopyRads\nIncomingRadiation\nLeafBios\nLeafOpticals\nSoilOpticals\nSolarAngles\nWaveLengths\ncreate_canopy_opticals\ncreate_incoming_radiation\ncreate_leaf_bios\ncreate_leaf_opticals","category":"page"},{"location":"API/#CanopyRadiation.Canopy4RT","page":"API","title":"CanopyRadiation.Canopy4RT","text":"struct Canopy4RT\n\nA canopy struct for the radiation transfer module\n\nFields\n\nnLayer\nNumber of canopy layers\nLAI\nLeaf Area Index\nΩ\nClumping factor\nclump_a\nStructure factor a\nclump_b\nStructure factor b\nleaf_width\nLeaf width\nhc\nVegetation height\nLIDFa\nLeaf Inclination\nLIDFb\nVariation in leaf inclination\nhot\nHotSpot parameter (still need to check!)\nheight\nCanopy height [m]\nz0m\nCanopy roughness [m]\nz0h\nTree roughtnes [m]\nd\nCanopy displacement height [m]\nCd\nm/sqrt(s) turbulent transfer coefficient\nlitab\nList of mean inclination angles [°]\nlitab_bnd\nList of inclination angle boundaries [°]\nlazitab\nList of mean azimuth angles [°]\nlidf\nInclination angles weight distribution\nxl\nList of level location (level = layer + 1)\nxl_e\nExp(xl)\ndx\n1/nlayers\n\n\n\n\n\n","category":"type"},{"location":"API/#CanopyRadiation.CanopyOpticals","page":"API","title":"CanopyRadiation.CanopyOpticals","text":"struct CanopyOpticals{FT}\n\nA struct for canopy optical properties using Array\n\nFields\n\nnWL\nNumber of wave lengths\nnLayer\nNumber of canopy layers\nnAzi\nNumber of azimuth angles\nnIncl\nNumber of inclination agles\nsdb\nSolar -> Diffuse backscatter weight\nsdf\nSolar -> Diffuse forward scatter weight\ndob\nDiffuse -> Directional backscatter weight\ndof\nDiffuse -> Directional forward scatter weight\nddb\nDiffuse -> Diffuse backscatter weight\nddf\nDiffuse -> Diffuse forward scatter weight\nks\nSolar beam extinction coefficient weight\nko\nOutgoing beam extinction coefficient weight\nbf\n?\nsob\nWeight of specular2directional backscatter coefficient\nsof\nWeight of specular2directional forward coefficient\nPs\nProbability of directly viewing a leaf in solar direction\nPo\nProbability of directly viewing a leaf in viewing direction\nPso\nBi-directional probability of directly viewing a leaf (solar->canopy->viewing)\nfs\nconversion factor fs to compute irradiance on inclined leaf\nabsfs\nabs(fs)\nabsfsfo\nabs(fs*fo)\nfsfo\nfs*fo\nfo\nconversion factor fo for angle towards observer (not sun like fs)\ncosΘ_l\nCosine of leaf azimuths\ncos2Θ_l\ncos of leaf azimuth sqared\nsigb\ndiffuse     backscatter scattering coefficient for diffuse  incidence\nsigf\ndiffuse     forward     scattering coefficient for diffuse  incidence\nsb\ndiffuse     backscatter scattering coefficient for specular incidence\nsf\ndiffuse     forward     scattering coefficient for specular incidence\nvb\ndirectional backscatter scattering coefficient for diffuse  incidence\nvf\ndirectional forward     scattering coefficient for diffuse  incidence\nw\nbidirectional scattering coefficent (directional-directional)\na\nattenuation\nXsd\nEffective layer transmittance (direct->diffuse)\nXdd\nEffective layer transmittance (diffuse->diffuse)\nR_sd\nEffective layer reflectance (direct->diffuse)\nR_dd\nEffective layer reflectance (diffuse->diffuse)\nEs_\nSolar direct radiation per layer)\n\n\n\n\n\n","category":"type"},{"location":"API/#CanopyRadiation.CanopyRads","page":"API","title":"CanopyRadiation.CanopyRads","text":"mutable struct CanopyRads{FT}\n\nA struct for canopy radiation information\n\nFields\n\nnWL\nNumber of wave lengths\nnWLf\nNumber of wave lengths for SIF\nnLayer\nNumber of canopy layers\nnAzi\nNumber of azimuth angles\nnIncl\nNumber of inclination agles\nintEout\nIntegrated TOC outgoing flux [W m⁻²]\nincomingPAR\nIncident spectrally integrated total PAR [mol m⁻² s⁻¹]\nincomingPAR_direct\nIncident spectrally integrated direct PAR [mol m⁻² s⁻¹]\nincomingPAR_diffuse\nIncident spectrally integrated diffuse PAR [mol m⁻² s⁻¹]\nRnSoil_diffuse\nNet radiation of shaded soil [W m⁻²]\nRnSoil_direct\nNet Short-wave radiation of sunlit soil [W m⁻²]\nRnSoil\nNet Short-wave radiation of soil (shaded + sunlit) [W m⁻²]\nRnSoilLW\nNet long-wave radiation of soil (shaded + sunlit) [W m⁻²]\nabsPAR_shade\nNet PAR of shaded leaves [mol m⁻² s⁻¹]\nabsPAR_shadeCab\nNet PAR by Cab+Car of shaded leaves [moles m⁻² s⁻¹]\nintNetSW_sunlit\nSpectrally integrated net absorbed direct radiation in each layer [W m⁻²)]\nintNetSW_shade\nSpectrally integrated net absorbed diffuse radiation in each layer [W m⁻²)]\nintNetLW_sunlit\nSpectrally integrated net absorbed direct radiation in each layer [W m⁻²)]\nintNetLW_shade\nSpectrally integrated net absorbed diffuse radiation in each layer [W m⁻²)]\nT_sun\nLeaf temperature (sunlit) [K]\nT_shade\nLeaf temperature (shaded) [K]\nϕ_shade\nFluorescence yield for shaded leaves\nH_shade\nSensible Heat flux H of shaded leaves [W m⁻²]\nLE_shade\nLatent Heat flux LE of shaded leaves [W m⁻²]\nNPQ_shade\nNPQ of shaded leaves\nGPP_shade\nGPP of shaded leaves [μmol m⁻² s⁻¹]\ngs_shade\ngs of shaded leaves [mol m⁻² s⁻¹]\nψl_shade\nLeaf water potential of shaded leaves [MPa]\nCc_shade\nCc of shaded leaves [µmol/mol]\nPi_shade\ninternal CO₂ concentration of shaded leaves [µmol/mol]\nLo\nShort-wave TOC outgoing radiance in observation direction [mW m⁻² nm⁻¹ sr⁻¹]\nEout\nShort-wave TOC outgoing radiation [mW m⁻² nm⁻¹]\nalb_obs\nShort-wave Albedo in viewing direction\nalb_direct\nShort-wave Albedo for direct incoming radiation\nalb_diffuse\nShort-wave Albedo for diffuse incoming radiation\nE_up\nUpwelling diffuse short-wave radiation within canopy [mW m⁻² nm⁻¹]\nE_down\nDownwelling diffuse short-wave radiation within canopy [mW m⁻² nm⁻¹]\nnetSW_sunlit\nNet absorbed direct radiation in each layer [mW m⁻² nm⁻¹]\nnetSW_shade\nnet absorbed diffuse radiation in each layer [mW m⁻² nm⁻¹]\nabsPAR_sun\nnet PAR of sunlit leaves [mol m⁻² s⁻¹]\nabsPAR_sunCab\nnet PAR by Cab+Car of sunlit leaves [mol m⁻² s⁻¹]\nT_sun3D\nLeaf temperature (sunlit) [K]\nϕ_sun\nFluorescence yield for sunlit leaves\nH_sun\nSensible Heat flux H of sunlit leaves [W m⁻²]\nLE_sun\nLatent Heat flux LE of sunlit leaves [W m⁻²]\nNPQ_sun\nNPQ of sunlit leaves\nGPP_sun\nGPP of sunlit leaves [μmol m⁻² s⁻¹]\ngs_sun\ngs of sunlit leaves [mol m⁻² s⁻¹]\nψl_sun\nLeaf water potential of sunlit leaves [MPa]\nCc_sun\nCc of sunlit leaves [µmol/mol]\nPi_sun\nInternal CO₂ concentration of sunlit leaves [µmol/mol]\nSIF_hemi\nHemispheric total outgoing SIF flux [mW m⁻² nm⁻¹])\nSIF_obs\nObserver-direction outgoing SIF radiance  (mW m⁻² nm⁻¹ sr⁻¹))\nSIF_obs_sunlit\nObserver-direction outgoing SIF radiance, sunlit leaves  (mW m⁻² nm⁻¹ sr⁻¹))\nSIF_obs_shaded\nObserver-direction outgoing SIF radiance, shaded leaves  (mW m⁻² nm⁻¹ sr⁻¹))\nSIF_obs_scattered\nObserver-direction outgoing SIF radiance, scattered   (mW m⁻² nm⁻¹ sr⁻¹))\nSIF_obs_soil\nObserver-direction outgoing SIF radiance, soil-reflected  (mW m⁻² nm⁻¹ sr⁻¹))\nSIF_sum\nTotal SIF sum of layer sources  [mW m⁻² nm⁻¹])\n\n\n\n\n\n","category":"type"},{"location":"API/#CanopyRadiation.IncomingRadiation","page":"API","title":"CanopyRadiation.IncomingRadiation","text":"struct IncomingRadiation{FT}\n\nIncoming radiation information.\n\nFields\n\nwl\nWavelength [nm]\nE_direct\nDirect incoming radiation [mW m⁻² nm⁻¹]\nE_diffuse\nDiffuse incoming radiation [mW m⁻² nm⁻¹]\n\n\n\n\n\n","category":"type"},{"location":"API/#CanopyRadiation.LeafBios","page":"API","title":"CanopyRadiation.LeafBios","text":"struct LeafBios{FT}\n\nA struct of leaf biological parameters\n\nFields\n\nnWL\nNumber of wave length\nnWLe\nNumber of wave length for excitation\nnWLf\nNumber of wave length for SIF\nN\nLeaf structure parameter\nCab\nChlorophyll a+b content [µg cm⁻²]\nCar\nCarotenoid content [µg cm⁻²]\nAnt\nAnthocynanin content [µg cm⁻²]\nCs\nSenescent material fraction\nCw\nEquivalent water thickness [cm]\nCm\nDry matter content (dry leaf mass per unit area) [g cm⁻²]\nCx\nFractionation between Zeaxanthin and Violaxanthin in Car (1=all Zeaxanthin) (-)\nρ_LW\nBroadband thermal reflectance (-)\nτ_LW\nBroadband thermal transmission (-)\nfqe\nLeaf fluorescence efficiency (Fo standard)\nρ_SW\nShortwave leaf reflectance\nτ_SW\nShortwave leaf transmission\nkChlrel\nRelative absorbtion by Chlorophyll+Car\nkChlrel_old\nRelative absorbtion by Chlorophyll\nMb\nFluorescence excitation matrix backwards\nMf\nFluorescence excitation matrix forwards\nndub\nDoubling adding layers\n\n\n\n\n\n","category":"type"},{"location":"API/#CanopyRadiation.LeafOpticals","page":"API","title":"CanopyRadiation.LeafOpticals","text":"mutable struct LeafOpticals{FT}\n\nStruct for leaf optical properties using Array\n\nFields\n\nnr\nKm\nKab\nKant\nKcar\nKw\nKBrown\nphi\nKcaV\nKcaZ\nlambda\n\n\n\n\n\n","category":"type"},{"location":"API/#CanopyRadiation.SoilOpticals","page":"API","title":"CanopyRadiation.SoilOpticals","text":"mutable struct SoilOpticals{FT}\n\nA struct of soil optical parameters\n\nFields\n\nwl\nWavelength [nm]\nalbedo_SW\nShortwave albedo\nemsvty_SW\nShortwave Emissivity\nalbedo_LW\nLongwave albedo\nsoil_skinT\nSoil surface temperature [K]\n\n\n\n\n\n","category":"type"},{"location":"API/#CanopyRadiation.SolarAngles","page":"API","title":"CanopyRadiation.SolarAngles","text":"struct SolarAngles{FT}\n\nStruct for observation and solar angles\n\nFields\n\ntts\nSolar Zenith Angle [degree]\ntto\nViewing Zenith Angle in [degree]\npsi\nrelative azimuth in [degree]\n\n\n\n\n\n","category":"type"},{"location":"API/#CanopyRadiation.WaveLengths","page":"API","title":"CanopyRadiation.WaveLengths","text":"struct WaveLengths{FT}\n\nStruct for pre-set wave length parameters.\n\nFields\n\nminwlPAR\nMinimal WL for PAR [nm]\nmaxwlPAR\nMaximal WL for PAR [nm]\nminwle\nMinimal WL for SIF excitation [nm]\nmaxwle\nMaximal WL for SIF excitation [nm]\nminwlf\nMinimal WL for SIF emission/fluorescence [nm]\nmaxwlf\nMaximal WL for SIF emission/fluorescence [nm]\nswl\nStandard wave length [nm]\ndwl\nDifferential wavelength\noptis\nLeaf optical parameter set\nwl\nWave length [nm]\nIwle\nIndex of wle in wl\nIwlf\nIndex of wlf in wl\niPAR\nindex of wlPAR in wl\nwle\nexcitation wave length [nm]\nwlf\nFluorescence wave length [nm]\nnwl\nLength of wl\nnWlE\nlength of wle\nnWlF\nlength of wlf\n\n\n\n\n\n","category":"type"},{"location":"API/#CanopyRadiation.create_canopy_opticals","page":"API","title":"CanopyRadiation.create_canopy_opticals","text":"createcanopyopticals(FT, nWL::Int, nLayer::Int, nAzi::Int, nIncl::Int)\n\nCreate a canopy optical properties struct, given\n\nFT Floating number type\nnWL Number of wave length\nnLayer Number of canopy layers\nnAzi Number of arimuth angles\nAIncl Number of inclination angles\n\n\n\n\n\n","category":"function"},{"location":"API/#CanopyRadiation.create_incoming_radiation","page":"API","title":"CanopyRadiation.create_incoming_radiation","text":"create_incoming_radiation(FType, swl:Array, file)\n\nCreate an AbstractIncomingRadiation struct, given\n\nFType Floating number type\nswl Standard wave length\nfile Input file name\n\n\n\n\n\n","category":"function"},{"location":"API/#CanopyRadiation.create_leaf_bios","page":"API","title":"CanopyRadiation.create_leaf_bios","text":"create_leaf_bios(FT, nWl::Int, nWle::Int, nWlf::Int)\n\nCreate a leaf biological parameters struct, given\n\nFType Floating number type\nnWl Number of wave length\nnWle Number of excitation wave length\nnWlf Number of fluorescence wave length\n\nReturns a LeafBios type struct.\n\n\n\n\n\n","category":"function"},{"location":"API/#CanopyRadiation.create_leaf_opticals","page":"API","title":"CanopyRadiation.create_leaf_opticals","text":"create_leaf_opticals(swl::Array, file::String)\n\nCreate an AbstractLeafOptiPara struct, given\n\nswl Standard wave length\nfile Input file name\n\n\n\n\n\n","category":"function"},{"location":"API/#Utils","page":"API","title":"Utils","text":"","category":"section"},{"location":"API/","page":"API","title":"API","text":"calctav\ne2phot\nfast∫\nvolscatt","category":"page"},{"location":"API/#CanopyRadiation.calctav","page":"API","title":"CanopyRadiation.calctav","text":"calctav(α::FT, nr::FT) where {FT<:AbstractFloat}\n\nComputes transmission of isotropic radiation across an interface between two dielectrics (Stern F. (1964), Allen W.A. (1973)). From calctav.m in PROSPECT-D\n\nα angle of incidence\nnr Index of refraction\n\n\n\n\n\n","category":"function"},{"location":"API/#CanopyRadiation.e2phot","page":"API","title":"CanopyRadiation.e2phot","text":"e2phot(λ::Array{FT}, E::Array{FT}) where {FT<:AbstractFloat}\n\nCalculates the number of moles of photons, given\n\nλ An array of wave length in [nm], converted to [m] by _FAC\nE Joules of energy\n\n\n\n\n\n","category":"function"},{"location":"API/#CanopyRadiation.fast∫","page":"API","title":"CanopyRadiation.fast∫","text":"fast∫(f::Vector{FT}, dx::Vector{FT}) where {FT<:AbstractFloat}\n\nA fast way of integrating functions, given\n\nf f(x) for each x\ndx Delta x for each x\n\n\n\n\n\n","category":"function"},{"location":"API/#Big-leaf-model","page":"API","title":"Big-leaf model","text":"","category":"section"},{"location":"API/","page":"API","title":"API","text":"big_leaf_partition","category":"page"},{"location":"API/#CanopyRadiation.big_leaf_partition","page":"API","title":"CanopyRadiation.big_leaf_partition","text":"big_leaf_partition(lai::FT, zenith::FT, r_all::FT) where {FT <:AbstractFloat}\n\nPartition the big-leaf canopy into sunlit and shaded layers, given\n\npartition Container for partition\nzenith Zenith angle in degree\nr_all Total radiation in [W m⁻²]\n\n\n\n\n\n","category":"function"},{"location":"API/#Layered-model","page":"API","title":"Layered model","text":"","category":"section"},{"location":"API/","page":"API","title":"API","text":"canopy_fluxes!\ncanopy_geometry!\ncanopy_matrices!\ndiffusive_S\nfluspect!\ninitialize_rt_module\nshort_wave!\nsif_fluxes!\nthermal_fluxes!","category":"page"},{"location":"API/#CanopyRadiation.canopy_fluxes!","page":"API","title":"CanopyRadiation.canopy_fluxes!","text":"canopy_fluxes!(can::Canopy4RT{FT}, can_opt::CanopyOpticals{FT}, can_rad::CanopyRads{FT}, in_rad::IncomingRadiation{FT}, soil_opt::SoilOpticals{FT}, leaf_array::Array{LeafBios{FT},1}, wl_set::WaveLengths{FT}, rt_con::RTContainer) where {FT<:AbstractFloat}\n\nComputes a variety of integrated fluxes from the spectrally resolved     computations in the short-wave Canopy RT (e.g. absorbed soil radiation,     absorbed direct and diffuse PAR by layer (and angles for direct), net     direct and diffuse energy balance per layer), given\n\ncan A Canopy4RT struct\ncan_opt A CanopyOpticals struct\ncan_rad A CanopyRads struct\nin_rad An IncomingRadiation struct\nsoil_opt A SoilOpticals type struct for soil optical properties\nleaf_array An array of LeafBios type struct (i.e. leaf optical   properties can change with canopy height)\nwl_set An WaveLengths type struct\nrt_con RTContainer type container\n\n\n\n\n\n","category":"function"},{"location":"API/#CanopyRadiation.canopy_geometry!","page":"API","title":"CanopyRadiation.canopy_geometry!","text":"canopy_geometry!(can::Canopy4RT{FT}, angles::SolarAngles{FT}, can_opt::CanopyOpticals{FT}, rt_con::RTContainer{FT}) where {FT<:AbstractFloat}\n\nComputes canopy optical properties (extinction coefficients for direct and     diffuse light) based on the SAIL model. Most important input parameters are     leaf inclination and azimuth distribution functions and sun-sensor     geometry . Canopy clumping Ω is implemented as in Pinty et al (2015), given\n\ncan Canopy4RT type struct, providing canopy structure information\nangles SolarAngles type struct, defining sun-sensor geometry\ncan_opt CanopyOpticals type, where optical properties is stored\nrt_con RTContainer type container\n\n\n\n\n\n","category":"function"},{"location":"API/#CanopyRadiation.canopy_matrices!","page":"API","title":"CanopyRadiation.canopy_matrices!","text":"canopy_matrices!(leaf_array::Array{LeafBios{FT},1}, can_opt::CanopyOpticals{FT}) where {FT<:AbstractFloat}\n\nCompute scattering coefficient matrices for direct and diffuse light given     geometry dependent overall extinction coefficients and pigment dependent     leaf reflectance and transmission (computed via fluspect). This function     has to be called before simulate_short_wave! can be used.\n\nleaf_array An array of LeafBios type struct (i.e. leaf optical   properties can change with canopy height)\ncan_opt An CanopyOpticals type struct, will be updated within   this function call.\n\n\n\n\n\n","category":"function"},{"location":"API/#CanopyRadiation.diffusive_S","page":"API","title":"CanopyRadiation.diffusive_S","text":"diffusive_S(τ_dd::Array{FT}, ρ_dd::Array{FT}, S⁻::Array{FT}, S⁺::Array{FT}, boundary_top::Array{FT}, boundary_bottom::Array{FT}, rsoil::Array{FT}) where {FT<:AbstractFloat}\n\nComputes 2-stream diffusive radiation transport (used for thermal and SIF) given:\n\nτ_dd A 2D Array with layer reflectances\nρ_dd A 2D Array with layer transmissions\nS⁻ A 2D Array with layer source terms in the downwelling direction\nS⁺ A 2D Array with layer source terms in the upwelling direction\nboundary_top A 1D array with downwelling radiation at the top (top of canopy)\nboundary_bottom A 1D array with upwnwelling radiation at the bottom (soil)\nrsoil A 1D array with soil reflectance\n\n\n\n\n\n","category":"function"},{"location":"API/#CanopyRadiation.fluspect!","page":"API","title":"CanopyRadiation.fluspect!","text":"fluspect!(leaf::LeafBios{FT}, wl_set::WaveLengths{FT}) where {FT<:AbstractFloat}\n\nComputes leaf optical properties (reflectance and transittance) based on pigment concentrations. Also computes Fluorescence excitation matrices. Mostly based on PROSPECT-D for leaf reflectance/transmission and FluSpec for fluorescence.\n\nleaf LeafBios type struct (includes pigment concentrations, water content, leaf structure)\nwl_set An WaveLengths type struct, which defines fluoresence excitation and emission wavelengths\n\n\n\n\n\n","category":"function"},{"location":"API/#CanopyRadiation.initialize_rt_module","page":"API","title":"CanopyRadiation.initialize_rt_module","text":"initialize_rt_module(; n_layer::Int=20, LAI::FT=FT(3.0))\n\nInitialize the RT module so as to interface with Plant, given\n\nn_layer Number of canopy layers\nLAI Leaf area index\n\nNote it here that the structcanopy is used in CanopyRT module. This function initializes `canopyrt,canOptrt,canRadrt,arrayOfLeaves` as local variables rather than global variables as in CanopyRT module. See CanopyRT module for further operations on these variables.\n\n\n\n\n\n","category":"function"},{"location":"API/#CanopyRadiation.short_wave!","page":"API","title":"CanopyRadiation.short_wave!","text":"short_wave!(can::Canopy4RT{FT}, can_opt::CanopyOpticals, can_rad::CanopyRads{FT}, in_rad::IncomingRadiation{FT}, soil_opt::SoilOpticals{FT}, rt_con::RTContainer{FT}) where {FT<:AbstractFloat}\n\nSimulate the short wave radiation through the canopy, given\n\ncan Canopy4RT type struct of canopy information\ncan_opt CanopyOpticals struct of optical layer properties\ncan_rad A CanopyRads struct\nin_rad An IncomingRadiation struct\nsoil_opt A SoilOpticals type struct for soil optical properties\nrt_con RTContainer type container\n\n\n\n\n\n","category":"function"},{"location":"API/#CanopyRadiation.sif_fluxes!","page":"API","title":"CanopyRadiation.sif_fluxes!","text":"sif_fluxes!(leaf_array::Array{LeafBios{FT},1}, can_opt::CanopyOpticals{FT}, can_rad::CanopyRads{FT}, can::Canopy4RT{FT}, soil_opt::SoilOpticals{FT}, wl_set::WaveLengths{FT}) where {FT<:AbstractFloat}\n\nComputes 2-stream diffusive radiation transport for SIF radiation (calls compute_diffusive_S internally). Layer reflectance and transmission is computed from SW optical properties, layer sources from absorbed light and SIF efficiencies. Boundary conditions are zero SIF incoming from atmosphere or soil.\n\nleaf_array An array of LeafBios type struct (i.e. leaf optical properties can change with canopy height)\ncan_opt A CanopyOpticals struct for providing optical layer properties\ncan_rad A CanopyRads struct\ncan A Canopy4RT type struct for providing LAI and nLayer and clumping\nsoil_opt A SoilOpticals type struct for soil optical properties\nwl_set An WaveLengths type struct\n\n\n\n\n\n","category":"function"},{"location":"API/#CanopyRadiation.thermal_fluxes!","page":"API","title":"CanopyRadiation.thermal_fluxes!","text":"thermal_fluxes!(leaf_array::Array{LeafBios{FT},1}, can_opt::CanopyOpticals{FT}, can_rad::CanopyRads{FT}, can::Canopy4RT{FT}, soil_opt::SoilOpticals{FT}, incLW::Array{FT}, wl_set::WaveLengths{FT}) where {FT<:AbstractFloat}\n\nComputes 2-stream diffusive radiation transport for thermal radiation (calls compute_diffusive_S internally). Layer reflectance and transmission is computed from LW optical properties, layer sources from temperature and Planck law, boundary conditions from the atmosphere and soil emissivity and temperature. Currently only uses Stefan Boltzmann law to compute spectrally integrated LW but can be easily adjusted to be spectrally resolved.\n\nleaf_array An array of LeafBios type struct (i.e. leaf optical properties can change with canopy height)\ncan_opt A CanopyOpticals struct for providing optical layer properties\ncan_rad A CanopyRads struct\ncan A Canopy4RT type struct for providing LAI and nLayer and clumping\nsO A SoilOpticals type struct for soil optical properties\nincLW A 1D array with incoming long-wave radiation\nwl_set An WaveLengths type struct\n\n\n\n\n\n","category":"function"}]
}
