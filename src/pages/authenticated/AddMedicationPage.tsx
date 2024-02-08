import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { neutral, primary } from '../../assets/style/colors'
import CustomTextInput from '../../components/basic/CustomTextInput'
import Button from '../../components/basic/Button'
import CustomSelector from '../../components/basic/CustomSelectorModal'
import { body, subheader } from '../../assets/style/typography'
import Section from '../../components/basic/Section'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../services/config'
import { usePetContext } from '../../context/PetContext'

interface FormData {
  name: string;
  treatment: string;
  type: string,
  dosage?: number,
  unitOfMeasure?: string;
  frequency?: string; //monthly, daily
  startDate?: Date,
  endDate?: Date,
  notes?: string,

}


const AddMedicationPage = ({ route, navigation }: any) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    // Initialize form fields here
    name: '',
    treatment: '',
    type: '',
    dosage: 0,
    unitOfMeasure: 'piece',
    frequency: 'Monthly',
    startDate: new Date(),
    endDate: new Date(),
    notes: '',
  });

  const [inputText, setInputText] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const { petId } = usePetContext();


  const handleSavePress = async () => {
    try {
      const collectionRef = collection(db, `pets/${petId}/medications`);
      await addDoc(collectionRef, {
        name: formData.name,
        treatment: formData.treatment,
        type: formData.type,
        notes: formData.notes
      })
    } catch (error) {
      console.error('Error adding document: ', error);
    } finally{
      navigation.navigate("Home")
    }
  } 

  const isSaveDisabled = () => formData.name === '' || formData.treatment === '' || formData.type === '';

  const showStartDatePickerModal = () => {
    setShowStartDatePicker(true);
  };

  const showEndDatePickerModal = () => {
    setShowEndDatePicker(true);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if(field == 'type'){
      closeModal();
    }
    console.log(formData)
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };



  return (
    <View style={styles.container}>
      <CustomTextInput label='Name' placeholder="Nextgard" onChangeText={(name) => handleInputChange('name', name)} />
      <CustomTextInput label='Treatment' placeholder="Heartworm prevention" onChangeText={(treatment) => handleInputChange('treatment', treatment)} />

      {/*  SET TYPE */}
      {/* Opening modal to select type (Medicine or vitamin) */}
      <View style={{ marginTop: 12 }}>

        <Text style={[subheader.x10, { marginHorizontal: 16, color: neutral.s500 }]}>Type</Text>
        <View style={styles.typeContainer}>
          <Text style={[subheader.x20, { color: neutral.s800 }]}>{formData.type != '' ? formData.type : "Select a type"} </Text>

          <TouchableOpacity onPress={openModal} style={styles.chipButton}>
            <Text style={[subheader.x20, { color: primary.s600 }]}>Select</Text>
          </TouchableOpacity>
        </View>

        {/* Modal with children */}
        <CustomSelector modalVisible={modalVisible} closeModal={closeModal} headerLabel='Select type'
          children={
            <View style={styles.typeSelector}>
              <TouchableOpacity style={[formData.type == '💊 Medicine' ? styles.selectedContainer : styles.notSelectedContainer]} onPress={() => handleInputChange('type', '💊 Medicine')}>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>💊</Text>
                </View>
                <Text style={[body.x20, { color: neutral.s800 }]}>Medicine</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[formData.type == '🍏 Vitamin' ? styles.selectedContainer : styles.notSelectedContainer]} onPress={() => handleInputChange('type', '🍏 Vitamin')}>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>🍏</Text>
                </View>
                <Text style={[body.x20, { color: neutral.s800 }]}>Vitamin</Text>
              </TouchableOpacity>
            </View>
          } />
      </View>
      <CustomTextInput label='Notes' placeholder="100 ml" onChangeText={(notes) => handleInputChange('notes', notes)} />

      {/*  */}
      <View style={{ margin: 16 }}>
        <Button title='Save' onPress={handleSavePress} disabled={isSaveDisabled()}/>
      </View>

    </View>
  )
}

export default AddMedicationPage

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: primary.backgroundColor
  },

  typeContainer: {
    backgroundColor: '#FFF',
    marginTop: 8,
    borderRadius: 18,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: neutral.s100,
  },

  typeSelector: {
    marginTop: 8,
    gap: 8
  },

  notSelectedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: neutral.s100,
    borderWidth: 1,
    padding: 8,
    borderRadius: 16
  },

  selectedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: primary.s600,
    borderWidth: 1.5,
    padding: 8,
    borderRadius: 16

  },


  iconContainer: {
    backgroundColor: "#f6f6f6",
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    borderRadius: 10,

  },
  icon: {
    fontSize: 16,
  },

  chipButton: {
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    height: 32,
    borderRadius: 99,
    backgroundColor: "#F3F1FE"
  }
})