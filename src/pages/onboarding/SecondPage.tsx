import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { componentStyle } from '../../assets/style/components';
import { body, header, subheader } from '../../assets/style/typography';
import Button from '../../components/basic/Button';
import SimpleHeader from '../../components/basic/SimpleHeader';
import { neutral, primary } from '../../assets/style/colors';

const SecondPage = ({ navigation, route }: any) => {
    const [selectedSpecies, setSelectedSpecies] = useState('Dog');
    const speciesOptions = ['Dog', 'Cat', 'Rabbit', 'Guinea pig', 'Hamster'];


    const { name } = route.params;

    const handleNext = () => {
        navigation.navigate("ThirdStep", {
            name: name,
            species: selectedSpecies
        })
    }

    function handleBackPress() {
        navigation.goBack();
    }

    const handleSpeciesSelection = (species: string) => {
        setSelectedSpecies(species);
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} >
            <SafeAreaView style={styles.container}>
                <SimpleHeader name='' onButtonPress={handleBackPress} />

                <View style={styles.center}>
                    <Text style={[header.x50, { color: neutral.s800 }]}>What species is {name}?</Text>

                    <View style={styles.speciesContainer}>
                        {speciesOptions.map((species) => (
                            <TouchableOpacity
                                key={species}
                                style={[
                                    styles.speciesOption,
                                    selectedSpecies === species && styles.selectedOption,
                                ]}
                                onPress={() => handleSpeciesSelection(species)}
                            >
                                <Text style={[body.x10, styles.speciesText, selectedSpecies === species && styles.selectedText]}>{species}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>


                </View>
                <Button title='Next' onPress={handleNext} />
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default SecondPage

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

    speciesContainer: {
        flexDirection: 'row',
        marginTop: 8,
        flexWrap: 'wrap',
        gap: 8
    },

    speciesOption: {
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
    speciesText: {
        color: neutral.s800,
        fontSize: 14
    },
    selectedText: {
        color: 'white',
        fontSize: 14
    },
})