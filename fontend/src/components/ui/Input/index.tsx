import {InputHTMLAttributes, TextareaHTMLAttributes} from 'react'
import styles from './styles.module.scss'

interface InputPorps extends InputHTMLAttributes<HTMLInputElement>{}
interface TextAreaPorps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}

export function Input({...rest}:InputPorps ){
    return(
       <input className={styles.input} {...rest}/> 
    )
}

export function TextArea({...rest}:TextAreaPorps){
    return(
        <TextArea className={styles.input}{...rest}></TextArea>
    )
}