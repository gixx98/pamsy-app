import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EventDetailsHeader from '../../../components/events/EventDetailsHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../../components/basic/Button';
import { body, header, subheader } from '../../../assets/style/typography';
import { neutral, primary } from '../../../assets/style/colors';
import CalendarIcon from '../../../assets/icons/calendar.svg';
import NoteTextIcon from '../../../assets/icons/note-text.svg';

const EventDetailsPage = ({ route, navigation }: any) => {
    const props = route.params;
    const Icon = props.icon;
    

    return (
        <SafeAreaView style={styles.container}>
            <EventDetailsHeader eventId={props.id} eventName={props.name} />

            <View style={[styles.detailsContainer,{ gap: 12, paddingHorizontal: 16, marginBottom: 12 }]}>
                <Text style={[header.x40, { color: neutral.s800 }]}>{props.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Icon width={24} height={24} color={neutral.s500} />
                    <Text style={[body.x20, { color: neutral.s800 }]}>{props.category}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <CalendarIcon color={neutral.s500} />
                    <Text style={[body.x20, { color: neutral.s800 }]}>{props.date}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <NoteTextIcon color={neutral.s500} />
                    <Text style={[body.x20, { color: neutral.s800 }]}>{props.notes ? props.notes : '-'}</Text>
                </View>
            </View>
            
            {/* <View style={styles.buttonContainer}>
                <Button title='Edit' onPress={() => console.log("pressed")} />
            </View> */}
        </SafeAreaView>
    )
}

export default EventDetailsPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F2F7'
    },

    detailsContainer: {
        marginHorizontal: 16,
        gap: 4,
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: neutral.s100
    },

    detailsTextContainer: {
        flexDirection: 'row',
        gap: 8,
        width: '100%',
        justifyContent: 'space-between'
    },

    buttonContainer: {
        marginHorizontal: 16
    }
})