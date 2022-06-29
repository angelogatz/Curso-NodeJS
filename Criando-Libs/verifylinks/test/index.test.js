import PegaArquivo from "../src/index.js";

const arrResult = [
    {
        FileList: 'https://developer.mozilla.org/pt-BR/docs/Web/API/FileList'
    }
]

describe('PegaArquivo::', () => {
    it('Must be a function', () => {
        expect(typeof PegaArquivo).toBe('function');
    })
    it('Must return a array with results', async () => {
        const resultado = await PegaArquivo('/home/angelo/Documentos/Cursos back-end - Emergir/intro nodejs/test/arquivos/texto1.md')
        expect(resultado).toEqual(arrResult)
    })
    it('Return "não há links"', async () => {
        const resultado = await PegaArquivo('/home/angelo/Documentos/Cursos back-end - Emergir/intro nodejs/test/arquivos/texto1_semilinks.md')
        expect(resultado).toBe('não há links')
    })
})

