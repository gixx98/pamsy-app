import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { neutral, primary } from '../../../assets/style/colors'
import WeightIcon from '../../../assets/icons/weight-scale.svg'
import RightArrowIcon from '../../../assets/icons/angle-right.svg'
import EyeIcon from '../../../assets/icons/eye.svg'
import StethoscopeIcon from '../../../assets/icons/stethoscope.svg'
import { body, subheader } from '../../../assets/style/typography'
import { usePetContext } from '../../../context/PetContext'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../../services/config'

const HealthPage = ({ navigation, params }: any) => {

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.navigationContainer}>
				{/* Weight manager */}
				<TouchableOpacity onPress={() => navigation.navigate("Weight")}>
					<View style={styles.entryContainer}>
						<View style={styles.entryLeftContainer}>
							<WeightIcon width={24} color={primary.s600} />
							<Text style={[body.x20, { color: neutral.s800 }]}>Weight</Text>
						</View>
						<RightArrowIcon color={primary.s600} />
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => navigation.navigate("Observations")}>
					<View style={[styles.entryContainer, { borderBottomWidth: 1 }]}>
						<View style={styles.entryLeftContainer}>
							<EyeIcon width={24} color={primary.s600} />
							<Text style={[body.x20, { color: neutral.s800 }]}>Observations</Text>
						</View>
						<RightArrowIcon color={primary.s600} />
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => navigation.navigate("VetAppointments")}>
					<View style={[styles.entryContainer, { borderBottomWidth: 0 }]}>
						<View style={styles.entryLeftContainer}>
							<StethoscopeIcon width={24} color={primary.s600} />
							<Text style={[body.x20, { color: neutral.s800 }]}>Vet appointments</Text>
						</View>
						<RightArrowIcon color={primary.s600} />
					</View>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}

export default HealthPage

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#F3F2F7',
		height: '100%'
	},

	navigationContainer: {
		flexDirection: 'column',
		backgroundColor: '#FFF',
		borderRadius: 12,
		borderWidth: 1,
		borderColor: neutral.s100,
		margin: 16,
		gap: 8,
		paddingVertical: 8
	},

	entryContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		alignContent: 'center',
		justifyContent: 'space-between',
		paddingTop: 8,
		paddingBottom: 12,
		paddingHorizontal: 16,
		borderBottomWidth: 1,
		borderColor: neutral.s100
	},

	entryLeftContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6
	}
})