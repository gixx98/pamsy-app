import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { danger, neutral, primary } from '../assets/style/colors';
import { body, subheader } from '../assets/style/typography';

interface ShortDateViewProps {
    date: string
}

const ShortDateView = (props: ShortDateViewProps) => {
    const { date } = props;
    return (
        <View style={styles.container}>
            <View style={styles.monthContainer}>
                <Text style={[ subheader.x10, {color: neutral.white, textAlign: 'center'}]}>{date.substring(3, 6)}</Text>

            </View>
            <Text style={[subheader.x30, {color: neutral.s600}]}>{date.substring(0, 2)}</Text>

            <Text style={[ body.x10, {color: neutral.s400}]}>{date.substring(7, 10)}</Text>

        </View>
    )
}

export default ShortDateView

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F9F9F9',
        alignSelf: 'flex-start',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        width: '15%',
        borderColor: neutral.s100,
        borderWidth: 0.5,
        padding: 4,
        marginVertical: 4
    },

    monthContainer: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: primary.s600,
        width: '100%',
        alignSelf: 'center'
    },

    monthText: {
        textAlign: 'center'
    },

})