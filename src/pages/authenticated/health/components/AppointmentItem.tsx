import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { format, isValid, parseISO } from 'date-fns'
import { Timestamp } from 'firebase/firestore';
import { neutral } from '../../../../assets/style/colors';
import { body, subheader } from '../../../../assets/style/typography';


interface AppointmentInterface {
    date: Timestamp,
    reason: string
}

const AppointmentItem = ({ date, reason }: AppointmentInterface) => {

    const seconds = date.seconds;
    const dateObject = new Date(seconds * 1000);
    const formattedDate = format(dateObject, 'MMM dd')

    return (
        <View style={styles.appointmentItemContainer}>
            <View style={styles.iconAndNameContainer}>
                <View style={styles.iconContainer}>
                    <Text>🩺</Text>
                </View>
                <Text style={[body.x20,styles.reasonStyle]}>{reason}</Text>
            </View>
            <Text style={[body.x20,styles.dateStyle]}>{formattedDate}</Text>
        </View>
    );
};

export default AppointmentItem

const styles = StyleSheet.create({
    appointmentItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        alignItems: 'center'
    },

    iconAndNameContainer: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center'
    },

    iconContainer: {
        height: 40,
        width: 40,
        borderRadius: 10,
        backgroundColor: '#F6',
        alignItems: 'center',
        justifyContent: 'center'
    },

    dateStyle: {
        color: neutral.s400
    },

    reasonStyle: {

    }
})