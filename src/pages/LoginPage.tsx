import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator, SafeAreaView, Touchable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { header, subheader, body } from '../assets/style/typography';
import text from "../assets/text.json";
import Button from '../components/basic/Button';
import * as color from '../assets/style/colors';
import * as size from '../assets/style/sizing';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/config';
import { useNavigation } from '@react-navigation/native';
import { neutral, primary } from '../assets/style/colors';
import EmailLoginIcon from '../assets/icons/email_login.svg';
import BackIcon from '../assets/icons/angle-left.svg';
import SimpleHeader from '../components/basic/SimpleHeader';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation: any = useNavigation();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log("Response:" + response);
      setLoading(false);
      navigation.replace("AuthTab");
    } catch (error: any) {
      console.log("Error:" + error);
      alert(error);
      setLoading(false);
      throw error;
    }
  }

  function handleRegisterPage(): void {
    // navigation.navigate("Registration")
    console.log("Forgot password")
  }

  function handleBackPress() {
    navigation.navigate("Onboarding");
  }

  const isButtonDisabled = !email || !password;

  return (
    // <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <SafeAreaView style={styles.container}>
        <SimpleHeader onButtonPress={handleBackPress} />
        <EmailLoginIcon />
        <Text style={[subheader.x40, { color: neutral.s800 }]}>Continue with email</Text>

        <View>
          {/* <Text style={[body.x20]}>{text.authentication.email}</Text> */}
          <TextInput
            value={email}
            autoCapitalize="none"
            placeholder='Enter your email'
            keyboardType="email-address"
            textContentType='oneTimeCode'
            autoCorrect={false}
            style={styles.input}
            onChangeText={(text) => setEmail(text)} />
        </View>
        <View>
          {/* <Text style={[body.x20, { marginTop: 4 }]}>{text.authentication.password}</Text> */}
          <TextInput
            value={password}
            autoCapitalize="none"
            secureTextEntry
            placeholder='Enter your password'
            style={styles.input}
            onChangeText={(text) => setPassword(text)} />
        </View>
        <TouchableOpacity disabled={isButtonDisabled} style={[styles.button, isButtonDisabled && styles.disabledButton]} onPress={handleLogin}>
          {loading ? (
            <ActivityIndicator size={"small"} color={'#FFF'} />
          ) : (
            <Text style={[subheader.x30, { color: '#FFF' }]}>Sign in</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRegisterPage}>
          <Text style={[subheader.x20, { color: '#1D4ED8' }]}>Forgot password?</Text>
        </TouchableOpacity>
      </SafeAreaView>
    // </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F2F7',
    gap: 10,
    marginHorizontal: 16,
    paddingVertical: 8
  },

  header: {
    width: '100%',
    marginBottom: 8
  },

  input: {
    padding: 8,
    width: "100%",
    borderRadius: 8,
    height: 44,
    backgroundColor: color.neutral.white
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 44,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: color.primary.s600,
  },

  disabledButton: {
    opacity: 0.4
  }
})

export default LoginPage