import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getPetName } from '../services/pet';
import Settings from '../assets/icons/settings.svg';
import { subheader } from '../assets/style/typography';
import { neutral, primary } from '../assets/style/colors';

interface HeaderProps {
    // onClick: () => void
}

const Header = ({ navigation, route, type, name }: any) => {
    const [petName, setPetName] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect((): any => {
        setLoading(true);
        let mounted = true;
        getPetName().then(items => {
            if (mounted) {
                setPetName(items)
            }
        }).then(() => {
            setLoading(false);
        })
        return () => mounted = false;
    }, [])

    const handleSettings = () => {
        navigation.navigate("Settings");
    }

    const style = type != 'fromDiaryPage' ? styles.container : styles.diaryContainer

    return (
        <View style={style}>
            <View style={styles.leftContainer}>
                <Image style={styles.profilePicture} source={require('../assets/images/profilepics.jpg')} />
                {loading ? (
                    <ActivityIndicator size={"small"} color={'#0000ff'} />
                ) : (
                    <Text style={[subheader.x20, styles.text]}>{petName}</Text>
                )}
            </View>
            <View style={styles.rightContainer}>
                {type == 'fromDiaryPage' ? <></> :
                    <TouchableOpacity onPress={handleSettings} style={styles.iconContainer}>
                        <Settings width={24} height={24} color={primary.s600} />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        marginBottom: 8,
        height: 44,
        paddingHorizontal: 16
    },

    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    rightContainer: {

    },

    profilePicture: {
        width: 40,
        height: 40,
        borderRadius: 99
    },
    text: {
        color: neutral.s600
    },
    iconContainer: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 99,
    },
    diaryContainer: {
        height: 44,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        marginBottom: 8,
        paddingHorizontal: 16,
    }
})