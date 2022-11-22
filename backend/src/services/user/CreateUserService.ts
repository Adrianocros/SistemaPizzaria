import prismaClient from '../../prisma';
import {hash} from 'bcryptjs'


interface UserRequest{
    name: string;
    email: string;
    password: string;

}

//Camada para incluir os dados
class CreateUserService{
    async execute({name,email,password}:UserRequest){
        //Verifica se foi envia do um email
        if(!email){
            throw new Error('Email incorreto')
        }

        //Verificar se o email ja esta cadastrado
        const userAlreadyExists = await prismaClient.user.findFirst({
           where:{
                email: email
           }
        })

        if(userAlreadyExists){
            throw new Error("User ja existe")
        }

        //Cripitografando a senha
        const passwordHash = await hash(password, 8)

        //Cadastro de usuario
        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash,

            },
            select:{
                id:true,
                name:true,
                email:true,
            }
        })

        return user
    }
}

export {CreateUserService}