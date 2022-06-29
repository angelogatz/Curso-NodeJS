import fetch from "node-fetch";

function handleError(erro){
    throw new Error(erro.message)
}

async function statusCheck(arrURLs){
    try{
        const arrStatus = await Promise
                .all(arrURLs
                    .map(async url => {
                    const res = await fetch(url)
                    return `${res.status} - ${res.statusText}`;
            }))
            return arrStatus;
    } catch(erro){
        handleError(erro)
    }
}

function geraArr(arrLinks){
    return arrLinks
    .map(objetoLink => Object
        .values(objetoLink).join())
}

async function ValidaURLs(arrLinks){
    const links =  geraArr(arrLinks);
    const statusLinks = await statusCheck(links)
    const results = arrLinks
        .map((objeto, indice) => ({
            ...objeto,
            status: statusLinks[indice] 
        }))
    return results
}

export default ValidaURLs