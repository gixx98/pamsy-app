import { Platform, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { body, subheader } from '../assets/style/typography';
import { componentStyle } from '../assets/style/components';
import { neutral, primary } from '../assets/style/colors';
import DateTimePicker, { Event as DateTimePickerEvent } from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Button from './basic/Button';
import InfoIcon from '../assets/icons/info.svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addObservation } from '../services/observation';
import { usePetContext } from '../context/PetContext';


const AddObservationModal = ({ navigation, route }: any) => {
  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const { petId } = usePetContext();

  useEffect(() => {
    console.log("Date changed");
  }, [selectedDate])

  const handleDateChange = (event: any, selected: Date | undefined) => {
    if (selected) {
      setSelectedDate(selected);
    }
    setShowPicker(true); // Hide the picker on iOS
  };


  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const handleNewClick = () => {
    try {
      addObservation(petId, { title: title, createdAt: new Date() })
      navigation.goBack()

    }
    catch (e: unknown) {
      console.log(e)
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.inputSection}>
        <Text style={[subheader.x10, { color: neutral.s800 }]}>Title</Text>
        <TextInput
          placeholder='Enter a title'
          value={title}
          style={componentStyle.textInput}
          onChangeText={setTitle} />
      </View>
      {/* <View style={styles.inputSection}>
        <Text style={[subheader.x10, { color: neutral.s800 }]}>Symptoms started at</Text>
        <RNDateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
        <Text>{selectedDate.toDateString()}</Text>
      </View> */}
      <Button title="Create collection" onPress={handleNewClick}></Button>
      <View style={[{ flexDirection: 'row', gap: 8, width: '100%', alignItems: 'center' }]}>
        <InfoIcon color={neutral.s500} width={24} height={24} />
        <Text style={[body.x10, { color: neutral.s500, flexShrink: 1 }]}>After you created this collection of observations, you can add your observations to it whenever they occur.</Text>
      </View>
    </View>
  )
}

export default AddObservationModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F2F7',
    height: '100%',
    marginHorizontal: 16,
    marginVertical: 16,
    gap: 8,

  },

  inputContainer: {
    marginTop: 8,
    flex: 1,
    gap: 8
  },
  inputSection: {
    gap: 4
  }
})