import { ActivityIndicator, GestureResponderEvent, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { signup } from '../services/auth';
import * as color from '../assets/style/colors';
import text from "../assets/text.json";
import { header, subheader, body } from '../assets/style/typography';

const RegistrationPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false);
  const navigation: any = useNavigation();

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const user = await signup(email, password);
      if (user) {

      }
    } catch (error:any) {
      alert(error.message)
      setLoading(false)
      throw error;
    }
  }

  function handleLogin(): void {
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <Text>RegistrationPage</Text>
      <Text style={[body.x20, { marginBottom: 4 }]}>{text.authentication.email}</Text>
      <TextInput style={styles.input} autoCapitalize='none' placeholder='Enter your email' value={email} onChangeText={setEmail} />
      <Text style={[body.x20, { marginBottom: 4 }]}>{text.authentication.password}</Text>
      <TextInput style={styles.input} placeholder='Enter your password' value={password} onChangeText={setPassword} secureTextEntry />
      <Text style={[body.x20, { marginBottom: 4 }]}>{text.authentication.name}</Text>
      <TextInput style={styles.input} placeholder='Enter your full name' value={name} onChangeText={setName} />

      {loading ?
        (<ActivityIndicator />) :
        (<TouchableOpacity style={styles.buttonContainer} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        )}
      <TouchableOpacity onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>

    </View>
  )
}

export default RegistrationPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.transparent.clear,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 16
  },

  input: {
    padding: 8,
    width: "100%",
    borderRadius: 8,
    height: 44,
    backgroundColor: color.neutral.white
  },

  buttonContainer: {

  },
  buttonText: {

  }
})