import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler';
import { neutral } from '../../assets/style/colors';
import { body, subheader } from '../../assets/style/typography';

interface CustomTextInputProps {
    placeholder: string;
    label: string;
    onChangeText: (text: string) => void;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({ placeholder, onChangeText, label }) => {

    const [text, setText] = useState<string>('');

    const handleTextChange = (newText: string) => {
        setText(newText);
        onChangeText(newText);
    };
    return (
        <View style={styles.container}>
            <Text style={[styles.label, subheader.x10]}>{label}</Text>
            <View style={styles.input}>
                <TextInput
                    placeholder={placeholder}
                    value={text}
                    onChangeText={handleTextChange}
                    placeholderTextColor={neutral.s300}
                />
            </View>
        </View>
    )
}

export default CustomTextInput

const styles = StyleSheet.create({
    container: {
        marginTop: 12,
        gap: 4
    },

    label: {
        marginHorizontal: 16,
        color: neutral.s500,
        letterSpacing: -0.2
    },

    input: {
        marginHorizontal: 16,
        backgroundColor: "#FFF",
        height: 48,
        borderColor: neutral.s100,
        borderWidth: 1,
        borderRadius: 18,
        justifyContent: 'center',
        paddingLeft: 16,
    },
})