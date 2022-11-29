import {useContext} from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import {FiLogOut} from 'react-icons/fi'

import {AuthContext} from '../../contexts/AuthContext'

export function Header(){

  const { user, signOut } = useContext(AuthContext)

    return(
        <header className={styles.headerContainer}>
          <div className={styles.headerContent}>
             <Link href="/dashboard">
                  <img src="/logoo.png" width={160} height={55}/>
             </Link>

            <h1>{user?.name}</h1>
            
            
            <nav className={styles.menuNave}>
              <Link href="/category"  legacyBehavior>
                <a>Category</a>
              </Link>
              <Link href="/product" legacyBehavior>
                <a>Cardapio</a>
              </Link>

              <button onClick={signOut}>
                <FiLogOut color='#ffff' size={24}/>
              </button>
             </nav>
          </div>
        </header>  
      )
  }
