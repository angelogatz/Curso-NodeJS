import editoras from "../models/editora.js";

class EditorasController{

    static listarEditoras = (req, res) => {
        editoras.find((erro, editoras) => {
            res.status(200).json(editoras);
        });
    }

    static listarEditoraPorId = (req, res) => {
        const id = req.params.id

        editoras.findById(id, (err, editoras) => {
            if(err){
                res.status(404).send({message: `${err.message} Id do editora não foi encontrado na lista.`})
            } else {
                res.status(200).send(editoras)
            }
        })
    }

    static cadastrarEditora = (req, res) => {
        let editora = new editoras(req.body);
        editora.save((err) => {
            if(err){
                res.status(500).send({message: `${err.message} - falha ao cadastrar livro.`})
            } else {
                res.status(201).send(editora.toJSON())
            }
        })
    }

    static atualizarEditora = (req, res) => {
        const { id } = req.params

        editoras.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err){
                res.status(200).send({message: 'editora atualizado com sucesso'})
            } else {
                res.status(500).send({message: `${err.message} - falha ao atualizar editora.`})
            }
        })
    }

    static excluirEditora = (req, res) => {
        const { id } = req.params
        editoras.findByIdAndDelete(id, (err) => {
            if(!err){
                res.status(200).send({message: 'editora removido com sucesso'})
            } else {
                res.status(500).send({message: err.message})
            }
        })
    }
}

export default EditorasController;