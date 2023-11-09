import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { neutral } from '../../assets/style/colors';
import { header, body } from '../../assets/style/typography';
import SimpleHeader from '../../components/basic/SimpleHeader';
import Button from '../../components/basic/Button';
import DatePicker from '@react-native-community/datetimepicker';

const FourthPage = ({ navigation, route }: any) => {
    const [date, setDate] = useState(new Date());

    const { name, species, gender } = route.params;

    function handleBackPress() {
        navigation.goBack();
    }

    function handleNext() {
        navigation.navigate("FifthStep", {
            name: name,
            species: species,
            gender: gender,
            birthday: date.toString()
        })
    }

    useEffect(() => {
        console.log(date)
    }, [date])

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} >
            <SafeAreaView style={styles.container}>
                <SimpleHeader name='' onButtonPress={handleBackPress} />

                <View style={styles.center}>
                    <Text style={[header.x50, { color: neutral.s800 }]}>When did {name} was born?</Text>
                    <View style={{ alignItems: 'flex-start' }}>
                        <DatePicker
                            minimumDate={new Date(2000, 0, 1)}
                            maximumDate={new Date()}
                            value={date}
                            mode='date'
                            onChange={(event, selectedDate) => {
                                if (selectedDate) {
                                    setDate(selectedDate); // Update the date state with the selected date
                                }
                            }}
                        />
                    </View>
                </View>
                <Button title='Next' onPress={handleNext} />
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default FourthPage

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
})