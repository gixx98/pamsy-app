import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Medicine from '../assets/icons/medicine.svg'
import Vaccination from '../assets/icons/vaccine.svg'
import Observation from '../assets/icons/symptoms.svg'
import Vet from '../assets/icons/vet.svg'
import Stethoscope from '../assets/icons/stethoscope.svg'
import Walk from '../assets/icons/shoes-running.svg'
import Game from '../assets/icons/puzzle.svg'
import Training from '../assets/icons/target.svg'
import Food from '../assets/icons/bone.svg'
import Water from '../assets/icons/droplet.svg'
import Trimming from '../assets/icons/scissors.svg'
import Dental from '../assets/icons/tooth.svg'
import WeightIcon from '../assets/icons/weight-scale.svg'
import { SafeAreaView } from 'react-native-safe-area-context'
import { body, subheader } from '../assets/style/typography'
import { neutral, primary } from '../assets/style/colors'
import CategorySelector from './CategorySelector'

const AddActivityModal = () => {
  const iconSize = 24;
  const iconColor = primary.s600;

  return (
    <ScrollView style={styles.container}>

      <View style={styles.section}>
        <Text style={[subheader.x20, { color: neutral.s800 }]}>Health</Text>
        <CategorySelector text='Medication' icon={<Medicine color={iconColor} width={iconSize} height={iconSize} />} />
        <CategorySelector text='Vaccination' icon={<Vaccination color={iconColor} width={iconSize} height={iconSize} />} />
        <CategorySelector text='Vet appointment' icon={<Stethoscope color={iconColor} width={iconSize} height={iconSize} />} />
        <CategorySelector text='Observation' icon={<Observation color={iconColor} width={iconSize} height={iconSize} />} />
        <CategorySelector text='Weight' icon={<WeightIcon color={iconColor} width={iconSize} height={iconSize} />} />
      </View>

      <View style={styles.section}>
        <Text style={[subheader.x20, { color: neutral.s800 }]}>Exercise</Text>
        <CategorySelector text='Walk' icon={<Walk color={iconColor} width={iconSize} height={iconSize} />} />
        <CategorySelector text='Training' icon={<Training color={iconColor} width={iconSize} height={iconSize} />} />
        <CategorySelector text='Playtime' icon={<Game color={iconColor} width={iconSize} height={iconSize} />} />
      </View>

      <View style={styles.section}>
        <Text style={[subheader.x20, { color: neutral.s800 }]}>Diet</Text>
        <CategorySelector text='Food' icon={<Food color={iconColor} width={iconSize} height={iconSize} />} />
        <CategorySelector text='Water' icon={<Water color={iconColor} width={iconSize} height={iconSize} />} />
      </View>

      <View style={styles.section}>
        <Text style={[subheader.x20, { color: neutral.s800 }]}>Grooming</Text>
        <CategorySelector text='Bath' icon={<Water color={iconColor} width={iconSize} height={iconSize} />} />
        <CategorySelector text='Trimming' icon={<Trimming color={iconColor} width={iconSize} height={iconSize} />} />
        <CategorySelector text='Dental' icon={<Dental color={iconColor} width={iconSize} height={iconSize} />} />
      </View>
    </ScrollView >
  )
}

export default AddActivityModal

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F2F7',
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 16
  },

  section: {
    gap: 4,
    marginBottom: 12
  },

  pill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderColor: neutral.s100,
    borderWidth: 1
  }
})