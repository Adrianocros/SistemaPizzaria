import {useState} from 'react'
import {canSSRAuth} from '../../utils/canSSRAuth'
import Head from 'next/head'
import styles from './styles.module.scss'
import {Header} from '../../components/Header'
import {FiRefreshCcw } from 'react-icons/fi'
import {setupAPIClient} from '../../services/api'
import Modal from 'react-modal'

import {ModalOrder} from '../../components/ModalOrder'
import { toast } from 'react-toastify'



type OrderProps = {
id: string;
table: string | number;
status: boolean;
draft:  string | number;
name: string | null;
}

interface HomeProps{
    orders: OrderProps[]
}

export type OrderItemProps = {
    id:string;
    amount:number;
    order_id: string;
    product_id:string;
        product: {
            id: string;
            name:string;
            price:string;
            description:string;
            banner:string;
        }
    order:{
        id:string;
        table:string | number;
        status:boolean;
        name:string | null;
    }
}

export default function Dashboard({orders}:HomeProps){

    const [orderList, setOrderList] = useState(orders || [])

    //Fechar modal
    function handleCloseModal(){
        setModalVisible(false)
    }

    async function handleOpenModalView(id:string){
       const apiCliente = setupAPIClient();
        const response = await apiCliente.get('/order/detail',{
            params:{
                order_id:id
            }
        })
        setModalItem(response.data)
        setModalVisible(true)
    }




    Modal.setAppElement('#__next');

    const [modalItem, setModalItem] = useState<OrderItemProps[]>()
    const [modalVisible, setModalVisible] = useState(false) 

    async function handleFinishPedido(id:string){
        const apiCliente = setupAPIClient()
        await apiCliente.put('/order/finish',{
            order_id:id
        })
        const response = await apiCliente.get('/orders')
        setOrderList(response.data)
        toast.success( "Pedido finalizdo ! ", {
            position: toast.POSITION.TOP_CENTER
          });
        setModalVisible(false)
    }

    async function handleRefreshOrders() {
        const apiCliente = setupAPIClient();
    
        const response = await apiCliente.get('/orders')
        setOrderList(response.data)

    }

    return(
        <>
        <Head>
            <title>Pizza do Mané - Painel</title>
        </Head>
        <div>
            <Header/>
            <main className={styles.container}>
                <div className={styles.containerHeader}>
                    <h1>Ultimos pedidos</h1>
                    <button onClick={handleRefreshOrders}>
                        <FiRefreshCcw  size={25}color='#3fffa3' />
                    </button>
                </div>
                
                <article className={styles.listOrders}>
                    {orderList.length === 0 && (
                        <span className={styles.empityList}>Não ha pedidos em aberto !</span>
                    )}
                    {orderList.map(item => (
                        <section key={item.id} className={styles.orderItem}>
                        <button onClick={() => handleOpenModalView(item.id)}>
                            <div className={styles.tag}></div>
                            <span>Mesa {item.table}</span>
                        </button>
                    </section>
                    ))}                
                </article>

            </main>
            {modalVisible &&(
                <ModalOrder
                isOpen={modalVisible}
                onRequestClose={handleCloseModal}
                order={modalItem}
                handleFinishOrder={handleFinishPedido}
                />

                
            )}
        </div>
        </>
    )
}
//So usuario logam
export const getServerSideProps = canSSRAuth(async (ctx) =>{
    const apiCliente = setupAPIClient(ctx)

    const response = await apiCliente.get('/orders')
    
    return{
        props:{
            orders: response.data
        }
    }
} )