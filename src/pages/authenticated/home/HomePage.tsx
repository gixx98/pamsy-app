import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigation } from '../../../App';
import Header from '../../../components/Header';
import { collection, onSnapshot, where } from 'firebase/firestore';
import { auth, db } from '../../../services/config';
import { getPetId } from '../../../services/pet';
import Event from '../../../components/Event';
import { body, subheader } from '../../../assets/style/typography';
import { neutral } from '../../../assets/style/colors';
import Reminders from '../../../components/Reminders';
import { SafeAreaView } from 'react-native-safe-area-context';

const mockupReminders = [
  {
    id: '1',
    name: 'Vaccination',
    category: 'Medical',
    isChecked: false,
    date: {
      nanoseconds: 0,
      seconds: 1697000000, // Unix timestamp for the date and time
    },
    recurring: {
      frequency: 'weekly',
      days: ['Monday'],
    },
  },
  {
    id: '2',
    name: 'Flea Treatment',
    category: 'Preventative',
    isChecked: true,
    date: {
      nanoseconds: 0,
      seconds: 1697010000, // Unix timestamp for the date and time
    },
    recurring: null, // No recurring data for this reminder
  },
  {
    id: '3',
    name: 'Grooming',
    category: 'Health',
    isChecked: false,
    date: {
      nanoseconds: 0,
      seconds: 1697020000, // Unix timestamp for the date and time
    },
    recurring: {
      frequency: 'daily',
      days: [], // Empty array indicates it occurs every day
    },
  },
  // Add more reminders as needed
];

const HomePage = () => {
  const { navigate } = useNavigation<StackNavigation>();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  // const [petId, setPetId] = useState('');
  let petId: string;
  const today = new Date();
  const options: any = { weekday: 'short', month: 'short', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);

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
            date: new Date(doc.data().createdAt.seconds * 1000 + doc.data().createdAt.nanoseconds / 1e6),
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
    <SafeAreaView style={styles.container}>

      <Header onClick={handleSettings} />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewContainer}>

        <View style={styles.welcomeContainer}>
          <Text style={[subheader.x40, { color: neutral.s800 }]}>Today's reminders</Text>
          <Text style={[body.x30, { color: neutral.s400 }]}>{formattedDate}</Text>
        </View>

        <View style={[styles.reminderContainer]}>
          <Reminders reminders={mockupReminders} />
        </View>

        <View style={styles.summaryContainer}>
          <Text style={[subheader.x40, { color: neutral.s800 }]}>Daily summary</Text>

          <FlatList
            data={events}
            renderItem={({ item }: any) => (
              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <Event name={item.name} category={item.category} notes={item.notes} date={item.date} />
              </View>
            )}
            keyExtractor={(item: any) => item.key}
          />
        </View>


      </ScrollView>
    </SafeAreaView>
  )
}

export default HomePage

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F2F7',
  },

  scrollViewContainer: {
    gap: 16,
    flexDirection: 'column',
    paddingHorizontal: 16,

  },

  welcomeContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'center'
  },

  reminderContainer: {
    width: '100%',
    borderRadius: 12,
    padding: 4,
    backgroundColor: '#FFF',
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: neutral.s100
  },

  summaryContainer: {
    height: '100%',
    gap: 8
  },

  shadowProp: {
    shadowColor: '#21521',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
})