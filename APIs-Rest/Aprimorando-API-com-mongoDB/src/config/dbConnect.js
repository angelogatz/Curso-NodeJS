import mongoose from "mongoose";

mongoose.connect(
    "mongodb+srv://angelogatz:g27h6032@cursoalura.ho3jlza.mongodb.net/alura-node"
);

let db = mongoose.connection;

export default db;