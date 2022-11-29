export class AuthTokenErro extends Error{
    constructor(){
        super("Erro ao se loga com token")
    }
}