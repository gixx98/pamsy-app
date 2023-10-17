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

const eventCategory: any = {
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
	notes: string,
	date: Date
}

const Event = ({
	name,
	category,
	notes,
	date
}: EventProps) => {

	const SelectedCategory = eventCategory[category];
	return (
		<View style={[styles.container]}>
			<View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
				<View style={styles.iconContainer}>
					<SelectedCategory width={32} height={32} color={primary.s600} />
				</View>
				<View style={styles.textContainer}>
					<Text style={[body.x10, { fontSize: 11, color: neutral.s400, lineHeight: 16 }]}>{category}</Text>
					<Text style={[body.x20, { color: neutral.s800, lineHeight: 20 }]}>{name}</Text>
				</View>
			</View>
			<View style={styles.dateContainer}>
				<Text style={[body.x10, { color: neutral.s800 }]}>{date.getHours() + ":" + date.getMinutes()}</Text>
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
		borderColor: neutral.s100,
		borderWidth: 1.5,
		borderRadius: 12,
		padding: 12,
		alignItems: 'center',
		marginVertical: 2,
		justifyContent: 'space-between',

	},
	iconContainer: {

	},
	textContainer: {
		flexDirection: 'column'
	},

	dateContainer: {
		borderColor: neutral.s100,
		flexDirection: 'row',
		borderRadius: 99,
		borderWidth: 1,
		paddingHorizontal: 8,
		paddingVertical: 2
	}

})