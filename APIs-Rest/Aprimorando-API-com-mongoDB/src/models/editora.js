import mongoose from "mongoose";

const editoraSchema = new mongoose.Schema(
    {
        id: {type: String},
        name: {type: String, required: true}
    },
    {
        versionKey: false
    }
);

const editoras = mongoose.model('editoras', editoraSchema);

export default editoras;