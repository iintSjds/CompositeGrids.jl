using CompositeGrids, Test, StaticArrays, LinearAlgebra, Printf, Random, Statistics
# import Test: @test, @testset

if isempty(ARGS)
    include("grid.jl")
    include("interpolate.jl")
else
    include(ARGS[1])
end