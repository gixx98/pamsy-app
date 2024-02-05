import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, Image, View, ActivityIndicator } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigation } from '../../../App';
import Header from '../../../components/Header';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { auth, db } from '../../../services/config';
import { getPetId } from '../../../services/pet';
import Event from '../../../components/events/Event';
import { body, header, subheader } from '../../../assets/style/typography';
import { neutral, primary } from '../../../assets/style/colors';
import Reminders from '../../../components/Reminders';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../../components/basic/Button';
import { usePetContext } from '../../../context/PetContext';
import { endOfDay, startOfDay } from 'date-fns';

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

interface PetContextType {
  petIdd: string | null;
}
export const PetContext = createContext<PetContextType | undefined>(undefined);

const HomePage = ({ navigation, route }: any) => {
  const { setPetId } = usePetContext();
  const { navigate } = useNavigation<StackNavigation>();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [petIdd, setPetIdd] = useState('');

  let petId: string;

  //calculating date in the following pattern: 'Tue, Oct 17'
  const today = new Date();
  const options: any = { weekday: 'short', month: 'short', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);

  const user: any = auth.currentUser;

  const todayQuery = new Date();
  const startOfToday = startOfDay(todayQuery);
  const endOfToday = endOfDay(todayQuery);

  useEffect(() => {
    getPetId().then((data) => {
      petId = data;
      setPetIdd(petId)
      setPetId(petId);
    }).then(() => {

      // const subscriber = onSnapshot(collection(db, `users/${user.uid}/pets/${petId}/events`), (doc) => {
      const subscriber = onSnapshot(query(collection(db, `pets/${petId}/events`), where("createdAt", ">=", startOfToday), where("createdAt", "<=", endOfToday), orderBy("createdAt", 'desc')), (doc) => {
        const eventsArray: any = [];
        doc.forEach((doc) => {
          eventsArray.push({
            key: doc.id,
            name: doc.data().name,
            category: doc.data().category,
            value: doc.data().value,
            unitOfMeasure: doc.data().unitOfMeasure,
            date: new Date(doc.data().createdAt.seconds * 1000 + doc.data().createdAt.nanoseconds / 1e6),
            notes: doc.data().notes,
          });
        });
        setEvents(eventsArray);
        setLoading(false);
      })

      return () => subscriber();
    })
  }, [])

  return (
    <PetContext.Provider value={{ petIdd }}>
      <SafeAreaView style={styles.container}>
        <Header navigation={navigation} />

        {/* <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewContainer}> */}

        <View style={styles.welcomeContainer}>
          <Text style={[subheader.x30, { color: neutral.s600 }]}>Reminders</Text>
        </View>

        <View style={[styles.reminderContainer]}>
          <Reminders reminders={mockupReminders} />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <Text style={[subheader.x30, { color: neutral.s600 }]}>Recet health activity</Text>
          <Text style={[body.x20, { color: neutral.s400 }]}>{formattedDate}</Text>
        </View>


        {/* if the events array equals 0 (there is no event) show a different view */}
        {loading && <ActivityIndicator size={"small"} color={'#0000ff'} />}
        {loading == false && events.length === 0 ?
          <View style={[styles.emptyEventContainer, styles.shadowProp]}>
            <Image source={require('../../../assets/images/empty-events.png')} style={{ width: 102, height: 60 }} />
            <View style={[styles.emptyEventContainer, { borderWidth: 0, gap: 0, padding: 0 }]}>
              <Text style={[subheader.x40, { color: neutral.s600 }]}>Let's Get Started</Text>
              <Text style={[body.x20, { color: neutral.s400 }]}>Time to track some pet activites</Text>
            </View>
            <Button onPress={() => navigate("CreateNew")} title='Add activity' />
          </View>
          :
          <FlatList
            data={events}
            renderItem={({ item }: any) => (
              <View style={{ alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                <Event id={item.key} name={item.name} category={item.category} notes={item.notes} date={item.date} value={item.value} unitOfMeasure={item.unitOfMeasure} />
              </View>
            )}
            style={{ height: '100%' }}
            keyExtractor={(item: any) => item.key}
          />}

      </SafeAreaView>
    </PetContext.Provider>
  )
}

export default HomePage

const styles = StyleSheet.create({
  container: {
    backgroundColor: primary.backgroundColor,
    paddingHorizontal: 16,
    height: '100%'
  },

  welcomeContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    alignItems: 'center',

  },

  reminderContainer: {
    width: '100%',
    borderRadius: 18,
    padding: 4,
    backgroundColor: '#FFF',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: neutral.s100
  },

  summaryContainer: {
    gap: 8,
    flex: 1,
  },

  shadowProp: {
    shadowColor: '#21521',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },

  emptyEventContainer: {
    width: '100%',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: neutral.s100,
    borderRadius: 18,
    gap: 8,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#'
  }
})