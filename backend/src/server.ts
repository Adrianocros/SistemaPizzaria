import express, {Request, Response, NextFunction} from 'express'
import 'express-async-errors'
import cors from 'cors'
import path from 'path'

import { router } from './routes'

const app = express();
app.use(express.json())
app.use(cors()) //Abilitando para qualquer IP acesse a API


//Roteamento
app.use(router)

//Rota estatica para imagens TMP
app.use(
    '/files',
    express.static(path.resolve(__dirname, '..','tmp'))
    )

//Tratativa de erros
app.use((err:Error, req: Request,res:Response, next:NextFunction) =>{
    if(err instanceof Error){
        //Se for instancia de erro
        return res.status(400).json({
           erro:err.message
            
        })
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    })
})

app.listen(3333,()=>{
    console.log('Server ON !!!')
})