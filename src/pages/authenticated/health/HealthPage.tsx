import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { neutral, primary } from '../../../assets/style/colors'
import WeightIcon from '../../../assets/icons/weight-scale.svg'
import RightArrowIcon from '../../../assets/icons/angle-right.svg'
import EyeIcon from '../../../assets/icons/eye.svg'
import StethoscopeIcon from '../../../assets/icons/stethoscope.svg'
import { body, subheader } from '../../../assets/style/typography'
import { usePetContext } from '../../../context/PetContext'
import { Timestamp, collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../../services/config'
import Animated, { withSpring } from 'react-native-reanimated'
import { useSharedValue } from 'react-native-reanimated';
import Button from '../../../components/basic/Button'
import Section from '../../../components/basic/Section'
import AppointmentItem from './components/AppointmentItem'

export interface Event {
	id?: string,
	category: string;
	name: string;
	createdAt: Timestamp;
	notes: string;
	value?: number;
	unitOfMeasure?: string;
	dosage?: number;
	dateOfEvent?: Date;
}

const HealthPage = ({ navigation, params }: any) => {
	const [vetAppointments, setVetAppointments] = useState<Event[]>([]); // Assuming 'Event' interface is defined elsewhere
	const [loading, setLoading] = useState(true);

	const { petId } = usePetContext();

	useEffect(() => {
		fetchVetAppointments();
	}, []); // Empty dependency array to run only once on component mount

	const width = useSharedValue(100);
	const handlePress = () => {
		width.value = withSpring(width.value + 50);
	};

	const fetchVetAppointments = async () => {
		try {
			const appointmentsRef = collection(db, `pets/${petId}/events`);
			const q = query(appointmentsRef, where('category', '==', 'Vet appointment'), orderBy('createdAt', 'asc'));

			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const appointmentsArray = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					name: doc.data().name,
					category: doc.data().category,
					notes: doc.data().notes,
					createdAt: doc.data().createdAt,
					...doc.data(),
				}));
				console.log(appointmentsArray);
				setVetAppointments(appointmentsArray);
				setLoading(false);
			})

			return () => unsubscribe();
		} catch (error) {
			console.error("Error fetching vet appointments:", error);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.navigationContainer}>
				{/* Weight manager */}
				<TouchableOpacity onPress={() => navigation.navigate("Weight")}>
					<View style={styles.entryContainer}>
						<View style={styles.entryLeftContainer}>
							<WeightIcon width={24} height={24} color={primary.s600} />
							<Text style={[body.x20, { color: neutral.s800 }]}>Weight</Text>
						</View>
						<RightArrowIcon color={primary.s600} />
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => navigation.navigate("Observations")}>
					<View style={[styles.entryContainer]}>
						<View style={styles.entryLeftContainer}>
							<EyeIcon width={24} height={24} color={primary.s600} />
							<Text style={[body.x20, { color: neutral.s800 }]}>Observations</Text>
						</View>
						<RightArrowIcon color={primary.s600} />
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => navigation.navigate("MedicationPage")}>
					<View style={[styles.entryContainer]}>
						<View style={styles.entryLeftContainer}>
							<Text>💊</Text>
							<Text style={[body.x20, { color: neutral.s800 }]}>Medication</Text>
						</View>
						<RightArrowIcon color={primary.s600} />
					</View>
				</TouchableOpacity>
			</View>

			<Section title='Current nutrition' children={
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
						<Image source={require('../../../assets/images/JK9-LOGO.jpg')} style={{ width: 40, height: 40, borderRadius: 10 }} />
						<View>
							<Text style={[body.x10, { color: neutral.s400 }]}>Julius K9</Text>
							<Text style={[body.x20, { color: neutral.s800 }]}>Lamb and rice</Text>
						</View>
					</View>
					<Text style={[body.x20, { color: neutral.s400 }]}>150g/day</Text>
				</View>
			} />

			<Section title='Upcoming appointments' children={
				<View style={{gap: 8}}>
					{vetAppointments.length > 0 ? (
						vetAppointments.map((appointment) => (
							<AppointmentItem key={appointment.id} // Use ID for unique keys
								date={appointment.createdAt}
								reason={appointment.name}
							/>
						))
					) : loading ? (
						<Text>Loading...</Text>
					) : (
						<Text>No vet appointments found.</Text>
					)}
				</View>
			} />

			<Section title='Health articles' children={
				<View style={{ gap: 8 }}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
						<View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, width: '100%' }}>
							<Image source={require('../../../assets/images/article_1.png')} style={{ width: 40, height: 40, borderRadius: 10 }} />
							<View style={{ flexShrink: 1 }}>
								<Text style={[body.x10, { color: neutral.s400 }]}>Care • Health</Text>
								<Text numberOfLines={1} style={[body.x20, { color: neutral.s800 }]}>Understanding pet behavior: What is your pet trying to tell you?</Text>
							</View>
						</View>
					</View>

					<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
						<View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, width: '100%' }}>
							<Image source={require('../../../assets/images/article_2.png')} style={{ width: 40, height: 40, borderRadius: 10 }} />
							<View style={{ flexShrink: 1 }}>
								<Text style={[body.x10, { color: neutral.s400 }]}>Behavior • Communication</Text>
								<Text numberOfLines={1} style={[body.x20, { color: neutral.s800 }]}>10 essential tips to keep your pet happy and healthy</Text>
							</View>
						</View>
					</View>
				</View>
			} />

			{/* Animation tried out */}
			{/* <Animated.View
				style={{
					width,
					height: 32,
					backgroundColor: 'violet',
				}}
			/>
			<Button onPress={handlePress} title="Click me" /> */}
		</SafeAreaView>
	)
}

export default HealthPage

const styles = StyleSheet.create({
	container: {
		backgroundColor: primary.backgroundColor,
		height: '100%',
	},

	navigationContainer: {
		flexDirection: 'column',
		borderRadius: 12,
		marginHorizontal: 16,
		gap: 8,
		paddingVertical: 8
	},

	entryContainer: {
		backgroundColor: '#FFF',
		borderRadius: 18,
		borderWidth: 1,
		borderColor: neutral.s100,
		flexDirection: 'row',
		alignItems: 'center',
		alignContent: 'center',
		justifyContent: 'space-between',
		paddingVertical: 16,
		paddingHorizontal: 16,
	},

	entryLeftContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6
	}
})