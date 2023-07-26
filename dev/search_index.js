var documenterSearchIndex = {"docs":
[{"location":"lib/composite/#Composite-Grids","page":"Composite Grids","title":"Composite Grids","text":"","category":"section"},{"location":"lib/composite/","page":"Composite Grids","title":"Composite Grids","text":"Modules = [CompositeGrids.CompositeG]","category":"page"},{"location":"lib/composite/#CompositeGrids.CompositeG","page":"Composite Grids","title":"CompositeGrids.CompositeG","text":"Composite grid that has tree structure. The whole interval is first divided by a panel grid, then each interval of a panel grid is divided by a smaller grid in subgrids. Subgrid could also be composite grid.\n\n\n\n\n\n","category":"module"},{"location":"lib/composite/#CompositeGrids.CompositeG.Composite","page":"Composite Grids","title":"CompositeGrids.CompositeG.Composite","text":"struct Composite{T<:AbstractFloat,PG,SG} <: SimpleG.ClosedGrid\n\nComposite grid generated with panel grid of type PG and subgrids of type SG. PG should always be ClosedGrid, while SG could be any grid.\n\n#Members:\n\nbound : boundary of the grid\nsize : number of grid points\ngrid : grid points\npanel : panel grid\nsubgrids : a vector of subgrids\ninits : index of the first grid point of a subgrid on the whole grid\n\n#Constructor:\n\nfunction Composite{T,PG,SG}(panel, subgrids) where {T<:AbstractFloat,PG,SG}\n\ncreate Composite grid from panel and subgrids. if the boundary grid point of two neighbor subgrids are too close, they will be combined in the whole grid.\n\n\n\n\n\n","category":"type"},{"location":"lib/composite/#Base.floor-Union{Tuple{SG}, Tuple{PG}, Tuple{T}, Tuple{CompositeGrids.CompositeG.Composite{T, PG, SG}, Any}} where {T, PG, SG}","page":"Composite Grids","title":"Base.floor","text":"function Base.floor(grid::Composite{T,PG,SG}, x) where {T,PG,SG}\n\nfirst find the corresponding subgrid by flooring on panel grid, then floor on subgrid and collect result. give the floor result on the whole grid. if floor on panel grid is needed, simply call floor(grid.panel, x).\n\nreturn 1 for x<grid[1] and grid.size-1 for x>grid[end].\n\n\n\n\n\n","category":"method"},{"location":"lib/composite/#CompositeGrids.CompositeG.CompositeLogGrid","page":"Composite Grids","title":"CompositeGrids.CompositeG.CompositeLogGrid","text":"function CompositeLogGrid(type, bound, N, minterval, d2s, order, T=Float64)\n\ncreate a composite grid with a Log grid as panel and subgrids of selected type.\n\n#Members:\n\ntype : type of the subgrids, currently in [:cheb, :gauss, :uniform]\nbound : boundary of the grid\nN : number of grid points of panel grid\nminterval : minimum interval of panel grid\nd2s : panel grid is dense to sparse or not\norder : number of grid points of subgrid\n\n\n\n\n\n","category":"function"},{"location":"lib/composite/#CompositeGrids.CompositeG.LogDensedGrid","page":"Composite Grids","title":"CompositeGrids.CompositeG.LogDensedGrid","text":"function LogDensedGrid(type, bound, dense_at, N, minterval, order, T=Float64)\n\ncreate a composite grid of CompositeLogGrid as subgrids. the grid is densed at selected points in dense_at, which in the real situation could be [kF,] for fermi k grid and [0, 2kF] for bose k grid, etc. if two densed point is too close to each other, they will be combined.\n\n#Members:\n\ntype : type of the subgrid of subgrid, currently in [:cheb, :gauss, :uniform]\nbound : boundary of the grid\ndense_at : list of points that requires densed grid\nN : number of grid points of panel grid\nminterval : minimum interval of panel grid\norder : number of grid points of subgrid\n\n\n\n\n\n","category":"function"},{"location":"lib/interpolate/#Interpolation-and-Integration","page":"Interpolation and Integration","title":"Interpolation and Integration","text":"","category":"section"},{"location":"lib/interpolate/","page":"Interpolation and Integration","title":"Interpolation and Integration","text":"Modules = [CompositeGrids.Interp]","category":"page"},{"location":"lib/interpolate/#CompositeGrids.Interp","page":"Interpolation and Integration","title":"CompositeGrids.Interp","text":"Provide interpolation and integration.\n\n\n\n\n\n","category":"module"},{"location":"lib/interpolate/#CompositeGrids.Interp.dataslice-Tuple{Any, Int64, Any}","page":"Interpolation and Integration","title":"CompositeGrids.Interp.dataslice","text":"function dataslice(data, axes, indices)\n\nReturn a view of data sliced on given axes with given indices. Works like view(data, (:, ..., :, i1:f1,  :, ..., in:fn, :, ..., :)). Type unstable unless slice dims are constant.\n\n#Members:\n\ndata: data to be sliced.\naxes: axes to be sliced. accept Int or NTuple{DIM, Int} for single or multiple axes. when omitted, assume all axes.\nindices: indices of slicing. accept UnitRange{Int} or Vector of UnitRange{Int} like 2:8 or [2:8, 3:7]\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.differentiate1D-Union{Tuple{T}, Tuple{Any, T, Any}} where T","page":"Interpolation and Integration","title":"CompositeGrids.Interp.differentiate1D","text":"function differentiate1D(data, xgrid, x; axis=1)\n\ncalculate integration of data[i] on xgrid. For 1D data, return a number; for multiple dimension, reduce the given axis.\n\n#Arguments:\n\nxgrid: one-dimensional grid of x\ndata: one-dimensional array of data\nx: point to differentiate\naxis: axis to be differentiated in data\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.findneighbor-Union{Tuple{T}, Tuple{T, Any}} where T","page":"Interpolation and Integration","title":"CompositeGrids.Interp.findneighbor","text":"function findneighbor(xgrid::T, x; method=:default) where {T}\n\nFind neighbor grid points and related information for extrapolating the value of x on xgrid.\n\n#Members:\n\nxgrid: grid to be interpolated\nx: value to be interpolated\nmethod: :default use optimized method, :linear use linear interp.\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.integrate1D-Tuple{CompositeGrids.Interp.ChebIntegrate, Any, Any}","page":"Interpolation and Integration","title":"CompositeGrids.Interp.integrate1D","text":"function integrate1D(::ChebIntegrate, data, xgrid)\n\ncalculate integration of data[i] on xgrid works for grids that have integration weight stored\n\n#Arguments:\n\nxgrid: one-dimensional grid of x\ndata: one-dimensional array of data\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.integrate1D-Tuple{CompositeGrids.Interp.NoIntegrate, Any, Any}","page":"Interpolation and Integration","title":"CompositeGrids.Interp.integrate1D","text":"function integrate1D(::NoIntegrate, data, xgrid)\n\ncalculate integration of data[i] on xgrid works for grids that do not have integration weight stored\n\n#Arguments:\n\nxgrid: one-dimensional grid of x\ndata: one-dimensional array of data\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.integrate1D-Tuple{CompositeGrids.Interp.WeightIntegrate, Any, Any}","page":"Interpolation and Integration","title":"CompositeGrids.Interp.integrate1D","text":"function integrate1D(::WeightIntegrate, data, xgrid)\n\ncalculate integration of data[i] on xgrid works for grids that have integration weight stored\n\n#Arguments:\n\nxgrid: one-dimensional grid of x\ndata: one-dimensional array of data\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.integrate1D-Union{Tuple{GT}, Tuple{CompositeGrids.Interp.CompositeIntegrate, Any, GT}} where GT","page":"Interpolation and Integration","title":"CompositeGrids.Interp.integrate1D","text":"function integrate1D(::CompositeIntegrate, data, xgrid)\n\ncalculate integration of data[i] on xgrid call integrate1D for each subgrid and return the sum.\n\n#Arguments:\n\nxgrid: one-dimensional grid of x\ndata: one-dimensional array of data\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.integrate1D-Union{Tuple{T}, Tuple{Any, T, Any}} where T","page":"Interpolation and Integration","title":"CompositeGrids.Interp.integrate1D","text":"function integrate1D(data, xgrid, range; axis=1)\n\ncalculate integration of data[i] on xgrid. For 1D data, return a number; for multiple dimension, reduce the given axis.\n\n#Arguments:\n\nxgrid: one-dimensional grid of x\ndata: one-dimensional array of data\nrange: range of integration, [init, fin] within bound of xgrid.\naxis: axis to be integrated in data\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.integrate1D-Union{Tuple{T}, Tuple{Any, T}} where T","page":"Interpolation and Integration","title":"CompositeGrids.Interp.integrate1D","text":"function integrate1D(data, xgrid; axis=1)\n\ncalculate integration of data[i] on xgrid. For 1D data, return a number; for multiple dimension, reduce the given axis.\n\n#Arguments:\n\nxgrid: one-dimensional grid of x\ndata: one-dimensional array of data\naxis: axis to be integrated in data\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.interp1D-Tuple{CompositeGrids.Interp.ChebInterp, Any, Any, Any}","page":"Interpolation and Integration","title":"CompositeGrids.Interp.interp1D","text":"function interp1D(::ChebInterp, data, xgrid, x)\n\nlinear interpolation of data(x), barycheb for BaryCheb grid\n\n#Arguments:\n\nxgrid: one-dimensional grid of x\ndata: one-dimensional array of data\nx: x\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.interp1D-Union{Tuple{GT}, Tuple{CompositeGrids.Interp.CompositeInterp, Any, GT, Any}} where GT","page":"Interpolation and Integration","title":"CompositeGrids.Interp.interp1D","text":"function interp1D(::CompositeInterp,data, xgrid, x)\n\nlinear interpolation of data(x), first floor on panel to find subgrid, then call interp1D on subgrid \n\n#Arguments:\n\nxgrid: one-dimensional grid of x\ndata: one-dimensional array of data\nx: x\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.interp1D-Union{Tuple{GT}, Tuple{CompositeGrids.Interp.LinearInterp, Any, GT, Any}} where GT","page":"Interpolation and Integration","title":"CompositeGrids.Interp.interp1D","text":"function interp1D(::LinearInterp,data, xgrid, x)\n\nlinear interpolation of data(x), use floor and linear1D\n\n#Arguments:\n\nxgrid: one-dimensional grid of x\ndata: one-dimensional array of data\nx: x\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.interp1D-Union{Tuple{T}, Tuple{Any, T, Any}} where T","page":"Interpolation and Integration","title":"CompositeGrids.Interp.interp1D","text":"function interp1D(data, xgrid, x; axis=1, method=InterpStyle(T))\n\nlinear interpolation of data(x) with single or multiple dimension. For 1D data, return a number; for multiple dimension, reduce the given axis.\n\n#Arguments:\n\nxgrid: one-dimensional grid of x\ndata: one-dimensional array of data\nx: x\naxis: axis to be interpolated in data\nmethod: by default use optimized method; use linear interp if Interp.LinearInterp()\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.interp1DGrid-Tuple{CompositeGrids.Interp.CompositeInterp, Any, Any, Any}","page":"Interpolation and Integration","title":"CompositeGrids.Interp.interp1DGrid","text":"function interp1DGrid(::CompositeInterp, data, xgrid, grid)\n\nlinear interpolation of data(grid[1:end]), return a Vector grid should be sorted.\n\n#Arguments:\n\nxgrid: one-dimensional grid of x\ndata: one-dimensional array of data\ngrid: points to be interpolated on\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.interp1DGrid-Tuple{Union{CompositeGrids.Interp.ChebInterp, CompositeGrids.Interp.LinearInterp}, Any, Any, Any}","page":"Interpolation and Integration","title":"CompositeGrids.Interp.interp1DGrid","text":"function interp1DGrid(::Union{LinearInterp,ChebInterp}, data, xgrid, grid)\n\nlinear interpolation of data(grid[1:end]), return a Vector simply call interp1D on each points\n\n#Arguments:\n\nxgrid: one-dimensional grid of x\ndata: one-dimensional array of data\ngrid: points to be interpolated on\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.interp1DGrid-Union{Tuple{T}, Tuple{Any, T, Any}} where T","page":"Interpolation and Integration","title":"CompositeGrids.Interp.interp1DGrid","text":"function interp1DGrid(data, xgrid, grid; axis=1, method=InterpStyle(T))\n\nFor 1D data, do interpolation of data(grid[1:end]), return a Vector. For ND data, do interpolation of data(grid[1:end]) at given axis, return data of same dimension.\n\n#Arguments:\n\nxgrid: one-dimensional grid of x\ndata: one-dimensional array of data\ngrid: points to be interpolated on\naxis: axis to be interpolated in data\nmethod: by default use optimized method; use linear interp if :linear\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.interpsliced-Tuple{Any, Any}","page":"Interpolation and Integration","title":"CompositeGrids.Interp.interpsliced","text":"function interpsliced(neighbor, data; axis=1)\n\nInterpolate with given neighbor and sliced data. Assume data already sliced on given axis.\n\n#Members:\n\nneighbor: neighbor from findneighbor()\ndata: sliced data\naxis: axis sliced and to be interpolated\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.linear1D-Tuple{Any, Any, Any}","page":"Interpolation and Integration","title":"CompositeGrids.Interp.linear1D","text":"function linear1D(data, xgrid, x)\n\nlinear interpolation of data(x)\n\n#Arguments:\n\nxgrid: one-dimensional grid of x\ndata: one-dimensional array of data\nx: x\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.linear2D-NTuple{5, Any}","page":"Interpolation and Integration","title":"CompositeGrids.Interp.linear2D","text":"linear2D(data, xgrid, ygrid, x, y) \n\nlinear interpolation of data(x, y)\n\n#Arguments:\n\nxgrid: one-dimensional grid of x\nygrid: one-dimensional grid of y\ndata: two-dimensional array of data\nx: x\ny: y\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.linearND-Tuple{Any, Any, Any}","page":"Interpolation and Integration","title":"CompositeGrids.Interp.linearND","text":"function linearND(data, xgrids, xs)\n\nlinear interpolation of data(xs)\n\n#Arguments:\n\nxgrids: n-dimensional grids, xgrids[i] is a 1D grid\ndata: n-dimensional array of data\nxs: list of x, x[i] corresponds to xgrids[i]\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.locate-Tuple{CompositeGrids.SimpleG.AbstractGrid, Any}","page":"Interpolation and Integration","title":"CompositeGrids.Interp.locate","text":"function locate(grid, x)\n\nreturn the index of grid point closest to x. Useful for Monte Carlo algorithm when variable x is continuous while histogram is stored on grid.\n\n#Arguments:\n\ngrid: one-dimensional grid of x\nx: point to locate\n\n\n\n\n\n","category":"method"},{"location":"lib/interpolate/#CompositeGrids.Interp.volume-Tuple{CompositeGrids.SimpleG.AbstractGrid, Any}","page":"Interpolation and Integration","title":"CompositeGrids.Interp.volume","text":"function volume(grid, i)\n\nreturn the volume of grid point i. The volume is defined as the length/area/volume/... of histogram bar represented by grid point i. In 1D grids of this package, it is defined as the length of interval between (grid[i-1]+grid[i])/2 and (grid[i]+grid[i+1])/2, and for edge points one side is replaced by boundary points. When index i is omitted, the length of the whole grid is returned. It is guaranteed that volume(grid)==sum(volume(grid, i) for i in 1:length(grid)).\n\n#Arguments:\n\ngrid: one-dimensional grid\ni: index of grid point\n\n\n\n\n\n","category":"method"},{"location":"README/","page":"Home","title":"Home","text":"(Image: img) (Image: img) (Image: img)","category":"page"},{"location":"README/#Introduction","page":"Home","title":"Introduction","text":"","category":"section"},{"location":"README/","page":"Home","title":"Home","text":"CompositeGridsjl is a powerful Julia package that provides a unified interface for generating a wide range of common 1D grids. In addition to basic grids, this package allows you to create composite grids by combining multiple fundamental grids. These composite grids are enriched with essential functionalities, including floor function, interpolation function, and integration function, all of which are optimized to enhance their performance on specific grids.","category":"page"},{"location":"README/","page":"Home","title":"Home","text":"With CompositeGridsjl, you can effortlessly construct complex grids and efficiently handle various numerical tasks with ease. Whether you are working on scientific simulations, data analysis, or any other domain that involves grid-based calculations, this package will be your go-to tool for managing grids effectively.","category":"page"},{"location":"README/#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"README/","page":"Home","title":"Home","text":"To install CompositeGridsjl, use Julia's package manager. Open the Julia REPL, type ] to enter the package mode, and then:","category":"page"},{"location":"README/","page":"Home","title":"Home","text":"pkg> add CompositeGrids.jl","category":"page"},{"location":"README/#Quick-Start","page":"Home","title":"Quick Start","text":"","category":"section"},{"location":"README/","page":"Home","title":"Home","text":"In this quick start example, we will demonstrate how to generate a grid from 0 to 1, log-densed at 0 and 1, and optimized for integration using the CompositeGridsjl package. We will provide descriptive comments in the code to guide you through the process.","category":"page"},{"location":"README/","page":"Home","title":"Home","text":"    using CompositeGrids\n    \n    # Generating a log densed composite grid with LogDensedGrid()\n    tgrid = CompositeGrid.LogDensedGrid(\n        type=:gauss,# The top layer grid is :gauss, optimized for integration. For interpolation use :cheb\n        bound=[0.0, 1],# The grid is defined on [0.0, β]\n        dense_at=[0.0, 1],# and is densed at 0.0 and β, as given by 2nd and 3rd parameter.\n        N=5,# N of log grid\n        minterval=0.005, # minimum interval length of log grid\n        order=5 # N of bottom layer\n    )\n    # The grid has 3 layers.\n    # The top layer is defined by the boundary and densed points. In this case its:\n    println(\"Top layer:\",tgrid.panel.grid)\n    # The middle layer is a log grid with 4 points and minimum interval length 0.001:\n    println(\"First subgrid of middle layer:\",tgrid.subgrids[1].panel.grid)\n    # The bottom layer is a Gauss-Legendre grid with 5 points:\n    println(\"First subgrid of bottom layer:\",tgrid.subgrids[1].subgrids[1].grid)\n    \n    # function to be integrated:\n    f(t) = exp(t)+exp(1-t)\n    # numerical value on grid points:\n    data = [f(t) for (ti, t) in enumerate(tgrid.grid)]\n    \n    # integrate with integrate1D():\n    int_result = Interp.integrate1D(data, tgrid)\n    \n    println(\"result=\",int_result)\n    println(\"comparing to:\",2*(exp(1)-1))","category":"page"},{"location":"README/","page":"Home","title":"Home","text":"Top layer:[0.0, 0.5, 1.0]\nFirst subgrid of middle layer:[0.0, 0.005000000000000001, 0.023207944168063897, 0.1077217345015942, 0.5]\nFirst subgrid of bottom layer:[0.00023455038515334025, 0.0011538267247357924, 0.0025000000000000005, 0.0038461732752642086, 0.004765449614846661]\nresult=3.43656365691809\ncomparing to:3.43656365691809","category":"page"},{"location":"README/#Manual","page":"Home","title":"Manual","text":"","category":"section"},{"location":"README/#Basics","page":"Home","title":"Basics","text":"","category":"section"},{"location":"README/","page":"Home","title":"Home","text":"The CompositeGridsjl package offers two modules for working with 1D grids: SimpleGrid and CompositeGrid. These modules provide a collection of common 1D grids with straightforward definitions and simple structures. Additionally, CompositeGrid defines a more general type of grid, composed of a panel grid and a set of subgrids, allowing for more flexibility in grid construction.","category":"page"},{"location":"README/","page":"Home","title":"Home","text":"The common interface for grids includes the following properties and methods:","category":"page"},{"location":"README/","page":"Home","title":"Home","text":"gbound: This property gives the boundary of the interval of the grid. It provides a clear indication of the range covered by the grid.\ngsize: This property gives the total number of grid points in the grid. It helps to determine the grid's resolution and granularity.\nggrid: This property gives an array of grid points. The array contains the coordinates of all the grid points within the specified boundary.\ngi: This method returns the i-th grid point, which is the same as ggridi. It allows for direct access to specific grid points.\nfloor(g x): This method returns the largest index of the grid point where gi  x. For values of x below the first grid point, it returns 1, and for values greater than the last grid point, it returns (gridsize - 1). This ensures that both floor() and (floor() + 1) are valid grid indices for any value of x.","category":"page"},{"location":"README/","page":"Home","title":"Home","text":"The CompositeGridsjl package also provides interpolation and integration functionalities for the grids. Different implementations are available for different types of grids, allowing for efficient numerical calculations tailored to each grid type.","category":"page"},{"location":"README/#Simple-Grids","page":"Home","title":"Simple Grids","text":"","category":"section"},{"location":"README/","page":"Home","title":"Home","text":"The SimpleGrid module in CompositeGrids.jl offers various basic grids that serve as standalone grids and components of composite grids. The available basic grids include:","category":"page"},{"location":"README/","page":"Home","title":"Home","text":"Arbitrary Grid: The most general basic grid, which takes an array and converts it into a grid. It provides an efficient O(ln(N)) floor function based on searchsortedfirst().\nUniform Grid: Defined by the boundary and the number of grid points. It offers an O(1) floor function for rapid point location.\nLog Grid: Defined by the boundary, number of grid points, minimum interval, and direction. It generates a log-dense grid based on the provided parameters. An O(1) floor function is provided. For example:","category":"page"},{"location":"README/","page":"Home","title":"Home","text":"    using CompositeGrids\n    loggrid = SimpleGrid.Log{Float64}(\n        bound=[0.0,1.0], N=6, \n        minterval=0.0001, \n        d2s = true) # dense to sparse\n    println(loggrid.grid)","category":"page"},{"location":"README/","page":"Home","title":"Home","text":"    [0.0, 0.00010000000000000005, 0.0010000000000000002, 0.010000000000000002, 0.1, 1.0]","category":"page"},{"location":"README/","page":"Home","title":"Home","text":"BaryCheb Grid: Specifically designed for interpolation, it is defined by the boundary and number of grid points. The grid points are distributed according to Chebyshev nodes. The floor function is not optimized, so the O(ln(N)) function will be used, but the interpolation is based on an high precision algorithm with O(N).\nGaussLegendre Grid: Tailored for integration purposes, it is defined by the boundary and number of grid points. The grid points are distributed according to Gauss-Legendre quadrature. The floor function is not optimized, so the O(ln(N)) function will be used. The 1D integration is optimized.","category":"page"},{"location":"README/","page":"Home","title":"Home","text":"It's important to note that grids can be categorized into open grids and closed grids. Closed grids indicate that the boundary points are also included as grid points, while open grids exclude the boundary points. The BaryCheb and GaussLegendre grids are examples of open grids.","category":"page"},{"location":"README/","page":"Home","title":"Home","text":"A detailed manual can be found here.","category":"page"},{"location":"README/#Composite-Grids","page":"Home","title":"Composite Grids","text":"","category":"section"},{"location":"README/","page":"Home","title":"Home","text":"The CompositeGrid module in CompositeGrids.jl provides a general type of grid where the entire interval is first divided by a panel grid, and then each interval of the panel grid is further divided by smaller grids called subgrids. Notably, subgrids can also be composite grids themselves, allowing for hierarchical grid structures.","category":"page"},{"location":"README/","page":"Home","title":"Home","text":"The LogDensedGrid is a particularly useful generator of composite grids that offers a general solution when a log-dense 1D grid is needed around specific points within an interval. For example, grids like &tau; grids, which require densification around 0 and &beta;, or momentum grids, which need densification around the Fermi momentum, can be efficiently generated using LogDensedGrid.","category":"page"},{"location":"README/","page":"Home","title":"Home","text":"The LogDensedGrid is defined as a three-layer composite grid:","category":"page"},{"location":"README/","page":"Home","title":"Home","text":"Top Layer (Arbitrary Grid): This layer is defined by the boundary and the points where the grid needs to be dense. It allows for high flexibility in defining the grid structure.\nMiddle Layer (Log Grid): This layer is log-dense at the specified points, ensuring finer resolution in regions of interest.\nBottom Layer (Grid of Options): The bottom layer can be one of three options: :cheb for BaryCheb grid used for interpolation, :gauss for GaussLegendre grid used for integration, and :uniform for a uniform grid that serves general purposes.","category":"page"},{"location":"README/","page":"Home","title":"Home","text":"The floor function of the composite grid is defined recursively. When locating a grid point, the floor function of the panel grid is called first to find the corresponding subgrid, and then the floor function of the subgrid is called to determine the final result. Since subgrids can themselves be composite grids, this recursive process continues until the lowest level of subgrids is reached.","category":"page"},{"location":"README/","page":"Home","title":"Home","text":"The hierarchical nature of composite grids allows for the creation of sophisticated grid structures tailored to specific needs, making them a powerful tool for various scientific and computational applications.","category":"page"},{"location":"README/","page":"Home","title":"Home","text":"A detailed manual can be found here.","category":"page"},{"location":"README/#Interpolation-and-Integration","page":"Home","title":"Interpolation and Integration","text":"","category":"section"},{"location":"README/#Interpolation","page":"Home","title":"Interpolation","text":"","category":"section"},{"location":"README/","page":"Home","title":"Home","text":"Interpolation in CompositeGrids.jl provides an estimate of the function value at a given point x using the provided grid and function values on the grid points. For most of the simple grids, linear interpolation is used in conjunction with the floor function to locate the corresponding grid points. Notably, the BaryCheb grid employs an optimized algorithm for interpolation, leveraging information from all grid points to yield more precise results with the same number of grid points. This enhanced interpolation is subject to the condition that the function itself is smooth enough. When working with composite grids, the interpolation process is performed recursively, and the final result depends on the type of the lowest-level grid. For higher dimensions where data is defined on a list of grids, linear interpolation is provided, even when some of the grids are of the BaryCheb type.","category":"page"},{"location":"README/#Integration","page":"Home","title":"Integration","text":"","category":"section"},{"location":"README/","page":"Home","title":"Home","text":"Integration over 1D grids is supported in CompositeGrids.jl. For most of the simple grids, linear integration is employed. However, for GaussLegendre grids and BaryCheb grids, an optimized integration method is used. Similar to interpolation, integration for composite grids is also carried out recursively, and the chosen method depends on the type of the lowest-level grids.","category":"page"},{"location":"README/#Differentiation","page":"Home","title":"Differentiation","text":"","category":"section"},{"location":"README/","page":"Home","title":"Home","text":"The CompositeGrids.jl package offers differentiation for 1D grids. Specifically, a high-precision algorithm is implemented for BaryCheb grids, resulting in accurate differentiation results.","category":"page"},{"location":"README/","page":"Home","title":"Home","text":"A detailed manual can be found here.","category":"page"},{"location":"README/","page":"Home","title":"Home","text":"An example of interpolation and differenciation is shown below:","category":"page"},{"location":"README/","page":"Home","title":"Home","text":"using CompositeGrids\nβ = π\n\n# Generating a log densed composite grid with LogDensedGrid()\ntgrid = CompositeGrid.LogDensedGrid(\n    type=:cheb,# The top layer grid is :cheb\n    bound=[0.0, β],# The grid is defined on [0.0, β]\n    dense_at=[0.0, β],# and is densed at 0.0 and β, as given by 2nd and 3rd parameter.\n    N=5,# N of log grid\n    minterval=0.005, # minimum interval length of log grid\n    order=5 # N of bottom layer\n)\n\n# function to be represented:\nf(t) = sin(t)\n# numerical value on grid points:\ndata = [f(t) for t in tgrid]\n\n# integrate with integrate1D():\nsin1 = Interp.interp1D(data, tgrid, 1.0)\ndsin1 = Interp.differentiate1D(data, tgrid, 1.0)\n\nprintln(\"result=\", (sin1, dsin1))\nprintln(\"comparing to:\", (sin(1.0), cos(1.0)))","category":"page"},{"location":"README/","page":"Home","title":"Home","text":"result=(0.8414425112056995, 0.5400742649805592)\ncomparing to:(0.8414709848078965, 0.5403023058681398)","category":"page"},{"location":"README/#Complexity-of-Operations","page":"Home","title":"Complexity of Operations","text":"","category":"section"},{"location":"README/","page":"Home","title":"Home","text":"Grid\\Operation Floor Interpolate Integrate Differentiate\nArbitrary O(ln(N)) O(ln(N)) O(N) O(ln(N))\nUniform O(1) O(1) O(N) O(1)\nLog O(1) O(1) O(N) O(1)\nBaryCheb O(ln(N)) O(N) O(N) O(N)\nGaussLegendre O(ln(N)) O(ln(N)) O(N) O(ln(N))\nCompositeGrid O(floor(panel)*floor(sub)) O(floor(panel)*interp(sub)) O(N) O(floor(panel)*diff(sub))","category":"page"},{"location":"README/","page":"Home","title":"Home","text":"Note 1: For CompositeGrid, the complexity depends on the type of the low-level grid in the hierarchy.","category":"page"},{"location":"README/","page":"Home","title":"Home","text":"Note 2: Interpolation and differentiation of BaryCheb are implemented with high-precision algorithm, thus much less grid points are needed despite complexity.","category":"page"},{"location":"","page":"API reference","title":"API reference","text":"CurrentModule = CompositeGrids","category":"page"},{"location":"#CompositeGrids","page":"API reference","title":"CompositeGrids","text":"","category":"section"},{"location":"","page":"API reference","title":"API reference","text":"Documentation for CompositeGrids.","category":"page"},{"location":"","page":"API reference","title":"API reference","text":"","category":"page"},{"location":"","page":"API reference","title":"API reference","text":"Pages = [\n    \"lib/simple.md\",\n    \"lib/composite.md\",\n    \"lib/interpolate.md\",\t\n]\nDepth = 1","category":"page"},{"location":"lib/simple/#Basic-Grids","page":"Basic Grids","title":"Basic Grids","text":"","category":"section"},{"location":"lib/simple/","page":"Basic Grids","title":"Basic Grids","text":"Modules = [CompositeGrids.SimpleG]","category":"page"},{"location":"lib/simple/#CompositeGrids.SimpleG","page":"Basic Grids","title":"CompositeGrids.SimpleG","text":"Basic grids including common grids like arbitrary grids, uniform grids, log grids, and optimized grids like barycheb for interpolation and gausslegendre for integration.\n\n\n\n\n\n","category":"module"},{"location":"lib/simple/#CompositeGrids.SimpleG.AbstractGrid","page":"Basic Grids","title":"CompositeGrids.SimpleG.AbstractGrid","text":"All Grids are derived from AbstractGrid; ClosedGrid has bound[1], bound[2] == grid[1], grid[end], while OpenGrid has bound[1]<grid[1]<grid[end]<bound[2]\n\n\n\n\n\n","category":"type"},{"location":"lib/simple/#CompositeGrids.SimpleG.Arbitrary","page":"Basic Grids","title":"CompositeGrids.SimpleG.Arbitrary","text":"struct Arbitrary{T<:AbstractFloat} <: AbstractGrid\n\nArbitrary grid generated from given sorted grid.\n\n#Members:\n\nbound : boundary of the grid\nsize : number of grid points\ngrid : grid points\nweight : integration weight\n\n#Constructor:\n\nfunction Arbitrary{T}(grid) where {T<:AbstractFloat}\n\n\n\n\n\n","category":"type"},{"location":"lib/simple/#CompositeGrids.SimpleG.BaryCheb","page":"Basic Grids","title":"CompositeGrids.SimpleG.BaryCheb","text":"struct BaryCheb{T<:AbstractFloat} <: AbstractGrid\n\nBaryCheb grid generated on [bound[1], bound[2]] with order N.\n\n#Members:\n\nbound : boundary of the grid\nsize : number of grid points\ngrid : grid points\nweight : interpolation weight\n\n#Constructor:\n\nfunction BaryCheb{T}(bound, size) where {T<:AbstractFloat}\n\n\n\n\n\n","category":"type"},{"location":"lib/simple/#CompositeGrids.SimpleG.GaussLegendre","page":"Basic Grids","title":"CompositeGrids.SimpleG.GaussLegendre","text":"struct GaussLegendre{T<:AbstractFloat} <: AbstractGrid\n\nGaussLegendre grid generated on [bound[1], bound[2]] with order N.\n\n#Members:\n\nbound : boundary of the grid\nsize : number of grid points\ngrid : grid points\nweight : integration weight\n\n#Constructor:\n\nfunction GaussLegendre{T}(bound, size) where {T<:AbstractFloat}\n\n\n\n\n\n","category":"type"},{"location":"lib/simple/#CompositeGrids.SimpleG.Log","page":"Basic Grids","title":"CompositeGrids.SimpleG.Log","text":"struct Log{T<:AbstractFloat} <: AbstractGrid\n\nLog grid generated on [bound[1], bound[2]] with N grid points. Minimal interval is set to be minterval. Dense to sparse if d2s, vice versa.\n\nOn [0, 1], a typical d2s Log grid looks like [0, λ^(N-1), ..., λ^2, λ, 1].\n\n#Members:\n\nbound : boundary of the grid\nsize : number of grid points\ngrid : grid points\nweight : integration weight\nλ : scale parameter\nd2s : dense to sparse or not\n\n#Constructor:\n\nfunction Log{T}(bound, size, minterval, d2s) where {T<:AbstractFloat}\n\n\n\n\n\n","category":"type"},{"location":"lib/simple/#CompositeGrids.SimpleG.Uniform","page":"Basic Grids","title":"CompositeGrids.SimpleG.Uniform","text":"struct Uniform{T<:AbstractFloat} <: AbstractGrid\n\nUniform grid generated on [bound[1], bound[2]] with N points\n\n#Members:\n\nbound : boundary of the grid\nsize : number of grid points\ngrid : grid points\nweight : integration weight\n\n#Constructor:\n\nfunction Uniform{T}(bound, size) where {T<:AbstractFloat}\n\n\n\n\n\n","category":"type"},{"location":"lib/simple/#CompositeGrids.SimpleG.Uniform-Union{Tuple{BTIN}, Tuple{T}, Tuple{Any, Any}} where {T<:AbstractFloat, BTIN}","page":"Basic Grids","title":"CompositeGrids.SimpleG.Uniform","text":"function Uniform{T}(bound, N) where {T<:AbstractFloat}\n\ncreate Uniform grid.\n\n\n\n\n\n","category":"method"},{"location":"lib/simple/#Base.floor-Tuple{CompositeGrids.SimpleG.AbstractGrid, Any}","page":"Basic Grids","title":"Base.floor","text":"function Base.floor(grid::AbstractGrid, x) #where {T}\n\nuse basic searchsorted function to find the index of largest grid point smaller than x.\n\nreturn 1 for x<grid[1] and grid.size-1 for x>grid[end].\n\n\n\n\n\n","category":"method"},{"location":"lib/simple/#Base.floor-Union{Tuple{T}, Tuple{CompositeGrids.SimpleG.Log{T}, Any}} where T","page":"Basic Grids","title":"Base.floor","text":"function Base.floor(grid::Log{T}, x) where {T}\n\nfind the index of largest grid point smaller than x.\n\nreturn 1 for x<grid[1] and grid.size-1 for x>grid[end].\n\n\n\n\n\n","category":"method"},{"location":"lib/simple/#Base.floor-Union{Tuple{T}, Tuple{CompositeGrids.SimpleG.Uniform{T}, Any}} where T","page":"Basic Grids","title":"Base.floor","text":"function Base.floor(grid::Uniform{T}, x) where {T}\n\nfind the index of largest grid point smaller than x.\n\nreturn 1 for x<grid[1] and grid.size-1 for x>grid[end].\n\n\n\n\n\n","category":"method"},{"location":"lib/simple/#Base.show-Tuple{IO, CompositeGrids.SimpleG.AbstractGrid}","page":"Basic Grids","title":"Base.show","text":"show(io::IO, grid::AbstractGrid)\n\nWrite a text representation of the AbstractGrid  grid to the output stream io.\n\n\n\n\n\n","category":"method"}]
}
