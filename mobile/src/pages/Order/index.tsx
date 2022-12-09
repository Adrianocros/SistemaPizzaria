import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity,TextInput, Modal, FlatList} from 'react-native'
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native'
import {Feather} from '@expo/vector-icons'
import {ModalPicker} from '../../components/ModalPicker'
import {ListItem} from '../../components/ListItem'
import { Entypo } from '@expo/vector-icons';
import {api} from '../../services/api'
import {NavigationProp} from '@react-navigation/native'
import {StackParamsList} from '../../routes/app.routes'

type RoutDetailParams = {
    Order:{
        number: string | number;
        order_id: string;
        name:string
    }
}

export type CategoryProps = {
    id: string;
    name:string;
}

type ProductsProps ={
    id:string;
    name:string
}

type ItensProps = {
    id:string,
    product_id:string,
    name:string,
    amount: string | number
}


type OrderRouteProps= RouteProp<RoutDetailParams, 'Order'>;

export default function Order(){
    const route = useRoute<OrderRouteProps>();
    const navigation = useNavigation<NavigationProp<StackParamsList>>() 

    const [category, setCategory] = useState<CategoryProps[] | []>([]);
    const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>()
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false)

    const [products, setProducts] = useState<ProductsProps[] | []>([])
    const [productsSelected, setProductsSelected] = useState<ProductsProps | undefined>()
    const [modalProductVisible, setModalProductVisible] = useState(false)

    const [amount, setAmount] = useState('1')

    const [itens, setItens] = useState<ItensProps[]>([])


    useEffect(()=>{
        async function loadInfo(){
            const response = await api.get('/category')
            setCategory(response.data)
            setCategorySelected(response.data[0])
        }
        loadInfo()
    },[])

    useEffect(()=>{
        async function loadingProducts(){
            const response = await api.get('/category/product',{
                params:{
                    category_id:categorySelected?.id
                }
            })
          setProducts(response.data)
          setProductsSelected(response.data[0])
        }
        loadingProducts()
    }, [categorySelected])

    async function handleCloseOrder() {
        try{
          await api.delete('/order',{
            params:{
                order_id:route.params?.order_id
            }
          })  

          navigation.goBack()
        }catch(err){
            console.log(err)
        }
    }

    function handleChangeCategory(item: CategoryProps){
        setCategorySelected(item)
    }

    function handleChangeProduct(item: ProductsProps){
        setProductsSelected(item)
    }

    //Add produto a mesa
    async function handleAdd(){
        const responde = await api.post('/order/add',{
            order_id:route.params.order_id,
            product_id:productsSelected?.id,
            amount:Number(amount)
        })

        let data ={
            id:responde.data.id,
            product_id:productsSelected?.id as string,
            name:productsSelected?.name as string,
            amount:amount
        }

        setItens(oldArray => [...oldArray, data])
    }

    async function handleDeleteItem(item_id:string){
        await api.delete('/order/remove',{
            params:{
                item_id:item_id
            }
        })
        //Apos remover da API remove da tela
        let removeItem = itens.filter(item => {
            return(item.id !== item_id)
        })
        setItens(removeItem)
    }

    function handleFinishOrder(){
        navigation.navigate("FinishOrder",{
            number:route.params?.number,
            order_id:route.params.order_id
        })
    }

    return(
    <SafeAreaView style={styles.container}>
       
        <View style={styles.header}>
            <Text style={styles.title}>Mesa {route.params.number}</Text>
            {itens.length === 0 && (
                <TouchableOpacity onPress={handleCloseOrder}>
                <Feather name='trash-2' size={28} color="#ff3f4b"/>
            </TouchableOpacity>
            )}
            
        </View>
        {category.length !== 0 && (
            <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}>
            <Text style={styles.textInput}>
                {categorySelected?.name}
            </Text>
        </TouchableOpacity>
        )}
        {products.length !== 0 && (
            <TouchableOpacity style={styles.input} onPress={() => setModalProductVisible(true)}>
                <Text style={styles.textInput}>
                    {productsSelected?.name}
                </Text>
            </TouchableOpacity>
        )}

        <View style={styles.qtdContainer}>
            <Text style={styles.qtdText}>Quantidade</Text>
            <TextInput
            style={[styles.input,{width:'60%', textAlign:'center'}]}
            placeholderTextColor={'#f0f0f0'}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            />
        </View>
        <View style={styles.actions}>
            <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
                <Text style={styles.buttonText}>
                <Entypo name="plus" size={24} color="#ffff" />
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style={[styles.button,{opacity: itens.length === 0 ? 0.3 : 1}]}
            disabled={itens.length === 0}
            onPress={handleFinishOrder}
            >
                <Text style={styles.buttonText}>Avançar</Text>
            </TouchableOpacity>
        </View>


        <FlatList
        showsVerticalScrollIndicator={false}
        style={{flex:1, marginTop: 24}}
        data={itens}
        keyExtractor={(item)=> item.id}
        renderItem={({item})=> <ListItem data={item} deleteItem={handleDeleteItem}/>  }
        />


        <Modal
        transparent={true}
        visible={modalCategoryVisible}
        animationType="fade"
        >
         <ModalPicker
          handleCloseModal={() => setModalCategoryVisible(false)}
          options={category}
          selectedItem={handleChangeCategory}
         />
        </Modal>
        <Modal
            transparent={true}
            visible={modalProductVisible}
            animationType="fade"
        >
        <ModalPicker
          handleCloseModal={() => setModalProductVisible(false)}
          options={products}
          selectedItem={handleChangeProduct}
         />
        </Modal>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#1d1d2e',
        paddingVertical:'5%',
        paddingEnd:'4%',
        paddingStart:'4%'
    },
    titleTela:{
        textAlign:'center',
        color:'#ffff',
        fontSize:28,
        padding:30,
        fontWeight:'bold'
    },
    header:{
        flexDirection:'row',
        marginBottom:12,
        alignItems:'center',
        marginTop:5
    },
    title:{
        fontSize:30,
        fontWeight:'bold',
        color:'#fff',
        marginRight:4
    },
    input:{
        backgroundColor:'#101026',
        borderRadius:4,
        width:'100%',
        height:40,
        marginBottom:15,
        justifyContent:'center',
        paddingHorizontal:6,
        color:'#ffff',
        fontSize:23
    },
    textInput:{
        color:'#ffff',
        fontSize:18
    },
    qtdContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        textAlign:'center'
    },
    qtdText:{
        fontSize:20,
        fontWeight:'bold',
        color:'#fff'
    },
    actions:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between'        
    },
    buttonAdd:{
        width:'20%',
        backgroundColor:'#3fd1ff',
        borderRadius:4,
        height:40,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonText:{
        color:'#101026',
        fontSize:18,
        fontWeight:'bold',
        
    },
    button:{
        backgroundColor:'#3fffa3',
        borderRadius:4,
        height:40,
        width:'75%',
        alignItems:'center',
        justifyContent:'center'
    }
})