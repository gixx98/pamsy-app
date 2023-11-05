import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { auth } from '../../services/config';
import Button from '../../components/basic/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signin } from '../../services/auth';

const VerPage: React.FunctionComponent = ({ navigation, route }: any) => {
    const { email, password } = route.params;

    const user = auth.currentUser;

    if (!user) {
        return null;
    }

    const handleVerification = async () => {
        await user.reload();

        if (user.emailVerified){
            console.log("Verification Page: " + auth.currentUser?.emailVerified)
            signin(email,password)
        }
        else {
            Alert.alert("ASD")
        }
    }

    return (
        <SafeAreaView>
            <Text>VerifcationPage</Text>
            <Button title='Verified my email' onPress={handleVerification} />
        </SafeAreaView>
    )
}

export default VerPage

const styles = StyleSheet.create({})