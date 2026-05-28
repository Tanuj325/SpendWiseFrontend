import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default function Input({
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    placeholderTextColor,
    style,
}) {

    return (

        <TextInput
            style={[styles.input, style]}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
        />

    );
}

const styles = StyleSheet.create({

    input: {
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 1,
        marginVertical: 1,
        color: '#000',
    },

});