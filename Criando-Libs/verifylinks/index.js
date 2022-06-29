import fs from 'fs'

function extraiLinks(texto){
  const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm
  const arrResults = []
  let temp;
  while((temp = regex.exec(texto)) !== null){
    arrResults.push({ [temp[1]]: temp[2] })
  }
  return arrResults.length === 0 ? "não há links" : arrResults;
}

function trataErro(erro){
  throw new Error(erro.code, "No such file or directory")
}

async function PegaArquivo(caminhoDoArquivo){
  const encoding = 'utf-8'
  try{
    const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
    return extraiLinks(texto);
  } catch(erro){
    trataErro(erro)
  }
  
}

export default PegaArquivo;
