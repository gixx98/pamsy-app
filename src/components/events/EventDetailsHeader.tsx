import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import BackIcon from '../../assets/icons/angle-left.svg'
import TrashIcon from '../../assets/icons/trash.svg'
import { subheader } from '../../assets/style/typography'
import { useNavigation } from '@react-navigation/native'
import { danger, neutral, primary } from '../../assets/style/colors'
import { deleteEventByEventId } from '../../services/pet'
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { usePetContext } from '../../context/PetContext'
import LoadingModal from '../LoadingModal'

interface EventDetailsHeaderProps {
    eventId: string,
    eventName: string,
}

const EventDetailsHeader = ({ eventId, eventName }: EventDetailsHeaderProps) => {
    const [loading, setLoading] = useState(false)
    const navigation: any = useNavigation();
    const { petId } = usePetContext();

    const handleBackPress = () => {
        navigation.goBack();
    }

    const createTwoButtonAlert = () =>
        Alert.alert('Deleting event', `Are you sure you want to delete this event?`, [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Delete',
                onPress: () => handleDeletePress(),
                style: 'destructive'
            },
        ]);



    const handleDeletePress = async () => {
        setLoading(true);
        await deleteEventByEventId(petId, eventId)
            .then(() => {
                setLoading(false);
                Toast.show({
                    type: 'success',
                    text1: 'Event was deleted successfully! ✅',
                    position: 'top',
                    topOffset: 60
                  });
                console.log("Deleted successfully")
                navigation.goBack();
            })
    }

    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={() => handleBackPress()}>
                <BackIcon color={primary.s600} width={24} height={24} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => createTwoButtonAlert()}>
                <TrashIcon color={danger.s400} width={24} height={24} />
            </TouchableOpacity>
            <LoadingModal modalVisible={loading} task='Deleting event... ❌' />

        </View>
    )
}

export default EventDetailsHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12
    },
    loading: {
        backgroundColor: '#F5FCFF88',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})