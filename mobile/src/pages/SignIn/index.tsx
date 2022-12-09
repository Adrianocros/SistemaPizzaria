import React, {useState, useContext} from 'react'
import {View, Text, StyleSheet,Image,TextInput,TouchableOpacity,ActivityIndicator} from 'react-native'
import {AuthContext} from '../../contexts/AuthContext'

export default function SignIn(){

    const {signIn, loadingAuth} = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')

   async function handleLogin(){
        if(email === '' || password === ''){
           return
        }
        await signIn({email,password})
    }


    return(
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/logoo.png')}
            />

           <View style={styles.inputContainer}>
            <TextInput 
            placeholder='Digite o Email'
            style={styles.input}
            placeholderTextColor="#e9e2da"
            value={email}
            onChangeText={setEmail}
            />
            <TextInput 
            placeholder='Digite a senha'
            style={styles.input}
            placeholderTextColor="#e9e2da"
            secureTextEntry={true}
            value={password}
            onChangeText={setpassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                {loadingAuth? (
                    <ActivityIndicator size={25} color='#ffff'/>
                ):(
                        <Text style={styles.buttonText}>Acessar</Text>
                )}
                
            </TouchableOpacity>
           </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#1d1d2e'
    },
    logo:{
        marginBottom:18
    },
    inputContainer:{
        width:'95%',
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:32,
        paddingHorizontal:12
    },
    input:{
        width:'95%',
        height:40,
        backgroundColor:'#101026',
        marginBottom:12,
        marginHorizontal:8,
        borderRadius:4,
        color:'#ffff',
        paddingLeft:15
    },
    button:{
        width:'95%',
        height:40,
        backgroundColor:'#157a8c',
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonText:{
        fontSize:18,
        fontWeight:'bold',
        color:'#e9e2da'
    }
})