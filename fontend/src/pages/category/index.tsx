import {useState, FormEvent} from 'react'
import Head from "next/head"
import {Header} from '../../components/Header'
import styles from './styles.module.scss'

import {setupAPIClient} from '../../services/api'
import { toast } from 'react-toastify'

import {canSSRAuth} from '../../utils/canSSRAuth'



export default function Category(){
    const [name, setName] = useState('')

    async function handleRegister(event:FormEvent){
        event.preventDefault()
        if(name === ''){
            return
        }

        const apiClient = setupAPIClient();
        await apiClient.post('/category',{
            name:name
        })

            toast.success('Categoria cadastrada com sucesso !')
            setName('')
        
    }


    return(
        <>
        <Head>
            <title>Pizza do Mané - Nova Categoria</title>
        </Head>
        <div>
            <Header/>
            <main className={styles.container}>
                <h1>Cadastrar Categoria</h1>

                <form className={styles.form} onSubmit={handleRegister}>
                    <input className={styles.input} 
                    type="text" 
                    placeholder="Digite o nome da categoria"
                    value={name}
                   onChange={(e) => setName(e.target.value)}
                    />

                    <button className={styles.btnAdd} type="submit">
                        Cadastrar
                    </button>
                </form>
            </main>
        </div>
        </>
    )
}

//Função para validar se esta logado
export const getServerSideProps = canSSRAuth(async (ctx) =>{
    return{
        props:{}
    }
})

