import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EventDetailsHeader from '../../../components/events/EventDetailsHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../../components/basic/Button';
import { body, header, subheader } from '../../../assets/style/typography';
import { neutral, primary } from '../../../assets/style/colors';
import CalendarIcon from '../../../assets/icons/calendar.svg';
import NoteTextIcon from '../../../assets/icons/note-text.svg';

import Medicine from '../../../assets/icons/medicine.svg'
import Vaccination from '../../../assets/icons/vaccine.svg'
import Observation from '../../../assets/icons/symptoms.svg'
import Vet from '../../../assets/icons/vet.svg'
import Walk from '../../../assets/icons/shoes-running.svg'
import Game from '../../../assets/icons/puzzle.svg'
import Training from '../../../assets/icons/target.svg'
import Food from '../../../assets/icons/bone.svg'
import Water from '../../../assets/icons/droplet.svg'
import Trimming from '../../../assets/icons/scissors.svg'
import Dental from '../../../assets/icons/tooth.svg'
import Weight from '../../../assets/icons/weight-scale.svg'
import Stethoscope from '../../../assets/icons/stethoscope.svg'
import Stopwatch from '../../../assets/icons/stopwatch.svg'
import Scale from '../../../assets/icons/weight-scale.svg'

const eventCategory: any = {
    'Medication': Medicine,
    'Vaccination': Vaccination,
    'Veterinary': Vet,
    'Observation': Observation,
    'Walk': Walk,
    'Training': Training,
    'Playtime': Game,
    'Food': Food,
    'Water': Water,
    'Bath': Water,
    'Trimming': Trimming,
    'Vet appointment': Stethoscope,
    'Dental': Dental,
    'Weight': Weight
};


const EventDetailsPage = ({ route, navigation }: any) => {
    const props = route.params;
    const category = props.category;

    const SelectedCategory = eventCategory[category];

    return (
        <SafeAreaView style={styles.container}>
            <EventDetailsHeader eventId={props.id} eventName={props.name} />
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', marginHorizontal: 16 }}>
                <View style={{ alignItems: 'center', width: 52, height: 52, justifyContent: 'center', borderRadius: 12, backgroundColor: primary.s600 }}>
                    <SelectedCategory color={neutral.s100} width={32} height={32} />
                </View>
                <View>
                    <Text style={[body.x10, { color: neutral.s400 }]}>{category}</Text>
                    <Text style={[subheader.x40, { color: neutral.s600 }]}>{props.name}</Text>


                </View>
            </View>

            <View style={[styles.detailsContainer, { paddingHorizontal: 16, marginBottom: 6 }]}>
                {category === 'Walk' || category === 'Training' || category === 'Playtime' ?
                    <>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomColor: neutral.s100, borderBottomWidth: 1 }}>
                            <View style={styles.rowContainer}>
                                <Text style={[body.x10, { color: neutral.s300 }]}>Duration</Text>
                                <Text style={[body.x20, { color: neutral.s600 }]}>{props.value} {props.unitOfMeasure}</Text>
                            </View>
                            <View style={{ width: 44, height: 44, borderRadius: 99, alignItems: 'center', justifyContent: 'center' }}>
                                <Stopwatch width={24} height={24} color={neutral.s400} />

                            </View>
                        </View>
                    </> :
                    <>
                    </>
                }

                {category === 'Weight' ?
                    <>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomColor: neutral.s100, borderBottomWidth: 1 }}>
                            <View style={styles.rowContainer}>
                                <Text style={[body.x10, { color: neutral.s300 }]}>Weight</Text>
                                <Text style={[body.x20, { color: neutral.s600 }]}>{props.value} {props.unitOfMeasure}</Text>
                            </View>
                            <View style={{ width: 44, height: 44, borderRadius: 99, alignItems: 'center', justifyContent: 'center' }}>
                                <Scale color={neutral.s400} />

                            </View>
                        </View>
                    </> :
                    <>
                    </>
                }

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={styles.rowContainer}>
                        <Text style={[body.x10, { color: neutral.s300 }]}>Created on</Text>
                        <Text style={[body.x20, { color: neutral.s600 }]}>{props.date}</Text>
                    </View>
                    <View style={{ width: 44, height: 44, borderRadius: 99, alignItems: 'center', justifyContent: 'center' }}>
                        <CalendarIcon color={neutral.s400} />

                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopColor: neutral.s100, borderTopWidth: 1 }}>
                    <View style={styles.rowContainer}>
                        <Text style={[body.x10, { color: neutral.s300 }]}>Notes</Text>
                        <Text style={[body.x20, { color: neutral.s600 }]}>{props.notes ? props.notes : '-'}</Text>
                    </View>
                    <View style={{ width: 44, height: 44, borderRadius: 99, alignItems: 'center', justifyContent: 'center' }}>
                        <NoteTextIcon color={neutral.s400} />

                    </View>
                </View>
            </View>

            {/* <View style={styles.buttonContainer}>
                <Button title='Edit' onPress={() => console.log("pressed")} />
            </View> */}
        </SafeAreaView>
    )
}

export default EventDetailsPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primary.backgroundColor,
        gap: 12
    },

    detailsContainer: {
        gap: 4,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: neutral.s100
    },

    detailsTextContainer: {
        flexDirection: 'row',
        gap: 8,
        width: '100%',
        justifyContent: 'space-between'
    },

    buttonContainer: {
        marginHorizontal: 16
    },

    rowContainer: {
        paddingVertical: 8,
        verticalAlign: 'middle',
        flexShrink: 1
        // backgroundColor: '#F0F0F0'
    }
})