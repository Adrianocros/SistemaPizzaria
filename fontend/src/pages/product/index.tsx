import {useState, ChangeEvent, FormEvent} from 'react'
import Head from "next/head";
import { Header } from "../../components/Header";
import { canSSRAuth } from "../../utils/canSSRAuth";
import styles from './styles.module.scss'
import { FiUpload} from 'react-icons/fi'
import {setupAPIClient} from '../../services/api'
import { FaFileUpload, FaIdBadge } from "react-icons/fa";
import { type } from 'os';
import { toast } from 'react-toastify';


type ItemProps ={
    id:string,
    name:string
}

interface CategoryProps{
    categoryList:ItemProps[]
}

export default function Product({categoryList}:CategoryProps){

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    
    const [avatarUrl,setAvatarUrl] = useState('')
    const [imageAvatar, setImageAvatar] = useState(null)

    const [categories, setCategories] = useState(categoryList || [])
    const [categorieSelected, setCategorieSelected] = useState(0)
    
    function handleFile(e: ChangeEvent<HTMLInputElement>){
        if(!e.target.files){
            return;
        }

        const image = e.target.files[0]

        if(!image){
            return;
        }

        if(image.type === 'image/jpeg' || image.type === 'image/png'){
            setImageAvatar(image)
            setAvatarUrl(URL.createObjectURL(e.target.files[0]))
        }
    }

    //Quando seleciona a categoria na lista
    function handleChangeCategory(event){
       setCategorieSelected(event.target.value)
    }

    async function handleRegister(event: FormEvent){
        event.preventDefault()

        try{
            const data = new FormData();

            if(name === '' || price === '' || description === '' || imageAvatar == ''  ){
                toast.error("Necessario preencher todos os campos")
                return
            }

            data.append('name', name)
            data.append('price',price)
            data.append('description', description)
            data.append('category_id', categories[categorieSelected].id)
            data.append('banner',imageAvatar)

            const apiClient = setupAPIClient()

            await apiClient.post('/product', data)
            
            toast.success("Produto cadastrado com sucesso !")

        }catch(err){
            toast.error("Erro ao cadastrar produto ! ")
            console.log(err)
        }

        setName('')
        setPrice('')
        setDescription('')
        setImageAvatar(null)
        setAvatarUrl('')

    }

    return(
        <>
        <Head>
            <title>Pizza do Mané - Cadastro de Produto</title>
        </Head>
        <div>
           <Header/>
           <div>
            <main className={styles.container}>
                <h1>Novo produto</h1>

                <form className={styles.form} onSubmit={handleRegister}>

                    <label className={styles.labelAvatar}>
                        <span>
                            <FiUpload size={25} color="#ffff"/>
                        </span>
                    <input type="file" accept="image/jpeg, image/png" onChange={handleFile}/>
                    
                    {avatarUrl && (
                        <img
                            className={styles.preview}
                            src={avatarUrl}
                            alt="Foto do produto" 
                            width={250}
                            height={250}
                        />
                    )}
                    
                    </label>

                    <select value={categorieSelected} onChange={handleChangeCategory}>
                       {categories.map((item, index) => {
                            return(
                                <option value={index} key={item.id}>
                                    {item.name}
                                </option>
                            )
                       })}
                        
                    </select>
                    <input  
                    className={styles.input} 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Digite o nome do produto" />

                    <input 
                    className={styles.input} 
                    type="text" 
                    placeholder="Digite o preço do produto"
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} />

                    <textarea 
                    className={styles.input} 
                    placeholder="Descreva o produto"
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} />

                    <button  
                    className={styles.btnAdd} 
                    type='submit'> Cadastrar</button>
                </form>
            </main>
           </div>
        </div>
        </>
    )
}

//So usuario logam
export const getServerSideProps = canSSRAuth(async (ctx) =>{

    //busca array de categorias
    const apiClient = setupAPIClient(ctx)

    const responde = await apiClient.get('/category')
    //console.log(responde.data)

    return{
        props:{
            categoryList: responde.data
        }
    }
} )