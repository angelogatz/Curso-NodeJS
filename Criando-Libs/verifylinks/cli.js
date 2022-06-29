#!/user/bin/env node
import PegaArquivo from "./index.js"
import ValidaURLs from "./http-validacao.js";

const path = process.argv

async function processaTexto(caminhoDoArquivo){
    const result = await PegaArquivo(caminhoDoArquivo[2]);
    if(path[3] === 'validar'){
        console.log('links validados', await ValidaURLs(result))
    }

}

processaTexto(path)