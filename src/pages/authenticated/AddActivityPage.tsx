import { ActivityIndicator, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Button from '../../components/basic/Button';
import { addEventByPetId, getPetId } from '../../services/pet';
import { componentStyle } from '../../assets/style/components';
import { body, subheader } from '../../assets/style/typography';
import { neutral, primary } from '../../assets/style/colors';
import Toast from 'react-native-toast-message';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import LoadingModal from '../../components/LoadingModal';
import Medicine from '../../assets/icons/medicine.svg'
import Vaccination from '../../assets/icons/vaccine.svg'
import Observation from '../../assets/icons/symptoms.svg'
import Vet from '../../assets/icons/vet.svg'
import Walk from '../../assets/icons/shoes-running.svg'
import Game from '../../assets/icons/puzzle.svg'
import Training from '../../assets/icons/target.svg'
import Food from '../../assets/icons/bone.svg'
import Water from '../../assets/icons/droplet.svg'
import Trimming from '../../assets/icons/scissors.svg'
import Dental from '../../assets/icons/tooth.svg'
import Weight from '../../assets/icons/weight-scale.svg'
import Stethoscope from '../../assets/icons/stethoscope.svg'
import SimpleHeader from '../../components/basic/SimpleHeader';
import DateTimePicker from '@react-native-community/datetimepicker';
import { usePetContext } from '../../context/PetContext';


const eventCategory: any = {
  'Medication': Medicine,
  'Vaccination': Vaccination,
  'Veterinary': Vet,
  'Observation': Observation,
  'Walk': Walk,
  'Training': Training,
  'Vet appointment': Stethoscope,
  'Playtime': Game,
  'Food': Food,
  'Water': Water,
  'Bath': Water,
  'Trimming': Trimming,
  'Dental': Dental,
  'Weight': Weight
};

const AddActivityPage = ({ route, navigation }: any) => {

  const { category } = route.params;
  const SelectedCategory = eventCategory[category];

  const [date, setDate] = useState(new Date());
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [unitOfMeasure, setUnitOfMeasure] = useState('Minutes');
  const [dosage, setDosage] = useState('');
  const [notes, setNotes] = useState('');
  const { petId } = usePetContext();
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);


  const handleClick = async () => {
    setLoading(true);
    const numValue: number = +value;
    const eventData = {
      category: category,
      name: name,
      notes: notes,
      value: numValue,
      unitOfMeasure: unitOfMeasure,
      dateOfEvent: date
    }
    addEventByPetId(petId, eventData).then(() => {
      navigation.goBack()
      Toast.show({
        type: 'success',
        text1: 'Event was added successfully! ✅',
        position: 'top',
        topOffset: 60
      });
      setLoading(false);

    });
  }

  useEffect((): any => {
    if (category == 'Weight') {
      setName('Logged weight')
    }
  }, [])

  // const isButtonDisabled = !name;
  const catLowerCase = category.toLowerCase();
  const buttonTitle = `Add ${catLowerCase}`

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={[styles.container, { marginHorizontal: 0 }]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={10}>
        <SimpleHeader name='' onButtonPress={() => navigation.goBack()} />
        <View style={styles.inputContainer}>
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <View style={{ alignItems: 'center', width: 52, height: 52, justifyContent: 'center', borderRadius: 12, backgroundColor: primary.s600 }}>
              <SelectedCategory color={neutral.s100} width={32} height={32} />
            </View>
            <View>
              <Text style={[body.x10, { color: neutral.s400 }]}>New event</Text>
              <Text style={[subheader.x40, { color: neutral.s600 }]}>{category}</Text>


            </View>
          </View>

          {/* VET APPOINTMENT IS THE SELECTED */}
          {category === 'Vet appointment' ?
            <View style={{ justifyContent: 'flex-start' }}>
              <Text style={[subheader.x20, { color: neutral.s600, alignSelf: 'flex-start' }]}>Date and time</Text>
              <DateTimePicker
                minimumDate={new Date()}
                maximumDate={new Date(2030, 1, 1)}
                value={date}
                mode='datetime'
                style={{ alignSelf: 'flex-start' }}
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    setDate(selectedDate); // Update the date state with the selected date
                  }
                }}
              />
            </View>
            : <></>}

          {/* MEDICATION IS THE SELECTED */}
          {category === 'Medication' ?
            <>
              <View style={styles.inputSection}>
                <Text style={[subheader.x10, { color: neutral.s800 }]}>Medication</Text>
                <TextInput
                  placeholder='Enter medication name'
                  value={name}
                  style={componentStyle.textInput}
                  onChangeText={setName} />
              </View>
              <View style={styles.inputSection}>
                <Text style={[subheader.x10, { color: neutral.s800 }]}>Dosage</Text>
                <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
                  <TextInput
                    autoFocus={true}
                    placeholder='Enter dosage'
                    value={value}
                    style={[componentStyle.textInput, { flex: 1.5 }]}
                    onChangeText={setValue}
                    keyboardType={Platform.OS == 'android' ? "numeric" : "decimal-pad"} />
                  <SegmentedControl
                    values={['pc', 'mg', 'ml']}
                    style={{ flex: 1 }}
                    selectedIndex={selectedIndex}
                    onChange={(event) => {
                      setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
                      if (event.nativeEvent.selectedSegmentIndex == 0) setUnitOfMeasure('pc');
                      if (event.nativeEvent.selectedSegmentIndex == 1) setUnitOfMeasure('mg');
                      if (event.nativeEvent.selectedSegmentIndex == 2) setUnitOfMeasure('ml');
                    }}
                  />
                </View>
              </View>
            </> :
            <></>
          }

          {/* EXERCISE IS THE SELECTED */}
          {category === 'Training' || category === 'Walk' || category === 'Playtime' ?
            <View style={styles.inputSection}>
              <Text style={[subheader.x10, { color: neutral.s800 }]}>Duration</Text>
              <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
                <TextInput
                  autoFocus={true}
                  placeholder='Enter duration'
                  value={value}
                  style={[componentStyle.textInput, { flex: 1.5 }]}
                  onChangeText={setValue}
                  keyboardType={Platform.OS == 'android' ? "numeric" : "decimal-pad"} />
                <SegmentedControl
                  values={['Minutes', 'Hours']}
                  style={{ flex: 1 }}
                  selectedIndex={selectedIndex}
                  onChange={(event) => {
                    setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
                    setUnitOfMeasure(event.nativeEvent.selectedSegmentIndex == 0 ? 'Minutes' : 'Hours')
                  }}
                />
              </View>
            </View> :
            <></>
          }

          {/* <View style={styles.inputSection}>
            <Text style={[subheader.x10, { color: neutral.s800 }]}>Name</Text>
            <TextInput
              placeholder='Enter a name'
              value={name}
              style={componentStyle.textInput}
              onChangeText={setName} />
          </View> */}

          {category === 'Weight' ?
            <View style={styles.inputSection}>
              <Text style={[subheader.x10, { color: neutral.s800 }]}>Value</Text>
              <TextInput
                placeholder='Enter a value'
                value={value}
                style={componentStyle.textInput}
                onChangeText={setValue}
                keyboardType={Platform.OS == 'android' ? "numeric" : "decimal-pad"} />

            </View>
            :
            <></>
          }

          <View style={styles.inputSection}>
            <Text style={[subheader.x10, { color: neutral.s800 }]}>Notes</Text>
            <TextInput
              placeholder='Write some notes here'
              multiline
              value={notes}
              style={componentStyle.textInputMultiline}
              onChangeText={setNotes} />
          </View>
        </View>
        <Button onPress={handleClick} title={buttonTitle} />
        <LoadingModal modalVisible={loading} task='Adding event...' />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default AddActivityPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F2F7',
    height: '100%',
    marginHorizontal: 16
  },

  inputContainer: {
    marginTop: 8,
    flex: 1,
    gap: 8
  },

  inputSection: {
    gap: 4,
  }
})