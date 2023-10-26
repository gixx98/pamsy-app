import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { usePetContext } from '../../../context/PetContext';
import { getEventsByCategory } from '../../../services/pet';
import { DocumentData } from 'firebase/firestore';

const WeightPage = () => {
	const { petId } = usePetContext();
  const [query, setQuery] = useState<Promise<DocumentData> |null>();

  useEffect(() => {
    getEventsByCategory(petId, "Weight").then((res) => {
      console.log(res)
    })
  }, [])

  console.log(query);
  return (
    <View style={styles.container}>
      <Text>Current weight:</Text>
      <Text>{petId}</Text>
    </View>
  )
}

export default WeightPage

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F2F7'
  }
})