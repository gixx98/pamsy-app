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
import WeightPage from './pages/authenticated/health/WeightPage';
import { PetProvider } from './context/PetContext';
import VetAppointmentPage from './pages/authenticated/health/VetAppointmentPage';
import ObservationPage from './pages/authenticated/health/ObservationPage';
import AddObservationModal from './components/AddObservationModal';
import ObservationDetails from './pages/authenticated/health/ObservationDetails';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import OnboardingPage from './pages/OnboardingPage';
import FirstPage from './pages/onboarding/FirstPage';
import SecondPage from './pages/onboarding/SecondPage';
import ThirdPage from './pages/onboarding/ThirdPage';
import FourthPage from './pages/onboarding/FourthPage';
import FifthPage from './pages/onboarding/FifthPage';
import SixthPage from './pages/onboarding/SixthPage';
import VerPage from './pages/onboarding/VerPage';
import { success } from './assets/style/colors';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import AddMedicationPage from './pages/authenticated/AddMedicationPage';
import MedicationPage from './pages/authenticated/health/MedicationPage';

export type ScreenNames = ["Onboarding", "FirstStep", "SecondStep", "ThirdStep", "FourthStep", "FifthStep", "SixthStep", "VerStep", "Login", "Registration", "AuthTab", "EditEvent", "Settings", "CreateNew", "AddActivityPage", "Weight", "Observations", "VetAppointments", "AddObservation", "ObservationDetails", "AddMedicationPage", "MedicationPage"]
export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});



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
        style={{ borderRadius: 99, borderLeftWidth: 0, height: 60 }}
        contentContainerStyle={{
          backgroundColor: success.s400,
          borderRadius: 99,
          paddingVertical: 12,
          alignItems: 'center',
        }}
        text1Style={{
          fontSize: 14,
          color: '#FFF',
          fontFamily: 'Inter_500Medium',
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <PetProvider>
          <Stack.Navigator initialRouteName='Onboarding'>
            {user ? (
              <Stack.Group>

                <Stack.Screen name="AuthTab" component={AuthTab} options={{
                  headerShown: false
                }} />

                <Stack.Group screenOptions={{
                  presentation: 'modal'
                }}>
                  <Stack.Screen name='CreateNew' component={CreateNew} options={{
                    title: 'Select category'
                  }} />
                  <Stack.Screen name='AddObservation' component={AddObservationModal} options={{
                    title: 'New collection',
                  }} />
                </Stack.Group>
                <Stack.Screen name='Settings' component={SettingsPage} options={{
                  headerShown: false
                }} />
                <Stack.Screen name='EditEvent' component={EventDetailsPage} options={{
                  headerShown: false
                }} />
                <Stack.Screen name='AddActivityPage' component={AddActivityPage} options={{
                  headerShown: false,
                  title: 'Add activity'
                }} />
                <Stack.Screen name='Weight' component={WeightPage} options={{
                  title: 'Weight',
                  headerBackTitleVisible: false
                }} />
                <Stack.Screen name='Observations' component={ObservationPage} options={{
                  title: 'Observations',
                  headerBackTitleVisible: false
                }} />
                <Stack.Screen name='ObservationDetails' component={ObservationDetails} options={{
                  title: 'Observation',
                  headerBackTitleVisible: false
                }} />
                <Stack.Screen name='VetAppointments' component={VetAppointmentPage} options={{
                  title: 'Weight',
                  headerBackTitleVisible: false
                }} />
                <Stack.Screen name='AddMedicationPage' component={AddMedicationPage} options={{
                  title: 'Add medication',
                  headerBackTitleVisible: false
                }} />

                <Stack.Screen name='MedicationPage' component={MedicationPage} options={{
                  title: 'Medication',
                  headerBackTitleVisible: false,
                }} />
              </Stack.Group>
            ) : (
              <Stack.Group>
                <Stack.Screen name="Onboarding" component={OnboardingPage} options={{
                  headerShown: false
                }} />
                <Stack.Screen name="Login" component={LoginPage} options={{
                  headerShown: false,
                  title: 'Sign in with email'
                }} />
                <Stack.Screen name="Registration" component={RegistrationPage} />

                <Stack.Screen name="FirstStep" component={FirstPage} options={{
                  headerShown: false
                }} />
                <Stack.Screen name="SecondStep" component={SecondPage} options={{
                  headerShown: false
                }} />
                <Stack.Screen name="ThirdStep" component={ThirdPage} options={{
                  headerShown: false
                }} />
                <Stack.Screen name="FourthStep" component={FourthPage} options={{
                  headerShown: false
                }} />
                <Stack.Screen name="FifthStep" component={FifthPage} options={{
                  headerShown: false
                }} />
                <Stack.Screen name="SixthStep" component={SixthPage} options={{
                  headerShown: false
                }} />
                <Stack.Screen name="VerStep" component={VerPage} options={{
                  headerShown: false
                }} />


              </Stack.Group>
            )}
          </Stack.Navigator>
          <Toast config={toastConfig} />
        </PetProvider>
      </NavigationContainer>
    </GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
