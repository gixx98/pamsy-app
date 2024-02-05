import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import SimpleHeader from '../../components/basic/SimpleHeader';
import { body, header, subheader } from '../../assets/style/typography';
import { neutral } from '../../assets/style/colors';
import Button from '../../components/basic/Button';
import { componentStyle } from '../../assets/style/components';

const FifthPage = ({ navigation, route }: any) => {
    const { name, species, gender, birthday } = route.params;
    const [email, setEmail] = useState('');

    function handleBackPress() {
        navigation.goBack();
    }

    function handleNext() {
        navigation.navigate("SixthStep", {
            name: name,
            species: species,
            gender: gender,
            birthday: birthday,
            email: email
        })
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} >
            <SafeAreaView style={styles.container}>
                <SimpleHeader name='' onButtonPress={handleBackPress} />
                <View style={{gap: 8}}>
                    <Text style={[body.x30, { color: neutral.s500 }]}>Awesome, you are almost there!</Text>
                    <Text style={[header.x40, { color: neutral.s800 }]}>In order to save your account, I'm going to ask for your email, which will be registered.</Text>
                    <TextInput
                        placeholder='Enter your email'
                        value={email}
                        autoFocus
                        keyboardType='email-address'
                        autoCapitalize='none'
                        style={componentStyle.textInput}
                        onChangeText={setEmail} />
                </View>
                <Button title='Next' onPress={handleNext} />

            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default FifthPage

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
    },
})