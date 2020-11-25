import React, { useState } from 'react';
import {Alert, TextInput, View} from 'react-native'


const PRIMARY_COLOR='#2cd18a'

const CustomeTextInput =(props)=>{
    const [focused, setFocused]=useState(false);
    return (
        <TextInput
        {...props}
        enablesReturnKeyAutomatically
        selectionColor='#2cd18a'
        onFocus={()=>{setFocused(true)}}
        onBlur={()=>setFocused(false)}
        style={[{...props.style},{color:focused?PRIMARY_COLOR:'black', borderBottomWidth:2, fontSize:16}]}
        >
        </TextInput>
    )
}

export default CustomeTextInput