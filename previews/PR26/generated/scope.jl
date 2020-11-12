# load packages
using CanopyLayers
using PlotPlants
FT = Float32;

angles, can, can_opt, can_rad, in_rad, leaves, rt_con, rt_dim, soil, wls =
    initialize_rt_module(FT; nLayer=20, LAI3);

canopy_geometry!(can, angles, can_opt, rt_con);

canopy_matrices!(leaves, can_opt);

short_wave!(can, can_opt, can_rad, in_rad, soil, rt_con);

canopy_fluxes!(can, can_opt, can_rad, in_rad, soil, leaves, wls, rt_con);

SIF_fluxes!(leaves, can_opt, can_rad, can, soil, wls, rt_con, rt_dim);

thermal_fluxes!(leaves, can_opt, can_rad, can, soil, [FT(400.0)], wls);

# This file was generated using Literate.jl, https://github.com/fredrikekre/Literate.jl

