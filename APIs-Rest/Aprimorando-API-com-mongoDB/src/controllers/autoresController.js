import autores from "../models/Autor.js";

class AutoresController{

    static listarAutores = (req, res) => {
        autores.find((erro, autores) => {
            res.status(200).json(autores);
        });
    }

    static listarAutorPorId = (req, res) => {
        const id = req.params.id

        autores.findById(id, (err, autores) => {
            if(err){
                res.status(404).send({message: `${err.message} Id do autor não foi encontrado na lista.`})
            } else {
                res.status(200).send(autores)
            }
        })
    }

    static cadastrarAutor = (req, res) => {
        let autor = new autores(req.body);
        autor.save((err) => {
            if(err){
                res.status(500).send({message: `${err.message} - falha ao cadastrar livro.`})
            } else {
                res.status(201).send(autor.toJSON())
            }
        })
    }

    static atualizarAutor = (req, res) => {
        const { id } = req.params

        autores.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err){
                res.status(200).send({message: 'autor atualizado com sucesso'})
            } else {
                res.status(500).send({message: `${err.message} - falha ao atualizar autor.`})
            }
        })
    }

    static excluirAutor = (req, res) => {
        const { id } = req.params
        autores.findByIdAndDelete(id, (err) => {
            if(!err){
                res.status(200).send({message: 'autor removido com sucesso'})
            } else {
                res.status(500).send({message: err.message})
            }
        })
    }
}

export default AutoresController;