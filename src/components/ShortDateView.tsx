import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { neutral } from '../assets/style/colors';
import { body, subheader } from '../assets/style/typography';

interface ShortDateViewProps {
    date: string
}

const ShortDateView = (props: ShortDateViewProps) => {
    const { date } = props;
    return (
        <View style={styles.container}>
            <View style={styles.monthContainer}>
                <Text style={[ subheader.x10, {color: neutral.s400, textAlign: 'center'}]}>{date.substring(3, 6)}</Text>

            </View>
            <Text style={[subheader.x30, {color: neutral.s600}]}>{date.substring(0, 2)}</Text>

            <Text style={[ body.x10, {color: neutral.s400}]}>{date.substring(7, 10)}</Text>

        </View>
    )
}

export default ShortDateView

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        alignSelf: 'flex-start',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        gap: 4,
        marginBottom: 8,
        padding: 4,
    },

    monthContainer: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: neutral.s100,
        width: '100%',
        alignSelf: 'center'
    },

    monthText: {
        textAlign: 'center'
    },

})