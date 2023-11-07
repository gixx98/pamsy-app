import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { usePetContext } from '../../context/PetContext';
import { db } from '../../services/config';
import { doc, onSnapshot } from 'firebase/firestore';
import { neutral, primary } from '../../assets/style/colors';
import { body, header, subheader } from '../../assets/style/typography';

interface IPet {
  name: string,
  gender: string,
  species: string,
  birthDay: Date
}

const ProfilePage = () => {
  const { petId } = usePetContext();
  const [pet, setPet] = useState<IPet>({ name: "", gender: "", species: "", birthDay: new Date() });

  useEffect(() => {
    const subscriber = onSnapshot(doc(db, `pets/${petId}`), (doc: any) => {
      console.log(doc.data())
      setPet({
        name: doc.data().name,
        gender: doc.data().gender,
        species: doc.data().species,
        birthDay: new Date(doc.data().birthday.seconds * 1000 + doc.data().birthday.nanoseconds / 1e6),
      })
    });
    return () => subscriber();

  }, [])


  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.profilePicture} source={require('../../assets/images/profilepics.jpg')} />

      <Text style={[header.x40, { color: neutral.s800 }]}>{pet.name}</Text>
      <View style={styles.detailsContainer}>
        {/* <Text style={[subheader.x30, { color: neutral.s800 }]}>Pet details</Text> */}

        <View style={{}}>
          <Text style={[body.x10, { color: neutral.s400 }]}>Species</Text>
          <Text style={[subheader.x20, { color: neutral.s500 }]}>{pet.species}</Text>
        </View>

        <View style={{}}>
          <Text style={[body.x10, { color: neutral.s400 }]}>Gender</Text>
          <Text style={[subheader.x20, { color: neutral.s500 }]}>{pet.gender}</Text>
        </View>

        <View style={{}}>
          <Text style={[body.x10, { color: neutral.s400 }]}>Birthday</Text>
          <Text style={[subheader.x20, { color: neutral.s500 }]}>{pet.birthDay.toDateString()}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ProfilePage

const styles = StyleSheet.create({
  container: {
    backgroundColor: primary.backgroundColor,
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 16
  },

  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 99
  },

  detailsContainer: {
    backgroundColor: '#FFF',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
    borderRadius: 12
  }
})