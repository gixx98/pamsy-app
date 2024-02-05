import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { usePetContext } from '../../../context/PetContext';
import { db } from '../../../services/config';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import Section from '../../../components/basic/Section';
import { primary } from '../../../assets/style/colors';
import MedicationEntry from './components/MedicationEntry';

interface Medication {
  id: string,
  name: string;
  type: string;
  dosage: number;
  unitOfMeasure: string;
  startDate: Date;
  endDate?: Date;
  treatment: string,
  frequency: string,
  notes: string;
}

const MedicationPage = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const { petId } = usePetContext();

  useEffect(() => {
    const medicationsRef = collection(db, `pets/${petId}/medications`);

    // Subscribe to the snapshot of the collection
    const unsubscribe = onSnapshot(medicationsRef, (snapshot) => {
      const medicationsData: Medication[] = [];
      snapshot.forEach((doc) => {
        medicationsData.push({
          id: doc.id,
          name: doc.data().name,
          type: doc.data().type,
          treatment: doc.data().treatment,
          dosage: doc.data().dosage,
          unitOfMeasure: doc.data().unitOfMeasure,
          startDate: doc.data().startDate,
          frequency: doc.data().frequency,
          notes: doc.data().notes

        });
      });
      setMedications(medicationsData);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [petId])

  return (
    <View style={styles.container}>

      <Section title='Recurring'>
        {medications.map((item) => (
          <MedicationEntry
            key={item.id}
            name={item.name}
            type={item.type}
            treatment={item.treatment}
            frequency={item.frequency} // Assuming you want to display dosage and unitOfMeasure as frequency
          // onPress={() => handleMedicationEntryPress(item.id)} // Handle navigation or any other action on press
          />
          // Display other properties of the medication as needed
        ))}
      </Section>
    </View>
  )
}

export default MedicationPage

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: primary.backgroundColor
  }
})