import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import BackIcon from '../../assets/icons/angle-left.svg';
import { primary } from '../../assets/style/colors';

interface SimpleHeaderProps {
    onButtonPress: () => void; // Define the prop for the function
  }

const SimpleHeader = (props: SimpleHeaderProps) => {
    const { onButtonPress } = props;

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onButtonPress}>
                <BackIcon color={primary.s600} width={24} height={24} />
            </TouchableOpacity>
        </View>
    )
}

export default SimpleHeader

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 8
    }
})