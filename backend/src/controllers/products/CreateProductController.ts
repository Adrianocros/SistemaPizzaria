import {Request, Response} from 'express'
import { CreateProductService } from '../../services/Products/CreateProductService'

class CreateProductController{
    async handle(req: Request, res: Response){

        const{name,price,description,category_id} = req.body;  

        const createProductService = new CreateProductService();

        if(!req.file){
            throw new Error("Erro ao carregar a foto")
        }else{
            const {originalname, filename:banner} = req.file;
            const produt = await createProductService.execute({
                name,
                price,
                description,
                banner,
                category_id,
            });
            return res.json(produt)
        }
    }
}

export {CreateProductController}