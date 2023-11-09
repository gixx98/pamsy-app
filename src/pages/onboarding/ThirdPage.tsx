import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { componentStyle } from '../../assets/style/components';
import { body, header, subheader } from '../../assets/style/typography';
import Button from '../../components/basic/Button';
import SimpleHeader from '../../components/basic/SimpleHeader';
import { neutral, primary } from '../../assets/style/colors';

const ThirdPage = ({ navigation, route }: any) => {
    const [selectedGender, setSelectedGender] = useState('Male');
    const genderOptions = ['Male', 'Female'];


    const { name, species } = route.params;

    const handleNext = () => {
        navigation.navigate("FourthStep", {
            name: name,
            species: species,
            gender: selectedGender
        })
    }

    function handleBackPress() {
        navigation.goBack();
    }

    const handleGenderSelection = (gender: string) => {
        setSelectedGender(gender);
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} >
            <SafeAreaView style={styles.container}>
                <SimpleHeader name='' onButtonPress={handleBackPress} />

                <View style={styles.center}>
                    <Text style={[header.x50, { color: neutral.s800 }]}>What is {name}'s gender?</Text>

                    <View style={styles.gendersContainer}>
                        {genderOptions.map((genders) => (
                            <TouchableOpacity
                                key={genders}
                                style={[
                                    styles.gendersOption,
                                    selectedGender === genders && styles.selectedOption,
                                ]}
                                onPress={() => handleGenderSelection(genders)}
                            >
                                <Text style={[body.x10, styles.gendersText, selectedGender === genders && styles.selectedText]}>{genders}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>


                </View>
                <Button title='Next' onPress={handleNext} />
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default ThirdPage

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        backgroundColor: '#F3F2F7',
        height: '100%',
        marginHorizontal: 16,
        gap: 8
    },
    center: {
        gap: 12
    },

    gendersContainer: {
        flexDirection: 'row',
        marginTop: 8,
        flexWrap: 'wrap',
        gap: 8
    },

    gendersOption: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 99,
        marginVertical: 4,
        alignItems: 'center'
    },
    selectedOption: {
        backgroundColor: primary.s600,
        color: '#fff'
    },
    gendersText: {
        color: neutral.s800,
        fontSize: 14
    },
    selectedText: {
        color: 'white',
        fontSize: 14
    },
})