import {Router} from 'express'
import multer from 'multer'
import uploadConfig from './config/multer'
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserControler'
import { DetailUserController } from './controllers/user/DetailUserController'
import {isAuthenticated} from './middewares/isAuthenticated'
import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListaCategoryController } from './controllers/category/ListaCategoryController'
import { CreateProductController } from './controllers/products/CreateProductController'
import { ListByCategoryControlle } from './controllers/products/ListByCategoryControlle'
import {CreateOrderController} from './controllers/order/CreateOrderController'
import {RemoveOrderController} from './controllers/order/RemoveOrderController'
import {AddItemController} from './controllers/order/AddItemController'
import {RemoveItensController} from './controllers/order/RemoveItensController'
import{SendOrderController} from './controllers/order/SendOrderController'
import{ListOrdersController} from './controllers/order/ListOrdersController'
import {DetailOrderController} from './controllers/order/DetailOrderController'
import {FinishOrderController} from './controllers/order/FinishOrderController'

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));


//Rotas User
router.post('/users',new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/userInfo',isAuthenticated, new DetailUserController().handle)


//Rotas Category
router.post('/category', isAuthenticated, new CreateCategoryController().handle )
router.get('/category', isAuthenticated, new ListaCategoryController().handle)


//Rotas Products
router.post('/product',isAuthenticated, upload.single('banner'), new CreateProductController().handle)
router.get('/category/product', isAuthenticated, new ListByCategoryControlle().handle)

//Orders
router.post('/order', isAuthenticated, new CreateOrderController().handle )
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)
router.post('/order/add',isAuthenticated, new AddItemController().handle)
router.delete('/order/remove',isAuthenticated,new RemoveItensController().handle)
router.put('/order/send',isAuthenticated, new SendOrderController().handle)
router.get('/orders',isAuthenticated, new ListOrdersController().handle)
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle)
router.put('/order/finish',isAuthenticated, new FinishOrderController().handle )


export{router};
