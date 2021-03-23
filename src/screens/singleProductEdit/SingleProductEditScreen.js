import React, { useEffect, useLayoutEffect, useState } from 'react';
import {View,Button, Image, Text, FlatList,TouchableOpacity, TextInput, ImageBackground,ScrollView, Alert} from 'react-native'
import ImagePickerExample from '../../components/ImagePicker/ImagePicker';


import App from '../../API/firebaseConfig'
import PhotoPickModal from '../../components/PhotoPickModal/PhotoPickModal';
import styles from './styles';
import Dropdown from '../../components/Dropdown/Dropdown';
import { connect } from 'react-redux';
import { convertObToArr, getCategoryName } from '../../data/MockDataAPI';
import SingleIngredientInput from '../../components/EditIngredients/SingleIngredientInput';
import EditIngredients from '../../components/EditIngredients/EditIngredients';
import CustomButton from '../../components/CustomButton/CustomButton';
import { updateData, addProduct } from '../../store/shop/products';
import BackButton from '../../components/BackButton/BackButton';
import HeaderBtnSave from '../../components/HeaderBtnSave/HeaderBtnSave';

const mapStateToProps=(state)=>({
    categories:state.categories
})

const mapDispatchToProps=(dispatch)=>({
    updateData:(data)=>updateData(dispatch, data),
    addProduct:(data)=>addProduct(dispatch,data)
})

const SAVE_BTN_OFF = 0;
const SAVE_BTN_ON = 1;
const SAVE_BTN_LOADING = 2;


async function uploadToFirebase(uri, path){
    // try{    // commented try block, as error is handled outside
        let blob = await (await fetch(uri)).blob()
        let ref = App.storage.ref().child(path)
        await ref.put(blob)
        const downloadUrl = await ref.getDownloadURL()
        return downloadUrl;
    // } catch(e){
    //     console.warn(e)
    //     return false
    // }
}

const SingleProductEditScreen= connect(mapStateToProps, mapDispatchToProps)((props)=>{
    const {navigation}=props;
    let product=props.route.params.product;
    const mode=props.route.params.mode;
    if (mode==='create'){
        product={
            title:'title',
            categoryId:Object.values(props.categories)[0].id,
            photoUrl:'',
            photosArray:[""],
            ingredients:[],
            price:''
        };
    }
    useEffect(()=>{
        navigation.setOptions({
            headerLeft:()=>{
                return (
                    <BackButton
                    onPress={()=>navigation.goBack()}
                />
                )
            },
            title:product.title
        })
    }, []);

    const [photo, setPhoto]=useState(null);
    const [photoModal,  showPhotoModal]=useState({show:false,mode:null});
    const [arrIndex, setArrInd]=useState(null);
    const [selected, setSelected]=useState(null);
    const [productProperties, editProductProperties]=useState({
        title:product.title,
        categoryId:product.categoryId,
        photoUrl:product.photo_url,
        photosArray:product.photosArray,
        ingredients:product.ingredients,
        price:product.price
    })
    const showPhotoHandler=(uri)=>{
        setPhoto(uri);
    }
    const [saveBtnState, setSaveBtnState] = useState(SAVE_BTN_OFF);

    const onSavePress = async() => {
        setSaveBtnState(SAVE_BTN_LOADING);
        async function handlePhotoUpload(photoUrl){
            if(photoUrl?.substr(0, 7) === 'file://') {
                try {
                    
                    let ext = photoUrl.split('.').pop()

                    let fileName = Date.now()
                    let uploadUrl = await uploadToFirebase(photoUrl, /*`products/${product.id}/${fileName}${ext}`*/`${product.id}/`+fileName+'.'+ext)
                    return uploadUrl;
                } catch (e) {
                    console.log(e.message, '\nFailed to upload photo at', photoUrl)
                }
            } else return photoUrl
        }
        let photosArray = [];

        let photo_url =productProperties.photoUrl?await handlePhotoUpload(productProperties.photoUrl):'';
        
            for(let pInd in productProperties.photosArray){
                photosArray.push(await handlePhotoUpload(productProperties.photosArray[pInd]))   
            }
        

        let dataToUpload = {
            ...productProperties,
            photosArray,
            photo_url,
            id:product.id || null
        };
        delete dataToUpload.photoUrl;

        mode==='create'? await props.addProduct(dataToUpload): await props.updateData(dataToUpload);
        setSaveBtnState(SAVE_BTN_OFF);
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                <HeaderBtnSave
                    loading={saveBtnState===SAVE_BTN_LOADING}
                    disabled={saveBtnState!==SAVE_BTN_ON}
                    onPress={() => onSavePress()}
                />
        })
    }, [saveBtnState, productProperties])

    //photo select modal handler
    const photoModalHandler=(mode, index)=>{
        
        switch (mode){
            case 'changePhoto':
                return (
                    <PhotoPickModal 
                    mode={'changePhoto'} 
                    changeUrl={(newUrl)=>{selected && changeStateHandler(selected,newUrl, null, 'changePhoto')}} 
                    unmountModal={()=>showPhotoModal(prevState=>({
                        ...prevState,
                        show:false,
                    }))} 
                    showPhotoHandler={(uri)=>showPhotoHandler(uri)}
                    />
                )
            case 'addPhoto':
                
                return (
                    <PhotoPickModal 
                    mode={'addPhoto'} 
                    addUrl={(newUrl)=>{changeStateHandler('photosArray',newUrl, null, 'addPhoto')}} 
                    unmountModal={()=>showPhotoModal(prevState=>({
                        ...prevState,
                        show:false
                    }))} 
                    showPhotoHandler={(uri)=>showPhotoHandler(uri)}/>
                )
            case 'removePhoto':
                changeStateHandler('photosArray',null,index,'removePhoto')
            default:
                return null
        }
    }
    //category array create function
     const categoryArr=(categories)=>{
         let result=[];
         categories.forEach(element => {
             const elValue=Object.values(element)[0]
             result.push({
                 label:elValue.name,
                 value:elValue.id
             })
         });
        return result
     }
    const changeStateHandler=(field,value,inputIdx, action)=>{
        setSaveBtnState(SAVE_BTN_ON);
        //change Photo
        if (field==='photosArray' && action==='changePhoto'){

            editProductProperties(prevState=>({
                ...prevState,
                photosArray:prevState.photosArray.map((item,index)=>{
                    if (index===arrIndex){
                        setArrInd(null)
                        return value
                    } else return item
                })
            }));
            setSelected(null);
            return
        }
        //add photo
        if (field==='photosArray' && action==='addPhoto'){
            Alert.alert(value)
            editProductProperties(prevState=>({
                ...prevState,
                photosArray:[...prevState.photosArray, value]
            }));
            return
        }
        if (field==='photosArray' && action==='removePhoto'){
            editProductProperties(prevState=>({
                ...prevState,
                photosArray:prevState.photosArray.filter((value,index)=>{
                    return index!==inputIdx && value;
                })
            }));
            return
        }
        if (field==='ingredients'){
            switch (action){
                case 'changeIngredient':
                    editProductProperties(prevState=>({
                        ...prevState,
                        ingredients:prevState.ingredients.map((item,index)=>{
                            if (index===inputIdx){
                                item["name"]=value;
                                return item
                            } else {
                                return item
                            }
                        })
                    }))
                    return
                case 'removeIngredient':
                    editProductProperties(prevState=>({
                        ...prevState,
                        ingredients:prevState.ingredients.filter((item,index)=>{
                            return index!==inputIdx && item
                        })
                    }))
                    return
                case 'addIngredient':
                    editProductProperties(prevState=>({
                        ...prevState,
                        ingredients:[...prevState.ingredients,{name:''}]
                    }))
                    return
                default:
                    return null
            }

        }
        editProductProperties(prevState=>({
            ...prevState,
            [field]:value
        }));
        setSelected(null);
    }

    const renderProductImage=({item, index})=>{
       
        return (
            <TouchableOpacity onPress={(e)=>{setSelected('photosArray'); setArrInd(index);showPhotoModal(prevState=>({
                ...prevState,
                show:true,
                mode:'changePhoto'
            }))}}>
                <ImageBackground style={[styles.photo, {margin:10}]} source={{ uri: item }}>
                    <View style={styles.photoOverlay}>
                        <Text style={{color:'white', borderWidth:2, borderColor:'white', borderRadius:10, padding:10}}>Change</Text>
                    </View>
                    <TouchableOpacity onPress={()=>changeStateHandler('photosArray',null,index,'removePhoto')} style={{position:'absolute', 
                    right:0, 
                    top:0, 
                    zIndex:999, 
                    width:50, 
                    height:50, 
                    justifyContent:'center',
                    alignItems:'center'
                    }}>
                        <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Y</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            {photoModal.show && photoModalHandler(photoModal.mode)}

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <TouchableOpacity onPress={()=>{setSelected('photoUrl'); showPhotoModal(prevState=>({
                    ...prevState,
                    show:true,
                    mode:'changePhoto'
                }))}} style={{justifyContent:'center', alignItems:'center'}}>
                    <ImageBackground style={[styles.photo, {margin:10}]} source={{uri: productProperties.photoUrl}}>
                        <View style={styles.photoOverlay}>
                            {/* <Button title="Pick an image" } /> */}
                            <Text style={styles.changeBtnTxt}>Change</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>

                <TextInput style={styles.productTitle} value={productProperties.title} onChangeText={(text)=>changeStateHandler('title',text)}/>
                <Text>Qiymət (AZN)</Text>
                <TextInput keyboardType={'numeric'} style={{
                    width:60, 
                    textAlign:'center',
                    borderWidth:1,
                    borderColor:'#2cd18a',
                    borderRadius:5,
                    marginTop:5
                    }} value={productProperties.price} onChangeText={(text)=>changeStateHandler('price',text)}/>

                <Dropdown
                    items={categoryArr(convertObToArr(props.categories))}
                    onValueChange={(value)=>changeStateHandler('categoryId',value)}
                    value={productProperties.categoryId}
                    placeholder={"TEST"}
                    style={{marginBottom:10}}
                />

                {
                    product.photosArray.length>0? (
                        <FlatList
                        style={{marginBottom:5}}
                        vertical
                        showsVerticalScrollIndicator={true}
                        numColumns={2}
                        data={productProperties.photosArray}
                        renderItem={renderProductImage}
                        keyExtractor={item => `${item.recipeId}`}
                />
                    ):null
                }
                <CustomButton 
                backgroundColor={'#2cd18a'} 
                onPress={()=>
                    showPhotoModal(prevState=>({
                        ...prevState,
                        show:true,
                        mode:'addPhoto'
                    }))} 
                title={'Foto əlavə et'}/>

                <View style={styles.ingredientsEdit}>
                    <Text style={{fontWeight:'bold', fontSize:16}}>Tərkibi</Text>
                    <EditIngredients 
                        ingredients={productProperties.ingredients} 
                        onChangeText={(text,index)=>{changeStateHandler('ingredients',text,index, 'changeIngredient')}}
                        onClose={(index)=>changeStateHandler('ingredients',null,index,'removeIngredient')}
                    />
                    <CustomButton onPress={()=>changeStateHandler('ingredients',null,null,'addIngredient')} backgroundColor={'#2cd18a'} title={'Tərkib əlavə et'}/>

                </View>
            
            </ScrollView>
            
        </View>
    )
})


export default SingleProductEditScreen