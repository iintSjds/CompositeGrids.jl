@testset "Interpolate" begin
    @testset "Linear1D" begin
        β = π
        tgrid = SimpleGrid.Uniform{Float64}([0.0, β], 33)
        # tugrid = Grid.Uniform{Float64,33}(0.0, β, (true, true))
        # kugrid = Grid.Uniform{Float64,33}(0.0, maxK, (true, true))
        f(t) = t
        data = zeros(tgrid.size)

        for (ti, t) in enumerate(tgrid.grid)
            data[ti] = f(t)
        end

        for ti = 1:tgrid.size - 1
            t = tgrid[ti] + 1.e-6
            fbar = Interp.interp1D(data, tgrid, t)
            @test abs(f(tgrid[ti]) - fbar) < 3.e-6 # linear interpolation, so error is δK+δt
            @test f(tgrid[ti]) < fbar
            @test f(tgrid[ti + 1]) > fbar
        end
        for ti = 2:tgrid.size
            t = tgrid[ti] - 1.e-6
            fbar = Interp.interp1D(data, tgrid, t)
            @test abs(f(tgrid[ti]) - fbar) < 3.e-6 # linear interpolation, so error is δK+δt
            @test f(tgrid[ti]) > fbar
            @test f(tgrid[ti - 1]) < fbar
        end

        t = tgrid[1] + eps(Float64)*1e3
        fbar = Interp.interp1D(data, tgrid, t)
        @test abs(f(t) - fbar) < 3.e-6 # linear interpolation, so error is δK+δt

        t = tgrid[tgrid.size] - eps(Float64)*1e3
        fbar = Interp.interp1D(data, tgrid, t)
        @test abs(f(t) - fbar) < 3.e-6 # linear interpolation, so error is δK+δt

        tlist = rand(10) * β
        # println(tlist)

        for (ti, t) in enumerate(tlist)
            fbar = Interp.interp1D(data, tgrid, t)
            # println("$k, $t, $fbar, ", f(k, t))
            @test abs(f(t) - fbar) < 3.e-6 # linear interpolation, so error is δK+δt
        end
    end

    @testset "LinearND" begin
        β = π
        tgrid = SimpleGrid.Uniform{Float64}([0.0, β], 22)
        # tugrid = Grid.Uniform{Float64,33}(0.0, β, (true, true))
        # kugrid = Grid.Uniform{Float64,33}(0.0, maxK, (true, true))
        f(t1,t2) = 1.0+t1+t2+t1*t2
        data = zeros((tgrid.size,tgrid.size))

        for (ti, t) in enumerate(tgrid.grid)
            for (di, d) in enumerate(tgrid.grid)
                data[ti, di] = f(t,d)
            end
        end

        for ti = 1:tgrid.size - 1
            for di = 1:tgrid.size - 1
                t = tgrid[ti] + 1.e-6
                d = tgrid[di] + 1.e-6
                fbar = Interp.linearND(data, [tgrid,tgrid], [t,d])
                @test abs(f(tgrid[ti],tgrid[di]) - fbar) < 9.e-6 # linear interpolation, so error is dδt+tδd+δt+δd
                @test f(tgrid[ti],tgrid[di]) < fbar
                @test f(tgrid[ti + 1],tgrid[di+1]) > fbar
            end
        end
        for ti = 2:tgrid.size
            for di = 2:tgrid.size
                t = tgrid[ti] - 1.e-6
                d = tgrid[di] - 1.e-6
                fbar = Interp.linearND(data, [tgrid,tgrid], [t,d])
                @test abs(f(tgrid[ti],tgrid[di]) - fbar) < 9.e-6 # linear interpolation, so error is dδt+tδd+δt+δd
                @test f(tgrid[ti],tgrid[di]) > fbar
                @test f(tgrid[ti - 1],tgrid[di - 1]) < fbar
            end
        end

        tlist = rand(10) * β
        dlist = rand(10) * β
        # println(tlist)

        for (ti, t) in enumerate(tlist)
            for (di, d) in enumerate(tlist)
                fbar = Interp.linearND(data, [tgrid,tgrid], [t,d])
                @test abs(f(t,d) - fbar) < 9.e-6 # linear interpolation, so error is δK+δt
            end
        end
    end


    @testset "BaryCheb" begin
        β = π
        tgrid = SimpleGrid.BaryCheb{Float64}([0.0, β], 16)
        # tugrid = Grid.Uniform{Float64,33}(0.0, β, (true, true))
        # kugrid = Grid.Uniform{Float64,33}(0.0, maxK, (true, true))
        f(t) = t
        data = zeros(tgrid.size)

        for (ti, t) in enumerate(tgrid.grid)
            data[ti] = f(t)
        end

        for ti = 1:tgrid.size - 1
            t = tgrid[ti] + 1.e-6
            fbar = Interp.interp1D(data, tgrid, t)
            @test abs(f(tgrid[ti]) - fbar) < 3.e-6 # linear interpolation, so error is δK+δt
            @test f(tgrid[ti]) < fbar
            @test f(tgrid[ti + 1]) > fbar
        end
        for ti = 2:tgrid.size
            t = tgrid[ti] - 1.e-6
            fbar = Interp.interp1D(data, tgrid, t)
            @test abs(f(tgrid[ti]) - fbar) < 3.e-6 # linear interpolation, so error is δK+δt
            @test f(tgrid[ti]) > fbar
            @test f(tgrid[ti - 1]) < fbar
        end

        t = tgrid[1] + eps(Float64)*1e3
        fbar = Interp.interp1D(data, tgrid, t)
        @test abs(f(t) - fbar) < 3.e-6 # linear interpolation, so error is δK+δt

        t = tgrid[tgrid.size] - eps(Float64)*1e3
        fbar = Interp.interp1D(data, tgrid, t)
        @test abs(f(t) - fbar) < 3.e-6 # linear interpolation, so error is δK+δt

        tlist = rand(10) * β
        # println(tlist)

        for (ti, t) in enumerate(tlist)
            fbar = Interp.interp1D(data, tgrid, t)
            # println("$k, $t, $fbar, ", f(k, t))
            @test abs(f(t) - fbar) < 3.e-6 # linear interpolation, so error is δK+δt
        end
    end

    @testset "DensedLog" begin
        β = 4
        tgrid = CompositeGrid.LogDensedGrid(:cheb, [0.0, β], [0.0, 0.5β, β], 4, 0.001, 4)
        # tugrid = Grid.Uniform{Float64,33}(0.0, β, (true, true))
        # kugrid = Grid.Uniform{Float64,33}(0.0, maxK, (true, true))
        f(t) = t
        data = zeros(tgrid.size)

        for (ti, t) in enumerate(tgrid.grid)
            data[ti] = f(t)
        end

        for ti = 1:tgrid.size - 1
            t = tgrid[ti] + 1.e-6
            fbar = Interp.interp1D(data, tgrid, t)
            @test abs(f(tgrid[ti]) - fbar) < 3.e-6 # linear interpolation, so error is δK+δt
            @test f(tgrid[ti]) < fbar
            @test f(tgrid[ti + 1]) > fbar
        end
        for ti = 2:tgrid.size
            t = tgrid[ti] - 1.e-6
            fbar = Interp.interp1D(data, tgrid, t)
            @test abs(f(tgrid[ti]) - fbar) < 3.e-6 # linear interpolation, so error is δK+δt
            @test f(tgrid[ti]) > fbar
            @test f(tgrid[ti - 1]) < fbar
        end

        t = tgrid[1] + eps(Float64)*1e3
        fbar = Interp.interp1D(data, tgrid, t)
        @test abs(f(t) - fbar) < 3.e-6 # linear interpolation, so error is δK+δt

        t = tgrid[tgrid.size] - eps(Float64)*1e3
        fbar = Interp.interp1D(data, tgrid, t)
        @test abs(f(t) - fbar) < 3.e-6 # linear interpolation, so error is δK+δt

        tlist = rand(10) * β
        tlist = sort(tlist)
        println(tlist)
        ff = Interp.interpGrid(data, tgrid, tlist)
        ff_c = similar(ff)

        for (ti, t) in enumerate(tlist)
            fbar = Interp.interp1D(data, tgrid, t)
            ff_c[ti] = fbar
            # println("$k, $t, $fbar, ", f(k, t))
            @test abs(f(t) - fbar) < 3.e-6 # linear interpolation, so error is δK+δt
            @test abs(f(t) - ff[ti]) < 3.e-6 # linear interpolation, so error is δK+δt
        end
        # println(tgrid.grid)
        # println("ff_c:",ff_c)
        # println("ff:",ff)
    end

    @testset "Integrate" begin
        β = 1.0
        tgrid = SimpleGrid.GaussLegendre{Float64}([0.0, β], 4)
        # tugrid = Grid.Uniform{Float64,33}(0.0, β, (true, true))
        # kugrid = Grid.Uniform{Float64,33}(0.0, maxK, (true, true))
        f(t) = t
        data = zeros(tgrid.size)
        for (ti, t) in enumerate(tgrid.grid)
            data[ti] = f(t)
        end
        println(tgrid.grid)
        println(data)
        println(tgrid.weight)
        println(sum(data.*tgrid.weight))
        int_result = Interp.integrate1D(data, tgrid)
        @test abs(int_result - 0.5) < 3.e-6

        β = 1.0
        tgrid = CompositeGrid.LogDensedGrid(:gauss, [0.0, β], [0.0, 0.5β, β], 2, 0.001, 3)
        # tugrid = Grid.Uniform{Float64,33}(0.0, β, (true, true))
        # kugrid = Grid.Uniform{Float64,33}(0.0, maxK, (true, true))
        data = zeros(tgrid.size)
        for (ti, t) in enumerate(tgrid.grid)
            data[ti] = f(t)
        end
        println(tgrid.grid)
        println(data)
        int_result = Interp.integrate1D(data, tgrid)
        @test abs(int_result - 0.5) < 3.e-6
    end
end
