import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { header, subheader, body } from '../assets/style/typography';
import text from "../assets/text.json";
import Button from '../components/basic/Button';
import * as color from '../assets/style/colors';
import * as size from '../assets/style/sizing';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/config';
import { useNavigation } from '@react-navigation/native';
import { primary } from '../assets/style/colors';

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
    navigation.navigate("Registration")
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <Text style={[body.x20]}>{text.authentication.email}</Text>
      <TextInput
        value={email}
        autoCapitalize="none"
        placeholder='Enter your email'
        style={styles.input}
        onChangeText={(text) => setEmail(text)} />
      <Text style={[body.x20, {marginTop: 4}]}>{text.authentication.password}</Text>
      <TextInput
        value={password}
        autoCapitalize="none"
        secureTextEntry
        placeholder='Enter your password'
        style={styles.input}
        onChangeText={(text) => setPassword(text)} />
      <TouchableOpacity style={[styles.input, {backgroundColor: color.primary.s600, alignItems: 'center', justifyContent: 'center', marginTop: 12}]} onPress={handleLogin}>
        {loading ? (
          <ActivityIndicator size={"small"} color={'#FFF'} />
        ) : (
          <Text style={[subheader.x30, {color: '#FFF'}]}>Sign in</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={handleRegisterPage}>
        <Text>Register</Text>
      </TouchableOpacity>

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F2F7',
    gap: 4,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  input: {
    padding: 8,
    width: "100%",
    borderRadius: 8,
    height: 44,
    backgroundColor: color.neutral.white
  }
})

export default LoginPage