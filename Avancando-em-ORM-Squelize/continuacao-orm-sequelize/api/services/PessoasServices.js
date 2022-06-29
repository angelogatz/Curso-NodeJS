const Services = require('./Services');
const database = require('../models')

class PessoasServices extends Services {
    constructor(){
        super('Pessoas')
        this.matriculas = new Services('Matriculas')
    }
    //métodos específicos do controlador de pessoas

    async pegaRegistrosAtivos(where = {}){
        return database[this.nomeDoModelo]
            .findAll({
                where: {
                    ...where
                }
            })
    }

    async pegaTodosOsRegistros(where = {}){
        return database[this.nomeDoModelo]
            .scope('todos')
            .findAll({
                where: {
                    ...where
                }
            })
    }

    async cancelaPessoasEMatriculas(estudanteId){
        return database.sequelize.transaction(async transacao => {
            await super.atualizaRegistro({
                ativo: false
            },
            estudanteId, 
            {
                transaction: transacao
            })

            await this.matriculas.atualizaRegistros({
                status: 'cancelado'
            }, {
                estudante_id: estudanteId
            }, {
                transaction: transacao
            })
        })
    }

    async pegaUmaMatricula(estudanteId, matriculaId){
        return database[this.nomeDoModelo].findOne( { 
            where: { 
              id: Number(matriculaId),
              estudante_id: Number(estudanteId) 
            }
          })
    }

    async restauraMatricula(estudanteId, matriculaId){
        return database[this.nomeDoModelo].restore({ 
            where: { 
              id: Number(matriculaId),
              estudante_id: Number(estudanteId) 
            }
        })
    }

    

    async pegaTurmasLotadas(lotacaoTurma){
        return database[this.nomeDoModelo].findAndCountAll({
            where: {
              status: 'confirmado'
            },
            attributes: ['turma_id'],
            group: ['turma_id'],
            having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
        })
    }

    async atualizaMatricula(dadosAtualizados, estudanteId, matriculaId){
        return database[this.nomeDoModelo]
            .update(dadosAtualizados, { 
                where: { 
                  id: Number(matriculaId),
                  estudante_id: Number(estudanteId) 
                }
            })
    }
}

module.exports = PessoasServices;