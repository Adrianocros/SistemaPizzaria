import { type } from 'os';
import {createContext, ReactNode, useState, useEffect} from 'react'
import {api} from '../services/apiClient'

import {destroyCookie, setCookie,parseCookies} from 'nookies'
import Router from 'next/router'

import {toast} from 'react-toastify'

type AuthContextData ={
    user: UserProps;
    isAuthenticated:boolean;
    signIn:(credentials: SignInProps) => Promise<void>;
    signOut:() => void;
    singUp:(credentials: SingUpProps) => Promise<void>
}

type UserProps = {
    id:string;
    name:string;
    email:string
}

type SignInProps ={
   email:string;
   password:string;
}

type AuthProviderProps ={
    children:ReactNode
}

type SingUpProps ={
    name:string,
    email:string,
    password:string
}


export const AuthContext = createContext({} as AuthContextData)


//função para deslogar usuario
export function signOut(){
    try{
        destroyCookie(undefined,'@nextauth.token')
        Router.push('/')
    }catch{
        console.log('Erro ao deslogar')
    }
}
    

export function AuthProvider({children}:AuthProviderProps){
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;

    useEffect(() =>{
        //Pegar algo no cooke (Token)
        const{'@nextauth.token':token} = parseCookies()
        if(token){
            api.get('/userInfo').then(response =>{
                const {id,name, email} = response.data;  
                
                setUser({
                    id,
                    name,
                    email
                })
            })
            .catch(()=>{
                //Erro desloga user
                signOut();
            })
        }

    },[])

    //Logo usuario
    async function signIn({email, password}:SignInProps){
     try{
        const responde = await api.post('/session',{
            email,
            password
        })

        //console.log(responde.data)
        const {id, name,token} = responde.data

        setCookie(undefined,'@nextauth.token', token, {
            maxAge:60 * 60 * 24 * 30, //Expira em 30 dias
            path:"/" //Caminho que terao acesso ao cookies
        })

        setUser({
            id,
            name,
            email
        })

  
        //Passa para proxima requisição o token
        api.defaults.headers['Authorization'] = `Bearer ${token}`

        toast.success("Locago com sucesso")

        //Redirecionar o user para pedidos
        Router.push('/dashboard')

     }catch(err){
        toast.error("Erro ao acessar")
        console.log("ERRO AO ACESSAR", err)
      
     }
    }

    //Cria usuario
    async function singUp({name, email, password}: SingUpProps){
        try{
          const response = await api.post('/users',{
            name,
            email,
            password
          })

          toast.success("Conta criada")
          
          Router.push("/")
        }catch(err){
            toast.error("Erro ao cadastrar o usuario")
            console.log("Erro no cadastro:",err)
        }
    }

    return(
        <AuthContext.Provider value={{user,isAuthenticated,signIn,signOut, singUp}}>
            {children}
        </AuthContext.Provider>
    )
}