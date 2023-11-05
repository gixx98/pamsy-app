import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native'
import React from 'react'
import Button from '../components/basic/Button'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { body, header, subheader } from '../assets/style/typography'
import { neutral, primary } from '../assets/style/colors'

const OnboardingPage = ({ navigation, route }: any) => {
    const handleSignUp = () => {
        navigation.navigate("FirstStep")
    }

    const handleSignIn = () => {
        navigation.navigate("Login")
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <Image source={require('../assets/images/pet_onboarding.png')} style={{ alignSelf: 'center', height: '40%', aspectRatio: 3 / 2 }} />
                <View>
                    <Text style={[header.x50, { color: neutral.s800, textAlign: 'center' }]}>Welcome to Pamsy</Text>
                    <Text style={[body.x30, { color: neutral.s400, textAlign: 'center' }]}>Track your pet's life, health and more!</Text>
                </View>
            </View>
            <View style={{ paddingHorizontal: 16, gap: 4 }}>
                <Button title='Get Started' onPress={handleSignUp} />
                <TouchableOpacity style={styles.secondaryButton} onPress={handleSignIn}>
                    <Text style={[subheader.x30, { color: primary.s600, textAlign: 'center' }]}>Sign in</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default OnboardingPage

const styles = StyleSheet.create({
    container: {
        gap: 4,
        backgroundColor: '#F3F2F7',
        height: '100%',
        justifyContent: 'space-between'
    },

    topContainer: {
        flex: 1,
        width: '100%',
        gap: 16,
        marginTop: 100
    },

    secondaryButton: {
        borderColor: primary.s600,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 44,
        borderRadius: 18
    }
})