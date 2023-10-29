import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Button from '../../components/basic/Button';
import { addEventByPetId, getPetId } from '../../services/pet';
import { componentStyle } from '../../assets/style/components';
import { body, subheader } from '../../assets/style/typography';
import { neutral } from '../../assets/style/colors';
import Toast from 'react-native-toast-message';

const AddActivityPage = ({ route, navigation }: any) => {
  const { category } = route.params;

  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [notes, setNotes] = useState('');
  const [petId, setPetId] = useState('');


  const handleClick = async () => {
    const numValue:number = +value;

    addEventByPetId(petId, {
      category: category,
      name: name,
      notes: notes,
      value: numValue
    }).then(() => {
      navigation.goBack()
      Toast.show({
        type: 'success',
        text1: 'Event added',
        text2: `${name} added successfully`,
        position: 'bottom',
        topOffset: 100
      });
    });
  }


  useEffect((): any => {
    let mounted = true;
    getPetId().then(items => {
      if (mounted) {
        setPetId(items)
      }
    })

    return () => mounted = false;
  }, [])


  useEffect((): any => {
    if(category == 'Weight'){
      setName('Logged weight')
    } 
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={[styles.container, { marginHorizontal: 0 }]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}>

        <View style={styles.inputContainer}>
          <Text>You selected: {category}</Text>

          <View style={styles.inputSection}>
            <Text style={[subheader.x10, { color: neutral.s800 }]}>Name</Text>
            <TextInput
              placeholder='Enter a name'
              value={name}
              style={componentStyle.textInput}
              onChangeText={setName} />
          </View>

          {category === 'Weight' ?
            <View style={styles.inputSection}>
              <Text style={[subheader.x10, { color: neutral.s800 }]}>Value</Text>
              <TextInput
                placeholder='Enter a value'
                value={value}
                style={componentStyle.textInput}
                onChangeText={setValue}
                keyboardType={Platform.OS == 'android' ? "numeric" : "number-pad"} />

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
        <View style={{}}>
          <Button onPress={handleClick} title='Add activity' />
        </View>
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