document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('formCalcular').addEventListener('submit', function (e) {
        e.preventDefault();
        
        const matriz1 = [...document.querySelectorAll('#matriz1 tr')].map(row =>
            [...row.querySelectorAll('input')].map(input => parseFloat(input.value))
        );
        console.log(matriz1)
        const matriz2 = [...document.querySelectorAll('#matriz2 tr')].map(row =>
            [...row.querySelectorAll('input')].map(input => parseFloat(input.value))
        );
        console.log(matriz2)
        const resultadoSoma = matriz1.map((row, i) =>
            row.map((cell, j) => cell + matriz2[i][j])
        );

        console.log(resultadoSoma)

        let tabelaResultado = document.getElementById('resultadoSoma');
        if (!tabelaResultado) {
            tabelaResultado = document.createElement('table');
            tabelaResultado.id = 'resultadoSoma';

            const containerResultado = document.createElement('div');
            containerResultado.appendChild(tabelaResultado);

             tituloResultado = document.createElement('h2');
            tituloResultado.textContent = 'Resultante:';
            containerResultado.insertBefore(tituloResultado, tabelaResultado);

            const divMatrizes = document.querySelector('div[style="margin-top: 20px; display: flex; align-items: center;"]');

            if (divMatrizes) {
                divMatrizes.appendChild(containerResultado);
            } else {
                document.getElementById('formCalcular').after(containerResultado);
            }
        }
        tabelaResultado.innerHTML = '';
        resultadoSoma.forEach((row, rowIndex) => {

            let tbody = tabelaResultado.querySelector('tbody');
            if (!tbody) {
                tbody = document.createElement('tbody');
                tabelaResultado.appendChild(tbody);
            }

            const tr = document.createElement('tr');
            row.forEach((cell, cellIndex) => {
                const td = document.createElement('td');
                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'matriz-input';
                input.name = `resultado[${rowIndex}][${cellIndex}]`;
                input.value = cell.toFixed();

                td.appendChild(input);
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
    });
});
