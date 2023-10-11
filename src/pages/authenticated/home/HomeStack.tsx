import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomePage from './HomePage'
import SettingsPage from './SettingsPage'
import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native'

const HomeStack = ({ navigation, route }: any) => {
    const HomeStack = createNativeStackNavigator();

    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        console.log(routeName);
        if (routeName === "Settings") {
            console.log(navigation)
            navigation.setOptions({ tabBarStyle: { display: 'none' } });
        } else {
            navigation.setOptions({tabBarStyle: {display: 'flex'}});
        }
    }, [navigation, route]);
    return (
        <HomeStack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
            {/* <HomeStack.Screen name='Home' component={HomePage} />
            <HomeStack.Screen name='Settings' component={SettingsPage}  /> */}
        </HomeStack.Navigator>
    )
}

export default HomeStack