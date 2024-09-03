const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.get('/calculadora', (req, res) => {
    const { operacao, n1, n2 } = req.query;

    if (!operacao || !n1 || !n2) {
        return res.status(400).json({ error: 'Parâmetros operacao, n1 e n2 são obrigatórios.' });
    }

    const num1 = parseFloat(n1);
    const num2 = parseFloat(n2);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: 'n1 e n2 devem ser números válidos.' });
    }

    
    const operacoes = {
        soma: (a, b) => a + b,
        subtracao: (a, b) => a - b,
        multiplicacao: (a, b) => a * b,
        divisao: (a, b) => {
            if (b === 0) {
                throw new Error('Divisão por zero não é permitida.');
            }
            return a / b;
        }
    };

    try {
        
        if (operacoes[operacao]) {
            const resultado = operacoes[operacao](num1, num2);
            res.json({ resultado });
        } else {
            res.status(400).json({ error: 'Operação inválida. Use soma, subtracao, multiplicacao ou divisao.' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Web Service rodando em http://localhost:${port}/calculadora`);
});
