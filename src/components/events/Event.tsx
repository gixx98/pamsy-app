import { Pressable, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { body } from '../../assets/style/typography'
import { neutral, primary } from '../../assets/style/colors'

import Heart from '../../assets/icons/heart.svg'
import Medicine from '../../assets/icons/medicine.svg'
import Vaccination from '../../assets/icons/vaccine.svg'
import Observation from '../../assets/icons/symptoms.svg'
import Vet from '../../assets/icons/vet.svg'
import Walk from '../../assets/icons/shoes-running.svg'
import Game from '../../assets/icons/puzzle.svg'
import Training from '../../assets/icons/target.svg'
import Food from '../../assets/icons/bone.svg'
import Water from '../../assets/icons/droplet.svg'
import Trimming from '../../assets/icons/scissors.svg'
import Dental from '../../assets/icons/tooth.svg'
import Weight from '../../assets/icons/weight-scale.svg'
import Stethoscope from '../../assets/icons/stethoscope.svg'
import { useNavigation } from '@react-navigation/native'
import { format } from 'date-fns'

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

interface EventProps {
	id: string | null,
	name: string
	category: string,
	notes: string,
	date: Date,
	value?: number,
	unitOfMeasure?: string,
	pet?: string | null,
	type?: string
}

const Event = ({
	id,
	name,
	category,
	notes,
	value,
	unitOfMeasure,
	date,
	type
}: EventProps) => {

	const SelectedCategory = eventCategory[category];

	const navigation: any = useNavigation();
	const formattedEventDate = format(date, 'kk:mm');
	const eventDate = date;
	let options: any = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
	const formattedDate = eventDate.toLocaleDateString('en-US', options);

	const handleEventClick = () => {
		navigation.navigate("EditEvent", {
			id: id,
			name: name,
			category: category,
			notes: notes,
			date: formattedDate,
			icon: SelectedCategory
		})
	}


	const widthRatio = type === 'fromDiary' ? '83%' : '100%';
	const style = type === 'fromDiary' ? styles.diaryStyle : styles.container;
	const iconStyle = type === 'fromDiary' ? styles.diaryIcon : styles.eventIcon;
	const visibleName = category === 'Walk' || category === 'Playtime' || category === 'Training' ? `${value?.toString()} ${unitOfMeasure?.toLowerCase()}` : name

	return (
		<TouchableOpacity onPress={handleEventClick} style={[style, { width: widthRatio }]}>
			<View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
				<View style={iconStyle}>
					<SelectedCategory width={24} height={24} color={primary.s600} />
				</View>
				<View style={styles.textContainer}>
					<Text style={[body.x10, { fontSize: 12, color: neutral.s400, lineHeight: 16 }]}>{category}</Text>
					{type == 'fromWeightPage' ?
						<Text style={[body.x20, { color: neutral.s800, lineHeight: 20 }]}>{name} kg</Text>

						:
						<Text style={[body.x20, { color: neutral.s800, lineHeight: 20 }]}>{visibleName}</Text>

					}
				</View>
			</View>
			<View style={styles.dateContainer}>
				{type == 'fromWeightPage' ?
					<Text style={[body.x10, { color: neutral.s800 }]}>{formattedDate}</Text>
					:
					<Text style={[body.x10, { color: neutral.s800 }]}>{formattedEventDate}</Text>
				}
			</View>
		</TouchableOpacity>
	)
}

export default Event

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFF',
		flexDirection: 'row',
		borderColor: neutral.s100,
		borderWidth: 1,
		borderRadius: 12,
		paddingHorizontal: 16,
		paddingVertical: 12,
		alignItems: 'center',
		marginBottom: 8,
		justifyContent: 'space-between',

	},
	diaryIcon: {
		backgroundColor: '#FAFAFA',
		width: 44,
		height: 44,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
		borderColor: neutral.s100,
		borderWidth: 0.5,
	},

	eventIcon: {
		width: 32,
		height: 32,
		justifyContent: 'center',
		alignItems: 'center',
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
	},

	diaryStyle: {
		backgroundColor: '#FFF',
		flexDirection: 'row',
		paddingVertical: 4,
		alignItems: 'center',
		marginBottom: 8,
		paddingRight: 16,
		justifyContent: 'space-between',
		borderColor: neutral.s100,
		// borderWidth: 1.5,
		borderRadius: 12,
	}

})