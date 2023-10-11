import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { body } from '../assets/style/typography'
import { neutral, primary } from '../assets/style/colors'

import Heart from '../assets/icons/heart.svg'
import Medicine from '../assets/icons/medicine.svg'
import Vaccination from '../assets/icons/vaccine.svg'
import Observation from '../assets/icons/symptoms.svg'
import Vet from '../assets/icons/vet.svg'
import Walk from '../assets/icons/shoes-running.svg'
import Game from '../assets/icons/puzzle.svg'
import Training from '../assets/icons/target.svg'
import Food from '../assets/icons/bone.svg'
import Water from '../assets/icons/droplet.svg'
import Trimming from '../assets/icons/scissors.svg'
import Dental from '../assets/icons/tooth.svg'

const eventCategory:any = {
    Medication: Medicine,
    Vaccination: Vaccination,
    Veterinary: Vet,
    Observation: Observation,
    Walk: Walk,
    Training: Training, 
    Playtime: Game,
    Food: Food,
    Water: Water,
    Bath: Water,
    Trimming: Trimming,
    Dental: Dental,
};

interface EventProps {
    name: string
    category: string,
    notes: string
}

const Event = ({
    name,
    category,
    notes
}: EventProps) => {

    const SelectedCategory = eventCategory[category];
    return (
        <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <SelectedCategory width={32} height={32} color={primary.s600} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={[body.x10, { color: neutral.s500 }]}>{category}</Text>
                    <Text style={[body.x20, { color: neutral.s800 }]}>{name}</Text>
                </View>
        </View>
    )
}

export default Event

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        width: '100%',
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 12,
        gap: 12,
        alignItems: 'center',
        marginVertical:4,
    },
    iconContainer: {

    },
    textContainer: {
        gap: 2,
        flexDirection: 'column'
    }
})