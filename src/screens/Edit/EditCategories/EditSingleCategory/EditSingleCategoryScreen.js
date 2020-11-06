import React, { useEffect, useState } from 'react';
import {View, Image, Text, StyleSheet, TextInput,ScrollView, Alert, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import App from '../../../../API/firebaseConfig';
import HeaderBtnSave from '../../../../components/HeaderBtnSave/HeaderBtnSave';
import ImageEditOverlay from '../../../../components/ImageEditOverlay/ImageEditOverlay';
import PhotoPickModal from '../../../../components/PhotoPickModal/PhotoPickModal';
import CustomeTextInput from '../../../../components/TextInput/CustomTextInput';
import { categories } from '../../../../data/dataArrays';
import { updateCategory } from '../../../../store/shop/categories';



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

const EditSingleCategoryScreen=connect(null, {updateCategory})((props)=>{
    const category=props.route.params.item;
    const {navigation}=props;
    const [photoModal, showPhotoModal]=useState(false);
    const [saveBtnState, setSaveBtnState] = useState(SAVE_BTN_OFF);
    const [properties,setProperties]=useState({
        photo_url:category.photo_url,
        name:category.name
    });
    
    //on save press
    const onSavePress = async() => {
        setSaveBtnState(SAVE_BTN_LOADING);

        async function handlePhotoUpload(photoUrl){
            if(photoUrl.substr(0, 7) === 'file://') {
                try {
                    
                    let ext = photoUrl.split('.').pop()

                    let fileName = Date.now();
                    let uploadUrl = await uploadToFirebase(photoUrl, /*`products/${product.id}/${fileName}${ext}`*/`categories/${category.id}/`+fileName+'.'+ext)
                    return uploadUrl;
                } catch (e) {
                    console.log(e.message, '\nFailed to upload photo at', photoUrl)
                }
            } else return photoUrl
        }
        let photo_url = await handlePhotoUpload(properties.photo_url);

        let dataToUpload = {
            id:category.id,
            photo_url,
            name:properties.name
        };

        await props.updateCategory(dataToUpload)
        setSaveBtnState(SAVE_BTN_OFF);
    }

    const changeStateHandler=(field,value)=>{
        setSaveBtnState(SAVE_BTN_ON);
        setProperties(prevState=>({
            ...prevState,
            [field]:value
        }));
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                <HeaderBtnSave
                    loading={saveBtnState===SAVE_BTN_LOADING}
                    disabled={saveBtnState!==SAVE_BTN_ON}
                    onPress={() => onSavePress()}
                />,
            title:`${category.name} - Edit`
            
        })
    }, [saveBtnState, properties])


    return (
        <View style={styles.container}>
            {
                photoModal && <PhotoPickModal 
                ratio={[2,1]}
                mode={'changePhoto'} 
                changeUrl={(url)=>changeStateHandler('photo_url',url)} 
                unmountModal={()=>showPhotoModal(false)}
                />
            }
            <ScrollView contentContainerStyle={{alignItems:'center'}}>
                <View style={styles.photoContainer}>
                    <ImageEditOverlay 
                    photosize={{width:Dimensions.get('window').width, height:Dimensions.get('window').width/2}} 
                    closeSign={false} 
                    source={{uri:`${properties.photo_url}`}} 
                    onPress={()=>showPhotoModal(true)} 
                    />
                </View>
                <View >
                    <CustomeTextInput style={styles.categoryTitle} value={properties.name} onChangeText={(text)=>changeStateHandler('name',text)}/>
                </View>
            </ScrollView>

        </View>
    )
})
export default EditSingleCategoryScreen


const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    categoryTitle:{
        fontSize:30,
        fontWeight:'bold',
        marginTop:50,
        padding:10,
        width:300,
        textAlign:'center',
    }
})