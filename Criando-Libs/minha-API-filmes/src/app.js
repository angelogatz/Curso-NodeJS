import express from "express";

const app = express();

app.use(express.json());

const filmes = [
    { id: 1, "name": "Eu sou a lenda" },
    { id: 2, "name": "Matrix" },
    { id: 3, "name": "Sobrenatural" },
    { id: 4, "name": "Fragmentado" },
    { id: 5, "name": "Senhor dos Aneis"}
]

app.get('/', (req, res) => {
    res.status(200).send('Minha lista API Filmes');
})

app.get('/filmes', (req, res) => {
    res.status(200).json(filmes);
})

app.get('/filmes/:id', (req, res) => {
    const index = BuscaFilme(req.params.id);
    res.json(filmes[index]);
})

app.post('/filmes', (req, res) => {
    filmes.push(req.body);
    res.status(201).send('livro cadastrado com sucesso');
})

app.put('/filmes/:id', (req, res) => {
    const index = BuscaFilme(req.params.id);
    filmes[index].name = req.body.name;
    res.json(livros).send('Livro atualizado com sucesso!');
})

app.delete('/filmes/:id', (req, res) => {
    const index = BuscaFilme(req.params.id);
    filmes.splice(index, 1);
    res.send(`Filme ${id} foi excluído com sucesso!`)
})

function BuscaFilme(id){
    return filmes.findIndex(filme => id == filme.id);
}



export default app;