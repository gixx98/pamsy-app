import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import LoginPage from './pages/LoginPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegistrationPage from './pages/RegistrationPage';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './services/config';
import AuthTab from './pages/authenticated/AuthTab';
import SettingsPage from './pages/authenticated/home/SettingsPage';
import AddActivityModal from './components/AddActivityModal';
import AddActivityPage from './pages/authenticated/AddActivityPage';

export type ScreenNames = ["Login", "Registration", "AuthTab", "Settings", "CreateNew", "AddActivityPage"]
export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;


export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  let [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold
  });

  const CreateNew = () => <AddActivityModal />

  const Stack = createNativeStackNavigator<RootStackParamList>();

  const onAuthStateChangedHandler = (user: User | null) => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, onAuthStateChangedHandler);

    return unsubscribe;
  }, [])


  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (
          <Stack.Group>
            <Stack.Screen name="AuthTab" component={AuthTab} options={{
              headerShown: false
            }} />
            <Stack.Group screenOptions={{
              presentation: 'modal'
            }}>
              <Stack.Screen name='CreateNew' component={CreateNew} options={{
                title: 'New event'
              }} />
            </Stack.Group>
            <Stack.Screen name='Settings' component={SettingsPage} />
            <Stack.Screen name='AddActivityPage' component={AddActivityPage} options={{
              title: 'New event'
            }} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Registration" component={RegistrationPage} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
function createContext() {
  throw new Error('Function not implemented.');
}

