import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, Image, View, ActivityIndicator } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigation } from '../../../App';
import Header from '../../../components/Header';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../../../services/config';
import { getPetId } from '../../../services/pet';
import Event from '../../../components/events/Event';
import { body, header, subheader } from '../../../assets/style/typography';
import { neutral } from '../../../assets/style/colors';
import Reminders from '../../../components/Reminders';
import { SafeAreaView } from 'react-native-safe-area-context';
import BoneBreakIcon from '../../../assets/icons/bone-break.svg';
import EmptyEventsIcon from '../../../assets/icons/empty-events.svg'
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

const HomePage = () => {
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
      const subscriber = onSnapshot(query(collection(db, `pets/${petId}/events`), where("createdAt", ">=", startOfToday), where("createdAt", "<=", endOfToday)), (doc) => {
        const eventsArray: any = [];
        doc.forEach((doc) => {
          eventsArray.push({
            key: doc.id,
            name: doc.data().name,
            category: doc.data().category,
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


  const handleSettings = () => {
    navigate("Settings");
  }


  return (
    <PetContext.Provider value={{ petIdd }}>
      <SafeAreaView style={styles.container}>

        <Header onClick={handleSettings} />

        {/* <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewContainer}> */}

        <View style={styles.welcomeContainer}>
          <Text style={[subheader.x40, { color: neutral.s800 }]}>Today's reminders</Text>
          <Text style={[body.x30, { color: neutral.s400 }]}>{formattedDate}</Text>
        </View>

        <View style={[styles.reminderContainer]}>
          <Reminders reminders={mockupReminders} />
        </View>

        <View style={styles.summaryContainer}>
          <Text style={[subheader.x40, { color: neutral.s800 }]}>Today's activites</Text>
          {/* if the events array equals 0 (there is no event) show a different view */}
          {loading && <ActivityIndicator size={"small"} color={'#0000ff'} />}
          {loading == false && events.length === 0 ?
            <View style={styles.emptyEventContainer}>
              <Image source={require('../../../assets/images/empty-events.png')} style={{ width: 102, height: 60 }} />
              <View style={[styles.emptyEventContainer, { borderWidth: 0, gap: 0, padding: 0 }]}>
                <Text style={[subheader.x40, { color: neutral.s800 }]}>Let's Get Started</Text>
                <Text style={[body.x20, { color: neutral.s400 }]}>Time to track some pet activites</Text>
              </View>
              <Button onPress={() => navigate("CreateNew")} title='Add activity' />
            </View>
            :
            <FlatList
              data={events}
              renderItem={({ item }: any) => (
                <View style={{ alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                  <Event id={item.key} name={item.name} category={item.category} notes={item.notes} date={item.date} />
                </View>
              )}
              keyExtractor={(item: any) => item.key}
            />}

        </View>


        {/* </ScrollView> */}
      </SafeAreaView>
    </PetContext.Provider>
  )
}

export default HomePage

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F2F7',
    paddingHorizontal: 16
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

  emptyEventContainer: {
    width: '100%',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: neutral.s100,
    borderRadius: 12,
    gap: 8,
    padding: 16,
    alignItems: 'center'
  }
})