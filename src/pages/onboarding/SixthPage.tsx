import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import SimpleHeader from '../../components/basic/SimpleHeader'
import Button from '../../components/basic/Button';
import { componentStyle } from '../../assets/style/components';
import { body, header } from '../../assets/style/typography';
import { neutral } from '../../assets/style/colors';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../services/config';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { signup } from '../../services/auth';

const SixthPage: React.FunctionComponent = ({ navigation, route }: any) => {
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');

    const { name, species, gender, birthday, email } = route.params;
    const [dateOfBirth, setDateOfBirth] = useState(new Date(birthday))


    function handleBackPress() {
        navigation.goBack();
    }

    const handleRegistration = async () => {
        setLoading(true)
        try {
            const user = await signup(email, password);
            const userRef = doc(db, 'users', user.uid);
            const userData = {
                email: email,
            };
            await setDoc(userRef, userData);

            const petRef = collection(db, 'pets');
            const petData = {
                name: name,
                species: species,
                gender: gender,
                birthday: dateOfBirth,
                userId: [user.uid]
            }
            await addDoc(petRef, petData);

            navigation.navigate("VerStep", {
                email: email,
                password: password
            });
            setLoading(false)
        } catch (error: any) {
            alert(error);
            throw error;
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} >
            <SafeAreaView style={styles.container}>
                <SimpleHeader name='' onButtonPress={handleBackPress} />
                <View style={{ gap: 8 }}>
                    <Text style={[body.x30, { color: neutral.s500 }]}>One more step!</Text>
                    <Text style={[header.x40, { color: neutral.s800 }]}>Create a password which will be used to log in to this account!</Text>
                    <TextInput
                        placeholder='Create a password'
                        value={password}
                        autoFocus
                        secureTextEntry
                        style={componentStyle.textInput}
                        onChangeText={setPassword} />
                </View>
                <Button title='Create account' onPress={handleRegistration} />

            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default SixthPage

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        backgroundColor: '#F3F2F7',
        height: '100%',
        marginHorizontal: 16,
        gap: 8
    },
})