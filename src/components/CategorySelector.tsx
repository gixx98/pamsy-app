import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SvgProps } from 'react-native-svg'
import { neutral } from '../assets/style/colors';
import { body } from '../assets/style/typography';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../App';

interface CategorySelectorProps {
    text: string,
    icon?: React.ReactNode;
}

const CategorySelector: React.FC<CategorySelectorProps> = (props) => {
    // const { navigate } = useNavigation<StackNavigation>();
    const navigation: any = useNavigation();

    const handleClick = () => {
        navigation.goBack();
        navigation.navigate("AddActivityPage", {
            category: props.text
        });
    }

    return (
        <TouchableOpacity style={styles.container} onPress={handleClick}>
            <View>{props.icon}</View>
            <Text style={body.x10}>{props.text}</Text>
        </TouchableOpacity>
    )
}

export default CategorySelector

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        borderColor: neutral.s100,
        borderWidth: 1,
        maxHeight: 48
    }
})