import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Dimensions,ScrollView} from 'react-native'
import { CategoryProps} from '../../pages/Order'

interface ModalPikerProps {
    options:CategoryProps[];
    handleCloseModal:() => void;
    selectedItem: (item:CategoryProps) => void
}

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window')

export function ModalPicker({options, handleCloseModal, selectedItem}: ModalPikerProps){
    function onPressItem(item:CategoryProps){
        selectedItem(item);
        handleCloseModal()
    }

    const option = options.map((item, index)=>(
        <TouchableOpacity key={index} style={styles.option} onPress={()=> onPressItem(item) }>
            <Text style={styles.item}>
                {item?.name}
            </Text>
        </TouchableOpacity>
    ))

    return(
       <TouchableOpacity style={styles.container} onPress={handleCloseModal}>
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {option}
                </ScrollView>
            </View>

       </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:99
    },
    content:{
        width:WIDTH - 20,
        height:HEIGHT /2,
        backgroundColor:'#ffff',
        borderWidth:1,
        borderColor:'#8a8a8a',
        borderRadius:4
    },
    option:{
        alignItems:'flex-start',
        borderWidth:0.8,
        borderTopColor:'#8A8A8A'
    },
    item:{
        margin:18,
        fontSize:18,
        fontWeight:'bold',
        color:"#101026",
    }
})