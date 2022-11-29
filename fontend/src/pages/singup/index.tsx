import {useState, FormEvent, useContext} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../../styles/home.module.scss'
import logoImg from '../../../public/logoo.png'
import {Input} from '../../components/ui/Input'
import {Button} from '../../components/ui/Button'
import {AuthContext} from '../../contexts/AuthContext'
import {toast} from 'react-toastify'

import Link from 'next/link'

export default function SingUp() {
  const {singUp} = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const [loading, setLoadind] = useState(false)

async function handleSingUp(event: FormEvent){
  event.preventDefault();

  if(name === '' || email === '' || password === ''){
    toast.warning("PREENCHA TODOS OS CAMPOS",{
        position: toast.POSITION.TOP_CENTER
    })
    return
  }
  setLoadind(true)

  let data = {
    name,
    email,
    password
  }

  await singUp(data)

  setLoadind(false)

}


  return (
   <>
   <Head>
      <title>Pizza do Mané - Cadastro</title>
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Pizzaria do Mané" />
      <div className={styles.login}>
        <h1>Criando sua conta</h1>
        <form onSubmit={handleSingUp}>
        
        <Input
            placeholder='Digite seu nome'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}

          />

          <Input
            placeholder='Digite seu email'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder='Digite sua senha'
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />

          <Button
            type="submit"
            loading={loading}
          >
            Cadastrar
           </Button> 
        </form>
      
        <Link href="/" legacyBehavior>
          <a className={styles.text}>Ja possui conta? Faça login</a>
        </Link>
        
      </div>
    </div>
    </>
  )
}
