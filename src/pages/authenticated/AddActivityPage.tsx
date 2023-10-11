import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Button from '../../components/Button';
import { addEventByPetId, getPetId } from '../../services/pet';
import { componentStyle } from '../../assets/style/components';
import { body, subheader } from '../../assets/style/typography';
import { neutral } from '../../assets/style/colors';

const AddActivityPage = ({ route, navigation }: any) => {
  const { category } = route.params;
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [petId, setPetId] = useState('');

  const handleClick = async () => {
    addEventByPetId(petId, {
      category: category,
      name: name,
      notes: notes
    });
    navigation.navigate('Home')
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>You selected: {category}</Text>

        <View style={styles.inputSection}>
          <Text style={[subheader.x10, {color: neutral.s800}]}>Name</Text>
          <TextInput
            placeholder='Enter a name'
            value={name}
            style={componentStyle.textInput}
            onChangeText={setName} />
        </View>

        <View style={styles.inputSection}>
          <Text style={[subheader.x10, {color: neutral.s800}]}>Notes</Text>
          <TextInput
            placeholder='Write some notes here'
            multiline
            value={notes}
            style={componentStyle.textInputMultiline}
            onChangeText={setNotes} />
        </View>

      </View>
      <View style={{}}>
        <Button onPress={handleClick} title='Add event' />
      </View>
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