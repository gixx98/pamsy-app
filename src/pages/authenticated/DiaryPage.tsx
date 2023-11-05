import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import { componentStyle } from '../../assets/style/components';
import { primary } from '../../assets/style/colors';
import { eachDayOfInterval, endOfDay, endOfMonth, endOfWeek, format, startOfDay, startOfMonth, startOfWeek } from 'date-fns';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/config';
import { usePetContext } from '../../context/PetContext';
import ShortDateView from '../../components/ShortDateView';
import Event from '../../components/events/Event';

const DiaryPage = () => {
  const [filter, setFilter] = useState('month'); // 'month', 'week', 'day'
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState<unknown[]>([]); // List of events from Firestore
  const [filteredEvents, setFilteredEvents] = useState<unknown[]>([]); // Events after applying filter and search
  const { petId } = usePetContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = onSnapshot(collection(db, `pets/${petId}/events`), (doc) => {
      const eventsArray: any = [];
      doc.forEach((doc) => {
        eventsArray.push({
          key: doc.id,
          name: doc.data().name,
          category: doc.data().category,
          createdAt: new Date(doc.data().createdAt.seconds * 1000 + doc.data().createdAt.nanoseconds / 1e6),
          notes: doc.data().notes,
        });
      });
      setEvents(eventsArray);
      setLoading(false);
    })

    return () => subscriber();
  }, [])

  useEffect(() => {
    filterEvents();
    console.log(filteredEvents)
  }, [filter, searchTerm]);


  const filterEvents = () => {
    let filtered: any[] = [...events];

    if (filter === 'month') {
      filtered = filtered.filter(event => event.createdAt >= startOfMonth(new Date()) && event.createdAt <= endOfMonth(new Date()));
    } else if (filter === 'week') {
      filtered = filtered.filter(event => event.createdAt >= startOfWeek(new Date()) && event.createdAt <= endOfWeek(new Date()));
    } else if (filter === 'day') {
      filtered = filtered.filter(event => event.createdAt >= startOfDay(new Date()) && event.createdAt <= endOfDay(new Date()));
    }

    if (searchTerm) {
      filtered = filtered.filter(event => event.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    setFilteredEvents(filtered);
  };

  const generateDates = () => {
    if (filter === 'month') {
      const startDate = startOfMonth(new Date());
      const endDate = endOfMonth(new Date());
      return eachDayOfInterval({ start: startDate, end: endDate });
    } else if (filter === 'week') {
      // Generate dates for the current week
    } else if (filter === 'day') {
      // Generate dates for the current day
    }

    return [];
  };

  const dates = generateDates();


  return (
    <View style={styles.container}>
      {/* <Picker
        selectedValue={filter}
        onValueChange={(itemValue) => setFilter(itemValue)}
      >
        <Picker.Item label="Month" value="month" />
        <Picker.Item label="Week" value="week" />
        <Picker.Item label="Day" value="day" />
      </Picker> */}
      <TextInput
        placeholder="Search events"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
        style={[componentStyle.textInput, { marginVertical: 8 }]}
      />


      <FlatList
        data={dates}
        keyExtractor={(date) => date.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row' }}>
            <ShortDateView date={format(item, 'dd MMM EEE')} />
            <View>
              {events
                .filter((event: any) => format(event.createdAt, 'dd/MM/yyyy') === format(item, 'dd/MM/yyyy'))
                .map((event: any) => (
                  <View key={event.name}>
                    {/* <Event id={event.key} name={event.name} category={event.category} date={event.createdAt} /> */}
                    <Text>{event.name}</Text>
                  </View>
                ))}
            </View>
          </View>
        )}
      />
    </View>
  )
}

export default DiaryPage

const styles = StyleSheet.create({
  container: {
    backgroundColor: primary.backgroundColor,
    marginHorizontal: 16
  }
})