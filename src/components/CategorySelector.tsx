import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SvgProps } from 'react-native-svg'
import { neutral, primary } from '../assets/style/colors';
import { body } from '../assets/style/typography';
import { useNavigation } from '@react-navigation/native';
import RightArrowIcon from '../assets/icons/angle-right.svg'

interface CategorySelectorProps {
    text: string,
    icon?: React.ReactNode;
}

const CategorySelector: React.FC<CategorySelectorProps> = (props) => {
    // const { navigate } = useNavigation<StackNavigation>();
    const navigation: any = useNavigation();



    const handleClick = () => {
        if (props.text == 'Medication') {
            navigation.goBack();
            navigation.navigate("AddMedicationPage");
        } else {
            navigation.goBack();
            navigation.navigate("AddActivityPage", {
                category: props.text
            });
        }
    }

    return (
        <TouchableOpacity style={styles.container} onPress={handleClick}>
            <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 8 }]}>
                {props.icon}
                <Text style={body.x20}>{props.text}</Text>
            </View>
            <RightArrowIcon width={16} height={16} color={primary.s600} />
        </TouchableOpacity>
    )
}

export default CategorySelector

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        borderColor: neutral.s100,
        borderWidth: 1,
    }
})