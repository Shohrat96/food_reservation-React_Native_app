import React, { useState } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity, Button, Alert, Platform} from 'react-native';
//import DateTimePicker from '@react-native-community/datetimepicker';



import CustomeTextInput from '../TextInput/CustomTextInput';
import styles from './styles'
//import RNDateTimePicker from '@react-native-community/datetimepicker';


const OrderFormModal=(props)=>{
    const today=new Date();
    const [date,setDate]=useState(new Date())
    const [showDatePicker, setShowDatePicker]=useState(false);
    const [currentMood, setCurrentMood]=useState('date');
    const [fields,changeFields]=useState({
        name:'',
        surname:'',
        number:'',
        countFood:'',
        countPerson:'',
        dateOnly:today.toLocaleDateString(),
        timeOnly:`${today.toLocaleTimeString().split(':')[0]}:${today.toLocaleTimeString().split(':')[1]}`
    })

    const onChangeDate=(event, selectedDate)=>{
        const currentDate=selectedDate || date;
        setShowDatePicker(Platform.OS==='ios');
        setDate(currentDate);
        changeFields({
            ...fields,
            dateOnly:currentDate.toLocaleDateString(),
        })
    }
    const onChangeTime=(event, selectedDate)=>{
        const currentDate=selectedDate || date;
        setShowDatePicker(Platform.OS==='ios');
        changeFields({
            ...fields,
            timeOnly:`${currentDate.toLocaleTimeString().split(':')[0]}:${currentDate.toLocaleTimeString().split(':')[1]}`
        })
    }
    const onChangeInputHandler=(fieldName,value)=>{
        changeFields({
            ...fields,
            [fieldName]:value
        })
        
    }
    return (
        <TouchableWithoutFeedback onPress={()=>props.clickToClose()}>
            <View style={styles.container}>
                <TouchableWithoutFeedback>
                <View style={styles.contentWrap}>
                        <View style={styles.inputsContainer}>
                            <View style={styles.nameInput}>
                                <Text>Ad</Text>
                                <CustomeTextInput value={fields.name} textContentType='givenName' onChangeText={(value)=>onChangeInputHandler('name',value)}  />
                            </View>
                            <View style={styles.surnameInput}>
                                <Text>Soyad</Text>
                                <CustomeTextInput value={fields.surname} onChangeText={(value)=>onChangeInputHandler('surname',value)}/>
                            </View>
                            <View style={styles.number}>
                                <Text>Mobil Nömrə</Text>
                                <CustomeTextInput value={fields.number} placeholder='0501234567' keyboardType='numeric' onChangeText={(value)=>onChangeInputHandler('number',value)}/>
                            </View>
                            <View style={styles.amount}>
                                <Text>Neçə Ədəd</Text>
                                <CustomeTextInput value={fields.countFood} keyboardType='numeric' onChangeText={(value)=>onChangeInputHandler('countFood',value)}/>
                            </View>
                            <View style={styles.amount}>
                                <Text>Neçə Nəfər</Text>
                                <CustomeTextInput value={fields.countPerson} keyboardType='numeric' onChangeText={(value)=>onChangeInputHandler('countPerson',value)}/>
                            </View>
                            <View style={styles.dateAndTime}>
                                    <TouchableOpacity style={{alignItems:'center'}} onPress={()=>{setShowDatePicker(true); setCurrentMood('date')}}>
                                        <View style={styles.selectDateBtn}>
                                            <Text>Tarix seçin</Text>
                                        </View>
                                        <Text>{fields.dateOnly}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{alignItems:'center'}} onPress={()=>{setCurrentMood('time');setShowDatePicker(true)}}>
                                        <View style={styles.selectTimeBtn}>
                                            <Text>Zaman seçin</Text>
                                        </View>
                                        <Text>{fields.timeOnly}</Text>
                                    </TouchableOpacity>
                                    {/*
                                        showDatePicker && (
                                            <DateTimePicker
                                            testID="dateTimePicker"
                                            value={date}
                                            mode={currentMood==='date'?'date':'time'}
                                            is24Hour={true}
                                            display="default"
                                            onChange={currentMood==='date'?onChangeDate:onChangeTime}
                                        /> 
                                        )
                                        */}
                            </View>

                        </View>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity onPress={()=>props.clickToClose()} style={[styles.button, styles.buttonCancel]}>
                                <View>
                                    <Text>
                                        Ləğv et
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{

                                props.submitOrderHandler(fields)

                                }} style={[styles.button,styles.buttonConfirm]}>
                                <View>
                                    <Text style={{color:'white'}}>
                                        Təsdiqlə
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                                
            </View>
        </TouchableWithoutFeedback>
    )
}
export default OrderFormModal