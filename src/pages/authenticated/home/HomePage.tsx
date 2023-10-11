import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigation } from '../../../App';
import Header from '../../../components/Header';
import { collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../../services/config';
import { getPetId } from '../../../services/pet';
import Event from '../../../components/Event';
import { body, subheader } from '../../../assets/style/typography';
import { neutral } from '../../../assets/style/colors';

const HomePage = () => {
  const { navigate } = useNavigation<StackNavigation>();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  // const [petId, setPetId] = useState('');
  let petId: string;
  const user: any = auth.currentUser;

  useEffect(() => {
    getPetId().then((data) => {
      petId = data;
    }).then(() => {

      const subscriber = onSnapshot(collection(db, `users/${user.uid}/pets/${petId}/events`), (doc) => {
        const eventsArray: any = [];
        doc.forEach((doc) => {
          console.log(doc.data())
          console.log(doc.id)
          eventsArray.push({
            key: doc.id,
            name: doc.data().name,
            category: doc.data().category,
            notes: doc.data().notes,
          });
        });
        setEvents(eventsArray);
      })

      return () => subscriber();
    })




  }, [])


  const handleSettings = () => {
    navigate("Settings");
  }

  return (
    <View style={styles.container}>
      <Header onClick={handleSettings} />
      <View style={styles.welcomeContainer}>
        <Text style={[subheader.x50, {color: neutral.s800 }]}>Daily summary</Text>
        <Text style={[body.x30, {color: neutral.s500 }]}>Wed Oct 11</Text>
      </View>
      <FlatList
        data={events}
        renderItem={({ item }: any) => (
          <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Event name={item.name} category={item.category} notes={item.notes}/>
          </View>
        )}
        keyExtractor={(item: any) => item.id}
      />

    </View>
  )
}

export default HomePage

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F2F7',
    height: '100%',
    paddingHorizontal: 16
  },
  welcomeContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    alignItems: 'center'
  }
})