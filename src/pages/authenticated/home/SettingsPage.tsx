import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../../components/basic/Button'
import { getAuth, signOut } from 'firebase/auth'
import { db } from '../../../services/config'
import { danger, neutral, primary } from '../../../assets/style/colors'
import { body, subheader } from '../../../assets/style/typography'
import LogOutIcon from '../../../assets/icons/log-out.svg';
import SimpleHeader from '../../../components/basic/SimpleHeader'

const SettingsPage = ({navigation}:any) => {

  const auth = getAuth();
  const handleLogout = () => {
    signOut(auth);
  }

  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader onButtonPress={() => navigation.goBack()} />
      <View>
        <TouchableOpacity style={styles.dangerButton} onPress={handleLogout}>
          {/* <LogOutIcon color={neutral.s600}/> */}
          <Text style={[subheader.x30,{color: danger.s400}]}>Log out</Text>
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
    gap: 16
  },

  dangerButton: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    height: 44,
    borderRadius: 12,
    gap: 8,
    minHeight: 28,
  }
})