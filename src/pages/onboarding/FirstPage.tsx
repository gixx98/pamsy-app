import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { componentStyle } from '../../assets/style/components';
import { body, header, subheader } from '../../assets/style/typography';
import Button from '../../components/basic/Button';
import SimpleHeader from '../../components/basic/SimpleHeader';
import { neutral } from '../../assets/style/colors';

const FirstPage = ({ navigation, route }: any) => {
    const [name, setName] = useState('');

    const handleNext = () => {
        navigation.navigate("SecondStep", {
            name: name
        })
    }

    function handleBackPress() {
        navigation.goBack();
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} >
            <SafeAreaView style={styles.container}>
                <SimpleHeader onButtonPress={handleBackPress} />

                <View style={styles.center}>
                    <Text style={[header.x50, {color:neutral.s800}]}>First, can you tell us your pet's name?</Text>

                    <View style={{ gap: 4 }}>
                        {/* <Text style={[subheader.x10, {color: neutral.s800}]}>Your pet's name</Text> */}
                        <TextInput
                            placeholder='Enter pet name'
                            value={name}
                            autoFocus
                            style={componentStyle.textInput}
                            onChangeText={setName} />
                    </View>


                </View>
                <Button title='Next' disabled={!name} onPress={handleNext} />
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default FirstPage

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        backgroundColor: '#F3F2F7',
        height: '100%',
        marginHorizontal: 16,
        gap: 8
    },
    center: {
        gap: 12
    }
})