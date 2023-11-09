import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import BackIcon from '../../assets/icons/angle-left.svg';
import { neutral, primary } from '../../assets/style/colors';
import { subheader } from '../../assets/style/typography';

interface SimpleHeaderProps {
    onButtonPress: () => void; // Define the prop for the function
    name: string
  }

const SimpleHeader = (props: SimpleHeaderProps) => {
    const { onButtonPress, name } = props;

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onButtonPress} style={styles.buttonContainer}>
                <BackIcon color={primary.s600} width={24} height={24} />
            </TouchableOpacity>
            <Text style={[subheader.x30, {color: neutral.s600}]}>{name}</Text>
            <TouchableOpacity style={styles.buttonContainer}>
            </TouchableOpacity>
        </View>
    )
}

export default SimpleHeader

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    buttonContainer: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'flex-start'
    }
})