const Services = require('./Services');
const database = require('../models')

class MatriculasServices extends Services {
    constructor(){
        super('Matriculas')
    }
    //métodos específicos do controlador de Matriculas
}

module.exports = MatriculasServices;