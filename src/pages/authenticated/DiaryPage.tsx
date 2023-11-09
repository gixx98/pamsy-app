import { ActivityIndicator, Alert, FlatList, Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import { componentStyle } from '../../assets/style/components';
import { neutral, primary } from '../../assets/style/colors';
import { addMonths, eachDayOfInterval, endOfDay, endOfMonth, endOfWeek, format, startOfDay, startOfMonth, startOfWeek } from 'date-fns';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../services/config';
import { usePetContext } from '../../context/PetContext';
import ShortDateView from '../../components/ShortDateView';
import Event from '../../components/events/Event';
import { body, subheader } from '../../assets/style/typography';
import { Dimensions } from "react-native";
import BackIcon from '../../assets/icons/angle-left.svg';
import ForwardIcon from '../../assets/icons/angle-right.svg';
import SearchIcon from '../../assets/icons/search.svg';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import Header from '../../components/Header';


const width = Dimensions.get('window').width;


const DiaryPage = () => {
  const [filter, setFilter] = useState('month'); // 'month', 'week', 'day'
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState<unknown[]>([]); // List of events from Firestore
  const [filteredEvents, setFilteredEvents] = useState<unknown[]>([]); // Events after applying filter and search
  const { petId } = usePetContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [dates, setDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const subscriber = onSnapshot(query(collection(db, `pets/${petId}/events`), orderBy("createdAt", 'asc')), (doc) => {
      setLoading(true);
      const eventsArray: any = [];
      doc.forEach((doc) => {
        eventsArray.push({
          key: doc.id,
          name: doc.data().name,
          category: doc.data().category,
          value: doc.data().value,
          unitOfMeasure: doc.data().unitOfMeasure,
          createdAt: new Date(doc.data().createdAt.seconds * 1000 + doc.data().createdAt.nanoseconds / 1e6),
          notes: doc.data().notes,
        });
      });

      setEvents(eventsArray);

      filterEvents();
      setDates(generateDates());
      setLoading(false);
    });

    return () => subscriber();
  }, [])

  useEffect(() => {
    filterEvents();
    setDates(generateDates());

  }, [filter, searchTerm, selectedDate, events]);


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
  };

  const handleForward = () => {
    setSelectedDate(prevDate => addMonths(prevDate, 1));
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

  // const dates = generateDates();

  const combinedData = dates.map(date => {
    const eventsForDate = filteredEvents.filter((event: any) => format(event.createdAt, 'dd/MM/yyyy') === format(date, 'dd/MM/yyyy'));
    if (eventsForDate.length > 0) {
      return {
        date,
        events: eventsForDate
      };
    } else {
      return {
        date
      };
    }
  });

  const onRefresh = async () => {
    filterEvents();
    setDates(generateDates());
  }

  return (
    <SafeAreaView style={[componentStyle.AndroidSafeArea, styles.container]}>

      {/* <Header type='fromDiaryPage' /> */}
      <View style={styles.dateSelector}>
        <TouchableOpacity onPress={handleBack} style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
          <BackIcon color={primary.s600} />
        </TouchableOpacity>
        <Text style={[subheader.x30, { color: neutral.s600 }]}>{selectedDate.toLocaleString('en-EN', { month: 'long' })}</Text>
        <TouchableOpacity onPress={handleForward} style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
          <ForwardIcon color={primary.s600} />
        </TouchableOpacity>
      </View>

      {/* <View style={{ marginHorizontal: 16, marginVertical: 8 }}>
        <SegmentedControl
          values={['Month', 'Week', 'Day']}
          selectedIndex={selectedIndex}
          onChange={(event) => {
            setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
          }}
        />
      </View> */}

      {/* <View style={styles.searchSection}>
        <SearchIcon width={24} height={24} />
        <TextInput
          placeholder="Search events"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
          style={[styles.input]}
        />
      </View> */}

      {loading ? <ActivityIndicator /> :
        <FlatList
          data={combinedData}
          keyExtractor={(item) => item.date.toString()}
          onRefresh={() => onRefresh()}
          refreshing={loading}
          renderItem={({ item }: any) => (
            <View style={styles.combinedDataContainer}>
              <ShortDateView date={format(item.date, 'dd MMM EEE')} />
              <View style={{ width: '100%', justifyContent: 'center' }}>
                {item.events && item.events.map((event: any) => (
                  <View key={event.key} style={{ width: '100%' }} >
                    <Event id={event.key} name={event.name} category={event.category} date={event.createdAt} notes={event.notes} type='fromDiary' value={event.value} unitOfMeasure={event.unitOfMeasure} />
                  </View>
                ))}
                {!item.events && (
                  <Text style={[body.x20, { color: neutral.s300, justifyContent: 'center', marginLeft: 4 }]}>No events for this date</Text>
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
    paddingHorizontal: 16,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: neutral.s100,
    // backgroundColor: '#FFF'
  },

  combinedDataContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    gap: 16,
    marginBottom: 12,
    flex: 1,
    padding: 8
  },

  searchSection: {

    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderRadius: 18,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    marginVertical: 12,
    marginHorizontal: 16
  },

  input: {
    paddingTop: 16,
    paddingRight: 10,
    paddingBottom: 16,
    paddingLeft: 10,
    backgroundColor: '#fff',
    color: '#424242',
  },

})