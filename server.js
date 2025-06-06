const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const jsonFilePath = path.join(__dirname, 'src', 'DB_Json', 'repo_doc.json');

app.post('/api/docs', (req, res) => {
    const { doc, status } = req.body;

    if (!doc || !status) {
        return res.status(400).json({ message: 'Os campos "doc" e "status" são obrigatórios.' });
    }

    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo JSON:', err);
            return res.status(500).json({ message: 'Erro interno ao ler o arquivo.' });
        }

        try {
            const docs = JSON.parse(data);
            const newId = docs.length > 0 ? Math.max(...docs.map(d => d.id)) + 1 : 1;

            const newDoc = {
                id: newId,
                href: "", // Href vazio por padrão
                doc,
                status
            };

            docs.push(newDoc);

            fs.writeFile(jsonFilePath, JSON.stringify(docs, null, 2), 'utf8', (writeErr) => {
                if (writeErr) {
                    console.error('Erro ao salvar o arquivo JSON:', writeErr);
                    return res.status(500).json({ message: 'Erro interno ao salvar o arquivo.' });
                }
                res.status(201).json({ message: 'Documento adicionado com sucesso!', doc: newDoc });
            });
        } catch (parseErr) {
            console.error('Erro ao fazer o parse do JSON:', parseErr);
            res.status(500).json({ message: 'Erro interno ao processar o arquivo JSON.' });
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
