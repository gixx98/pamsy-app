import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';

import { NavigationContainer, NavigationProp, useNavigation } from '@react-navigation/native';
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
import EditEventPage from './pages/authenticated/home/EventDetailsPage';
import EventDetailsPage from './pages/authenticated/home/EventDetailsPage';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import Button from './components/basic/Button';
import WeightPage from './pages/authenticated/health/WeightPage';
import { PetProvider } from './context/PetContext';

export type ScreenNames = ["Login", "Registration", "AuthTab", "EditEvent", "Settings", "CreateNew", "AddActivityPage", "Weight"]
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

  //Toast config
  const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'pink' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '400'
        }}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props: any) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 22,
          fontWeight: 800
        }}
        text2Style={{
          fontSize: 16
        }}
      />
    ),
    /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
    tomatoToast: ({ text1, props }: any) => (
      <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    )
  };

  return (
    <NavigationContainer>
      <PetProvider>
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
                  title: 'Add activity'
                }} />
              </Stack.Group>
              <Stack.Screen name='Settings' component={SettingsPage} />
              <Stack.Screen name='EditEvent' component={EventDetailsPage} options={{
                headerShown: false
              }} />
              <Stack.Screen name='AddActivityPage' component={AddActivityPage} options={{
                title: 'Add activity'
              }} />
              <Stack.Screen name='Weight' component={WeightPage} options={{
                title: 'Weight'
              }} />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen name="Login" component={LoginPage} options={{
                title: 'Log in with email'
              }} />
              <Stack.Screen name="Registration" component={RegistrationPage} />
            </Stack.Group>
          )}
        </Stack.Navigator>
        <Toast />
      </PetProvider>
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

