
import {GetServerSideProps, GetServerSidePropsResult, GetServerSidePropsContext} from 'next'
import {parseCookies} from 'nookies'

//Metodo para visitantes acessar sem estar logados
export function canSSRGuest<P>(fn:GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> =>{
        const cookies = parseCookies(ctx)
        
        //Se acessar com login salvo sera redirecionado dashboard

        if(cookies['@nextauth.token']){
            return{
                redirect:{
                    destination: '/dashboard',
                    permanent:false
                }
            }
        }
        return await fn(ctx)
    }
}

