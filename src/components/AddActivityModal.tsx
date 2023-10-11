import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
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
import { SafeAreaView } from 'react-native-safe-area-context'
import { body, subheader } from '../assets/style/typography'
import { neutral, primary } from '../assets/style/colors'
import CategorySelector from './CategorySelector'

const AddActivityModal = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={[subheader.x30, { color: neutral.s800 }]}>Health</Text>
        <View style={styles.row}>
          <CategorySelector text='Medication' icon={<Medicine color={primary.s600} width={24} height={24} />} />
          <CategorySelector text='Vaccination' icon={<Vaccination color={primary.s600} width={24} height={24} />} />
        </View>
        <View style={styles.row}>
          <CategorySelector text='Veterinary' icon={<Vet color={primary.s600} width={24} height={24} />} />
          <CategorySelector text='Observation' icon={<Observation color={primary.s600} width={24} height={24} />} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[subheader.x30, { color: neutral.s800 }]}>Excercise</Text>
        <View style={styles.row}>
          <CategorySelector text='Walk' icon={<Walk color={primary.s600} width={24} height={24} />} />
          <CategorySelector text='Training' icon={<Training color={primary.s600} width={24} height={24} />} />
          <CategorySelector text='Playtime' icon={<Game color={primary.s600} width={24} height={24} />} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[subheader.x30, { color: neutral.s800 }]}>Diet</Text>
        <View style={styles.row}>
          <CategorySelector text='Food' icon={<Food color={primary.s600} width={24} height={24} />} />
          <CategorySelector text='Water' icon={<Water color={primary.s600} width={24} height={24} />} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[subheader.x30, { color: neutral.s800 }]}>Grooming</Text>
        <View style={styles.row}>
          <CategorySelector text='Bath' icon={<Water color={primary.s600} width={24} height={24} />} />
          <CategorySelector text='Trimming' icon={<Trimming color={primary.s600} width={24} height={24} />} />
          <CategorySelector text='Dental' icon={<Dental color={primary.s600} width={24} height={24} />} />
        </View>
      </View>
    </SafeAreaView >
  )
}

export default AddActivityModal

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F2F7',
    flex: 1,
    width: '100%',
    gap: 16,
    paddingHorizontal: 16
  },

  section: {
    gap: 4
  },

  row: {
    flexDirection: 'row',
    gap: 8,
    width: '100%'
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