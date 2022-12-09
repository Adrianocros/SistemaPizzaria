import React, {useState} from "react"
import {Text, SafeAreaView, TouchableOpacity,TextInput,StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {StackParamsList} from '../../routes/app.routes'

import {api} from '../../services/api'

export default function Dashboard(){
    const navigtion = useNavigation<StackNavigationProp<StackParamsList>>()



    const [number, setNumber] = useState('')
    const [name, setName] = useState('')

    async function openOrder() {
        if(number === '' || name == '' ){
            return
        }

        const response  = await api.post('/order',{
          table:Number(number),
          name
        })

        navigtion.navigate('Order',{number: number, order_id:response.data.id})
        setNumber('')
        setName('')

    }


    return(
       <SafeAreaView style={styles.container}>
            <Text style={styles.titulo}>Novo Pedido</Text>

            <TextInput style={styles.input}
            placeholder="Numero da mesa"
            placeholderTextColor='#f0f0f0'
            keyboardType="numeric"
            value={number}
            onChangeText={setNumber}
            />
            <TextInput style={styles.inputNome}
            placeholder="Nome cliente"
            placeholderTextColor='#f0f0f0'
            value={name}
            onChangeText={setName}
            />
            <TouchableOpacity style={styles.button} onPress={openOrder}>
                <Text style={styles.buttonText} >Abrir Mesa</Text>
            </TouchableOpacity>
       </SafeAreaView> 
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:15,
        backgroundColor:'#1d1d2e'
    },
    titulo:{
        fontSize:30,
        fontWeight:'bold',
        color:'#fff',
        marginBottom:24,
    },
    input:{
        width:'90%',
        height:60,
        backgroundColor:'#101026',
        borderRadius:4,
        paddingHorizontal:8,
        textAlign:'center',
        fontSize:22,
        color:'#fff',
    },
    inputNome:{
        width:'90%',
        height:40,
        backgroundColor:'#101026',
        borderRadius:4,
        paddingHorizontal:8,
        textAlign:'center',
        fontSize:16,
        color:'#fff',
        marginTop:10
    },
    button:{
       width:'90%',
       height:40,
       backgroundColor:'#3fffa3',
       borderRadius:4,
       marginVertical:12,
       justifyContent:'center',
       alignItems:'center',
    },
    buttonText:{
        fontSize:18,
        color:"#101026",
        fontWeight:'bold'
    }

})