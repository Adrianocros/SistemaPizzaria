import {NextFunction, Request, Response} from 'express'
import {verify} from 'jsonwebtoken'

interface Payload{
    sub: string;
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
){
    //recebe o token
    const authToken = req.headers.authorization;

    //Barra o se nao tiver token
    if(!authToken){
        return res.status(401).end();
    }
    const[,token] = authToken.split(" ")
    
    try{
        //Validar o token
        const{sub} = verify(
            token,
            process.env.JWT_SECRET
        ) as Payload;

        //Recuperar o ID do token e colocar na variavel UserID dentro do REQ
        req.user_id = sub;

        return next()
    }catch(err){
        return res.status(401).end();
    }
  
}