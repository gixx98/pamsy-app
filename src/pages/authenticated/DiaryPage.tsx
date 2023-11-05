import { ActivityIndicator, Alert, FlatList, Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import { componentStyle } from '../../assets/style/components';
import { neutral, primary } from '../../assets/style/colors';
import { addMonths, eachDayOfInterval, endOfDay, endOfMonth, endOfWeek, format, startOfDay, startOfMonth, startOfWeek } from 'date-fns';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/config';
import { usePetContext } from '../../context/PetContext';
import ShortDateView from '../../components/ShortDateView';
import Event from '../../components/events/Event';
import { body, subheader } from '../../assets/style/typography';
import { Dimensions } from "react-native";
import BackIcon from '../../assets/icons/angle-left.svg';
import ForwardIcon from '../../assets/icons/angle-right.svg';

const width = Dimensions.get('window').width;


const DiaryPage = () => {
  const [filter, setFilter] = useState('month'); // 'month', 'week', 'day'
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState<unknown[]>([]); // List of events from Firestore
  const [filteredEvents, setFilteredEvents] = useState<unknown[]>([]); // Events after applying filter and search
  const { petId } = usePetContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

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
  }, [filter, searchTerm, selectedDate]);


  const filterEvents = () => {
    let filtered: any[] = [...events];

    if (filter === 'month') {
      filtered = filtered.filter(event => event.createdAt >= startOfMonth(selectedDate) && event.createdAt <= endOfMonth(selectedDate));
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

  const handleBack = () => {
    setSelectedDate(prevDate => addMonths(prevDate, -1));
    filterEvents();
  };

  const handleForward = () => {
    setSelectedDate(prevDate => addMonths(prevDate, 1));
    filterEvents();
  };

  const generateDates = () => {
    if (filter === 'month') {
      const startDate = startOfMonth(selectedDate);
      const endDate = endOfMonth(selectedDate);
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
    <SafeAreaView style={styles.container}>
      {/* <Picker
        selectedValue={filter}
        onValueChange={(itemValue) => setFilter(itemValue)}
      >
        <Picker.Item label="Month" value="month" />
        <Picker.Item label="Week" value="week" />
        <Picker.Item label="Day" value="day" />
      </Picker> */}
      <View style={styles.dateSelector}>
        <TouchableOpacity onPress={handleBack}>
          <BackIcon color={primary.s600} />
        </TouchableOpacity>
        <Text style={[subheader.x10, {color: neutral.s600}]}>{selectedDate.toLocaleString('en-EN', { month: 'long' }) }</Text>
        <TouchableOpacity onPress={handleForward}>
          <ForwardIcon color={primary.s600} />
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="Search events"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
        style={[componentStyle.textInput, { marginVertical: 8 }]}
      />

      {loading ? <ActivityIndicator /> :
        <FlatList
          data={dates}
          keyExtractor={(date) => date.toString()}
          renderItem={({ item }: any) => (
            <View style={{ flexDirection: 'row', flex: 1, gap: 8 }}>
              <ShortDateView date={format(item, 'dd MMM EEE')} />
              <View style={{ width: '100%', borderBottomColor: neutral.s200, justifyContent: 'center' }}>
                {filteredEvents
                  .filter((event: any) => format(event.createdAt, 'dd/MM/yyyy') === format(item, 'dd/MM/yyyy'))
                  .map((event: any) => (
                    <View key={event.key} style={{ width: '100%' }} >
                      <Event id={event.key} name={event.name} category={event.category} date={event.createdAt} notes={event.notes} type='fromDiary' />
                    </View>
                  ))}
                {filteredEvents
                  .filter((event: any) => format(event.createdAt, 'dd/MM/yyyy') === format(item, 'dd/MM/yyyy'))
                  .length === 0 && (
                    <Text style={[body.x20, { color: neutral.s300, justifyContent: 'center' }]}>No events for this date</Text>
                  )}
              </View>
            </View>
          )}
          style={styles.flatListContainer}
          showsVerticalScrollIndicator={false}
        />
      }
    </SafeAreaView>
  )
}

export default DiaryPage

const styles = StyleSheet.create({
  container: {
    backgroundColor: primary.backgroundColor,
    height: '100%',
    paddingHorizontal: 16
  },
  flatListContainer: {
    height: '100%'
  },

  dateSelector: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40
  }

})