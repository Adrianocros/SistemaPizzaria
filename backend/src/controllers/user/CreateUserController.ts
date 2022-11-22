import {Request, Response, response} from 'express'
import { CreateUserService } from '../../services/user/CreateUserService'
//Faz a tratativa de pegar os dados
class CreateUserController{
    async handle(req: Request, res:Response){
       const {name, email, password} = req.body;

       const createUserService = new CreateUserService()

       const user = await createUserService.execute({
        name,
        email,
        password
       });

        return res.json(user);
    }
}

export {CreateUserController}