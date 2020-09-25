import React, { useState } from 'react';
import {Alert, TextInput, View} from 'react-native'


const PRIMARY_COLOR='#2cd18a'
const ON_FOCUS_COLOR='rgba(0,0,0,0.3)'

const CustomeTextInput =(props)=>{
    const [focused, setFocused]=useState(false);
    return (
        <TextInput
        enablesReturnKeyAutomatically
        selectionColor='#2cd18a'
        onFocus={()=>{setFocused(true)}}
        onBlur={()=>setFocused(false)}
        style={{borderBottomColor:focused?PRIMARY_COLOR:ON_FOCUS_COLOR, borderBottomWidth:2}}
        {...props}>
        </TextInput>
    )
}

export default CustomeTextInput