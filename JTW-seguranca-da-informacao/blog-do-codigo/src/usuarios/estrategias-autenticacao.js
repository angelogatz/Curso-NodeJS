const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const Usuario = require('./usuarios-modelo');
const { InvalidArgumentError } = require('../erros')
const bcrypt = require('bcrypt');

function VerificaUsuario(usuario){
    if(!usuario){
        throw new InvalidArgumentError('Não existe usuário com este e-mail.');
    }
}

async function VerificaSenha(senha, senhaHash){
    const senhaValida = await bcrypt.compare(senha, senhaHash);
    if(!senhaValida){
        throw new InvalidArgumentError('E-mail ou senha inválidos.')
    }
}

passport.use(
    new localStrategy({
        usernameField: 'email',
        passwordField: 'senha',
        session: false
    }, async (email, senha, done) => {
        try{
            const usuario = await Usuario.buscaPorEmail(email);
            VerificaUsuario(usuario);
            VerificaSenha(senha, usuario.senhaHash);

            done(null, usuario);
        }catch(error){
            done(error);
        }
        
    })
)