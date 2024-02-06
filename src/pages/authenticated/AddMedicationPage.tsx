import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { neutral, primary } from '../../assets/style/colors'
import CustomTextInput from '../../components/basic/CustomTextInput'
import Button from '../../components/basic/Button'
import CustomSelector from '../../components/basic/CustomSelector'
import { body, subheader } from '../../assets/style/typography'

const AddMedicationPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');

  const handleInputChange = (text: string) => {
    setInputText(text);
  };


  const handleSelectType = (selectedType: string) => {
    // Handle the selected type as needed
    console.log('Selected Type:', selectedType);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSelectChange = (type: string) => {
    if (type == selectedType) {
      setSelectedType('');
    } else {
      setSelectedType(type);
    }

    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <CustomTextInput label='Name' placeholder="E.g. 'NextGard'" onChangeText={handleInputChange} />
      <CustomTextInput label='Treatment' placeholder="E.g. 'Heartworm prevention'" onChangeText={handleInputChange} />
      <CustomTextInput label='Name' placeholder="'Medicine name'" onChangeText={handleInputChange} />

      {/* Opening modal to select type (Medicine or vitamin) */}
      <View style={styles.typeContainer}>
        <View style={{ flex: 1 }}>
          <Text style={[body.x10, { color: neutral.s400 }]}>Type</Text>
          <Text style={[subheader.x20, { color: neutral.s800 }]}>{selectedType != '' ? selectedType : "Select a type"} </Text>
        </View>

        <TouchableOpacity onPress={openModal} style={styles.chipButton}>
          <Text style={[subheader.x20, { color: primary.s600 }]}>Select</Text>
        </TouchableOpacity>
      </View>

      <CustomSelector onSelect={handleSelectType} modalVisible={modalVisible} closeModal={closeModal} headerLabel='Select type'
        children={
          <View style={styles.typeSelector}>
            <TouchableOpacity style={styles.selectionContainer} onPress={() => handleSelectChange('Medicine')}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>💊</Text>
              </View>
              <Text style={[body.x20, { color: neutral.s800 }]}>Medicine</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.selectionContainer} onPress={() => handleSelectChange('Vitamin')}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>🍏</Text>
              </View>
              <Text style={[body.x20, { color: neutral.s800 }]}>Vitamin</Text>
            </TouchableOpacity>
          </View>
        } />


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
    borderRadius: 18,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: neutral.s100,
    marginTop: 12
  },

  typeSelector: {
    marginTop: 8,
    gap: 8
  },

  selectionContainer: {
    flexDirection: 'row',
    alignItems: 'center'
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