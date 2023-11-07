import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HealthPage from './health/HealthPage';
import DiaryPage from './DiaryPage';
import HomePage from './home/HomePage';
import ProfilePage from './ProfilePage';
import PlusBig from '../../assets/icons/add_big.svg'
import Home from '../../assets/icons/home.svg'
import HomeFilled from '../../assets/icons/home_fill.svg'
import Diary from '../../assets/icons/diary.svg'
import DiaryFilled from '../../assets/icons/diary_fill.svg'
import Heart from '../../assets/icons/heart.svg'
import HeartFilled from '../../assets/icons/heart_fill.svg'
import User from '../../assets/icons/user.svg'
import UserFilled from '../../assets/icons/user_filled.svg'
import { neutral, primary } from '../../assets/style/colors';

const AuthTab = () => {
    const CreateNewPlaceholder = () => <View style={{ flex: 1, backgroundColor: '#FFF' }} />
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator initialRouteName='Home' screenOptions={{
            tabBarStyle: {
                paddingHorizontal: 10,
                borderBlockColor: neutral.s200,
                backgroundColor: '#FFF',
                height: 90,
                justifyContent: 'center'
            },
            tabBarItemStyle: {
                margin: 4
            }
        }}>
            <Tab.Screen name="Home" component={HomePage} options={{
                title: 'Home',
                tabBarActiveTintColor: primary.s600,
                tabBarInactiveTintColor: neutral.s300,
                tabBarIcon: ({ focused }) => (
                    focused ? <HomeFilled color={primary.s600} /> : <Home color={neutral.s300} />
                ),
                headerShown: false
            }} />
            <Tab.Screen name="Health" component={HealthPage}
                options={{
                    tabBarActiveTintColor: primary.s600,
                    tabBarInactiveTintColor: neutral.s300,
                    tabBarIcon: ({ focused }) => (
                        focused ? <HeartFilled color={primary.s600} /> : <Heart color={neutral.s300} />
                    ),
                }} />
            <Tab.Screen name="Plus" component={CreateNewPlaceholder}
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("CreateNew");
                    }
                })}
                options={{
                    tabBarActiveTintColor: primary.s600,
                    tabBarLabel: '',
                    tabBarLabelStyle: {
                        marginBottom: -20
                    },
                    tabBarInactiveTintColor: neutral.s300,
                    tabBarIcon: () => <PlusBig color={primary.s600} height={44} width={44} />
                }} />
            <Tab.Screen name="Diary" component={DiaryPage} options={{
                tabBarActiveTintColor: primary.s600,
                tabBarInactiveTintColor: neutral.s300,
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    focused ? <DiaryFilled color={primary.s600} /> : <Diary color={neutral.s300} />
                ),
            }} />
            <Tab.Screen name="Profile" component={ProfilePage} options={{
                tabBarActiveTintColor: primary.s600,
                tabBarInactiveTintColor: neutral.s300,
                headerShown: false,

                tabBarIcon: ({ focused }) => (
                    focused ? <UserFilled color={primary.s600} /> : <User color={neutral.s300} />
                ),
            }} />
        </Tab.Navigator>
    )
}

export default AuthTab