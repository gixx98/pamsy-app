import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BackIcon from '../../assets/icons/angle-left.svg'
import TrashIcon from '../../assets/icons/trash.svg'
import { subheader } from '../../assets/style/typography'
import { useNavigation } from '@react-navigation/native'
import { danger, neutral, primary } from '../../assets/style/colors'
import { deleteEventByEventId } from '../../services/pet'
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { usePetContext } from '../../context/PetContext'

interface EventDetailsHeaderProps {
    eventId: string,
    eventName: string,
}

const EventDetailsHeader = ({ eventId, eventName }: EventDetailsHeaderProps) => {

    const navigation: any = useNavigation();
  const { petId } = usePetContext();

    const handleBackPress = () => {
        navigation.goBack();
    }

    const createTwoButtonAlert = () =>
        Alert.alert('Deleting event', `Are you sure you want to delete the event '${eventName}'?`, [
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
        
        await deleteEventByEventId(petId, eventId)
            .then(() => {
                Toast.show({
                    type: 'success',
                    text1: 'Event deleted',
                    text2: `'${ eventName }' deleted successfully`,
                    position: 'bottom',
                    bottomOffset: 100
                });
                
                console.log("Deleted successfully")
                navigation.goBack();
            });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => handleBackPress()}>
                <BackIcon color={primary.s600} width={32} height={32} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => createTwoButtonAlert()}>
                <TrashIcon color={danger.s400} width={32} height={32} />
            </TouchableOpacity>
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
    }
})