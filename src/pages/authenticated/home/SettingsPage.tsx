import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../../components/basic/Button'
import { getAuth, signOut } from 'firebase/auth'
import { db } from '../../../services/config'
import { danger } from '../../../assets/style/colors'
import { body } from '../../../assets/style/typography'

const SettingsPage = () => {

  const auth = getAuth();
  const handleLogout = () => {
    signOut(auth);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity style={styles.dangerButton} onPress={handleLogout}>
          <Text style={[body.x30,{color: '#FFF'}]}>Log out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default SettingsPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    backgroundColor: '#F3F2F7',
  },

  dangerButton: {
    backgroundColor: '#D94E4E',
    alignItems: 'center',
    textAlign: 'center',
    verticalAlign: 'middle',
    paddingVertical: 8,
    borderRadius: 12,
    minHeight: 28,
    maxHeight: 48
  }
})