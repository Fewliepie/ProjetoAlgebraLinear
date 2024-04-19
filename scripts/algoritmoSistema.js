function parseEquation(equation) {
    // Remove espaços e divide a equação em LHS (esquerda) e RHS (direita)
    const [lhs, rhs] = equation.replace(/\s/g, '').split('=');

    // Coeficientes e variáveis padrão para equações com x, y, z
    let coefficients = [0, 0, 0]; // [coeficiente de x, coeficiente de y, coeficiente de z]
    let variablePattern = /([-+]?\d*)([xyz])/g;
    let match;

    // Extraia todos os pares de coeficientes e variáveis
    while ((match = variablePattern.exec(lhs)) !== null) {
        let [_, coeff, variable] = match;
        if (coeff === '' || coeff === '+') coeff = '1';
        if (coeff === '-') coeff = '-1';
        let index = variable === 'x' ? 0 : variable === 'y' ? 1 : 2;
        coefficients[index] = parseFloat(coeff);
    }

    // Converta o lado direito para número
    let constant = parseFloat(rhs);

    return [...coefficients, constant];
}

function gaussJordanElimination(matrix, constants) {
    let n = constants.length;
    let stages = [];  // Lista para armazenar os estágios da matriz
    let solution = new Array(n).fill(0);  // Definindo a solução aqui para garantir o escopo

    // Construindo a matriz aumentada
    for (let i = 0; i < n; i++) {
        matrix[i].push(constants[i]);
    }
    stages.push(matrix.map(row => row.slice())); // Cópia profunda do estado inicial

    // Escalonamento de Gauss
    for (let i = 0; i < n; i++) {
        let maxRow = i;
        for (let k = i + 1; k < n; k++) {
            if (Math.abs(matrix[k][i]) > Math.abs(matrix[maxRow][i])) {
                maxRow = k;
            }
        }

        [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]];

        if (matrix[i][i] === 0) {
            let allZero = matrix[i].every(val => val === 0);
            if (!allZero) {
                return { solution: "Sistema impossível", stages };
            }
            continue;
        }

        for (let k = i + 1; k < n; k++) {
            let factor = -matrix[k][i] / matrix[i][i];
            for (let j = i; j < n + 1; j++) {
                if (i === j) {
                    matrix[k][j] = 0;
                } else {
                    matrix[k][j] += factor * matrix[i][j];
                }
            }
        }

        stages.push(matrix.map(row => row.slice())); // Cópia profunda após cada operação
    }

    // Resolvendo de volta
    for (let i = n - 1; i >= 0; i--) {
        solution[i] = matrix[i][n] / matrix[i][i];
        for (let k = i - 1; k >= 0; k--) {
            matrix[k][n] -= matrix[k][i] * solution[i];
        }
    }

    // Formatação do conjunto solução
    let formattedSolution = solution.map((s, index) => `x${index + 1} = ${s.toFixed(2)}`).join(', ');

    return { solution: "Conjunto solução: " + formattedSolution, stages };
}


module.exports = {
    parseEquation,
    gaussJordanElimination
}
