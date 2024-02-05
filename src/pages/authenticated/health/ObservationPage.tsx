import { SafeAreaView, StyleSheet, Text, View, Image, FlatList, TouchableOpacity, ActivityIndicator, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import Button from '../../../components/basic/Button'
import { body, subheader } from '../../../assets/style/typography'
import { neutral, primary } from '../../../assets/style/colors'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../../../services/config'
import { usePetContext } from '../../../context/PetContext'
import SegmentedControl from '@react-native-segmented-control/segmented-control';

export default function ObservationPage({ route, navigation }: any) {
  const [observations, setObservations]: any = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { petId } = usePetContext();

  useEffect(() => {
    const subscriber = onSnapshot(query(collection(db, `pets/${petId}/observations`), orderBy("createdAt", 'desc')), (doc) => {
      const eventsArray: any = [];
      doc.forEach((doc) => {
        eventsArray.push({
          key: doc.id,
          title: doc.data().title,
          createdAt: new Date(doc.data().createdAt.seconds * 1000 + doc.data().createdAt.nanoseconds / 1e6),
          completed: doc.data().completed,
        });
      });
      setObservations(eventsArray);
      setLoading(false)
    })

    return () => subscriber();
  }, []);

  const handleClick = (key: string, title: string, completed: boolean, createdAt: Date) => {
    navigation.navigate("ObservationDetails", {
      key: key,
      title: title,
      completed: completed,
      createdAt: createdAt
    })
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 8, gap: 8 }}>
        <SegmentedControl
          values={['Active', 'Resolved']}
          selectedIndex={selectedIndex}
          onChange={(event) => {
            setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
          }}
        />
        {selectedIndex === 0 &&
          <>
            {loading && <ActivityIndicator size={"small"} color={'#0000ff'} />}
            {loading == false && observations.length === 0 ?
              <View style={styles.emptyEventContainer}>
                <Image source={require('../../../assets/images/empty-events.png')} style={{ width: 102, height: 60 }} />
                <View style={[styles.emptyEventContainer, { borderWidth: 0, gap: 4, padding: 0 }]}>
                  <Text style={[subheader.x40, { color: neutral.s800 }]}>No collections yet</Text>
                  <Text style={[body.x20, { color: neutral.s400, textAlign: 'center', lineHeight: 20 }]}>Create a collection for your pet's symptoms and gather observations.</Text>
                </View>
              </View>
              :
              <FlatList
                data={observations}
                renderItem={({ item }: any) => (
                  <>
                    {!item.completed &&
                      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        <TouchableOpacity style={styles.observationContainer} onPress={() => handleClick(item.key, item.title, item.completed, item.createdAt.toLocaleDateString())}>
                          <View>
                            <Text style={[body.x10, { color: neutral.s400 }]}>{item.createdAt.toLocaleDateString()}</Text>
                            <Text style={[body.x20, { color: neutral.s800 }]}>{item.title}</Text>

                          </View>
                          <Text style={[subheader.x20, { color: primary.s600 }]}>Open</Text>
                        </TouchableOpacity>
                      </View>}

                  </>

                )}
                keyExtractor={(item: any) => item.key}
              />}
          </>
        }
        {selectedIndex === 1 && <>
          <FlatList
            data={observations}
            renderItem={({ item }: any) => (
              <>
                {item.completed && <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <TouchableOpacity style={styles.observationContainer} onPress={() => handleClick(item.key, item.title, item.completed, item.createdAt.toLocaleDateString())}>
                    <View>
                      <Text style={[body.x20, { color: neutral.s800 }]}>{item.title}</Text>
                      <Text style={[body.x10, { color: neutral.s400 }]}>{item.createdAt.toLocaleDateString()}</Text>

                    </View>
                    <Text style={[subheader.x20, { color: primary.s600 }]}>Open</Text>
                  </TouchableOpacity>
                </View>}

              </>
            )}
            keyExtractor={(item: any) => item.key}
          />
        </>}
      </View>
      <View style={{gap: 8}}>
        <Text style={[body.x10, { color: neutral.s400, textAlign: 'center' }]}>You can collect more than one observation in a collection so it will be easier for you to overview.</Text>
        <Button title='New collection' onPress={() => { navigation.navigate("AddObservation") }} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F2F7',
    marginHorizontal: 16,
    justifyContent: 'space-between',
    height: '100%'
  },
  observationContainer: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    width: '100%',
    borderColor: neutral.s100,
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    marginVertical: 2,
    justifyContent: 'space-between',
  },

  emptyEventContainer: {
    width: '100%',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: neutral.s100,
    borderRadius: 12,
    gap: 12,
    padding: 16,
    alignItems: 'center'
  }
})