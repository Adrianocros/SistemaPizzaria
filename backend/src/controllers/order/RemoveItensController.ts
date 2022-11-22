import {Request, Response} from 'express'
import {RemoveItensService} from '../../services/order/RemoveItensService'

class RemoveItensController{
   async handle(req: Request, res:Response ){
        const item_id = req.query.item_id as string;

        const removeItensService = new RemoveItensService();

        const order = await removeItensService.execute({
            item_id
        })
      return res.json(order)
   }
}

export {RemoveItensController}