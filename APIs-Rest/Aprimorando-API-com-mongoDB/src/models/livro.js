import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
    {
        id: { type: String },
        titulo: {type: String, required: true},
        editora: {type: mongoose.Schema.Types.ObjectId, ref: 'editoras', required: true},
        numeroPaginas: {type: Number},
        autor: {type: mongoose.Schema.Types.ObjectId, ref: 'autores', required: true}
    }
);

const livros = mongoose.model('livros', livroSchema);

export default livros;