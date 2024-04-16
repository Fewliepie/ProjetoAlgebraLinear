function testSystems() {
    let system1 = {
        matrix: [[1, 2, -1], [3, -1, 1], [2, 2, 3]],
        constants: [3, 1, -4]
    };

    let system2 = {
        matrix: [[1, 2, -1], [2, 4, -2], [3, 6, -3]],
        constants: [3, 6, 9]
    };

    let system3 = {
        matrix: [[1, 2, -1], [1, 2, -1], [2, 4, -2]],
        constants: [3, 4, 8]
    };

    console.log("Sistema 1: " + gaussJordanElimination(system1.matrix.map(row => row.slice()), system1.constants));
    console.log("Sistema 2: " + gaussJordanElimination(system2.matrix.map(row => row.slice()), system2.constants));
    console.log("Sistema 3: " + gaussJordanElimination(system3.matrix.map(row => row.slice()), system3.constants));
}

testSystems();
