// const database = require('../models');
// const Sequelize = require('sequelize');

const { PessoasServices } = require('../services')
const pessoasServices = new PessoasServices()
const matriculasServices = new PessoasServices('Matriculas')

class PessoaController {
  static async pegaPessoasAtivas(req, res){
    try {
      const pessoasAtivas = await pessoasServices.pegaRegistrosAtivos()
      return res.status(200).json(pessoasAtivas)  
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaTodasAsPessoas(req, res){
    try {
      const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros()
      return res.status(200).json(todasAsPessoas)  
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaUmaPessoa(req, res) {
    const { id } = req.params
    try {
      const umaPessoa = await pessoasServices.pegaUmRegistro(id)
      return res.status(200).json(umaPessoa)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async criaPessoa(req, res) {
    const novaPessoa = req.body
    try {
      const novaPessoaCriada = await pessoasServices.criaRegistro(novaPessoa)
      return res.status(200).json(novaPessoaCriada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async atualizaPessoa(req, res) {
    const { id } = req.params
    const novasInfos = req.body
    try {
      await pessoasServices.atualizaRegistro(novasInfos, id)
      const pessoaAtualizada = await pessoasServices.pegaUmRegistro(id)
      return res.status(200).json(pessoaAtualizada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async apagaPessoa(req, res) {
    const { id } = req.params
    try {
      await pessoasServices.apagaRegistro(id)
      return res.status(200).json({ mensagem: `id ${id} deletado` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async restauraPessoa(req, res){
    const { id } = req.params
    try{
      await pessoasServices.restauraRegistro(id)
      return res.status(200).json( { 
        mensagem: `id ${id} restaurado com sucesso!` 
      })
    }catch(error){
      return res.status(500).json(error.message)
    }
  }

  // http://localhost:3001/pessoa/1/matricula/5
  // http://localhost:3001/pessoa/:estudanteID/matricula/:matriculaID

  static async pegaUmaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params
    try {
      const umaMatricula = await pessoasServices.pegaUmaMatricula(estudanteId, matriculaId)
      return res.status(200).json(umaMatricula)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async criaMatricula(req, res) {
    const { estudanteId } = req.params
    const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
    try {
      const novaMatriculaCriada = await pessoasServices.criaRegistro(novaMatricula)
      return res.status(200).json(novaMatriculaCriada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async atualizaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params
    const novasInfos = req.body
    try {
      await pessoasServices.atualizaMatricula(novasInfos, estudanteId, matriculaId)
      const matriculaAtualizada = await pessoasServices.pegaUmRegistro(matriculaId)
      return res.status(200).json(matriculaAtualizada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async apagaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params
    try {
      await pessoasServices.apagaRegistro(matriculaId)
      return res.status(200).json({ mensagem: `A matricula ${matriculaId} do estudante ${estudanteId} foi excluida com sucesso` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async restauraMatricula(req, res){
    const { estudanteId, matriculaId } = req.params
    try{
      await pessoasServices.restauraMatricula(estudanteId, matriculaId)
      return res.status(200).json( { 
        mensagem: `id ${id} restaurado com sucesso!` 
      })
    }catch(error){
      return res.status(500).json(error.message)
    }
  }

  static async pegaMatriculas(req, res) {
    const { estudanteId } = req.params
    try {
      const pessoa = await pessoasServices.pegaUmRegistro(estudanteId)

      const matriculas = await pessoa.getAulasMatriculadas()

      return res.status(200).json(matriculas)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaMatriculasPorTurma(req, res) {
    const { turmaId } = req.params
    try {
      const todasAsMatriculas = await matriculasServices
      .pegaMatriculasPorTurma(
      {
        turma_id: Number(turmaId),
        status: 'confirmado'
      },
      {
        limit: 20,
        order: [['estudante_id', 'ASC']]
      }
    )
      return res.status(200).json(todasAsMatriculas)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaTurmasLotadas(req, res) {
    const lotacaoTurma = 2
    try {
      const turmasLotadas = await pessoasServices.pegaTurmasLotadas(lotacaoTurma)
      return res.status(200).json(turmasLotadas.count)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async cancelaPessoa(req, res) {
    const { estudanteId } = req.params
    try {
      await pessoasServices.cancelaPessoasEMatriculas(Number(estudanteId))
      return res.status(200).json({
        message: `matrícula ref. estudante ${estudanteId} canceladas`
      })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = PessoaController