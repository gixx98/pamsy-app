import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { usePetContext } from '../../../context/PetContext';
import { DocumentData, collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { LineChart } from 'react-native-chart-kit';
import { db } from '../../../services/config';
import Event from '../../../components/events/Event';
import { subheader } from '../../../assets/style/typography';
import { neutral } from '../../../assets/style/colors';
import Button from '../../../components/basic/Button';

const screenWidth = Dimensions.get("window").width;



const WeightPage = ({ route, navigation }: any) => {


  const { petId } = usePetContext();

  const [weightEvents, setWeightEvents] = useState([]);
  const [weights, setWeights] = useState([0, 0, 0, 0, 0, 0]);
  const [dates, setDates] = useState([]);

  const data = {
    labels: dates,
    datasets: [
      {
        data: weights,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
        strokeWidth: 4 // optional
      }
    ],
    // legend: ["Weight logged"] // optional
  };

  const chartConfig = {
    color: (opacity = 0) => `rgba(34, 54, 131, ${opacity})`,
    backgroundColor: "#FFF",
    backgroundGradientFrom: "#FFF",
    backgroundGradientTo: "#FFF",
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    style: {
      borderRadius: 16,
    },
  };
  useEffect(() => {
    const subscriber = onSnapshot(query(collection(db, `pets/${petId}/events`), where("category", "==", "Weight"), orderBy("createdAt", 'asc')), (doc) => {
      const eventsArray: any = [];
      const weightValues: any = [];
      const dateValues: any = [];
      doc.forEach((doc) => {
        weightValues.push(doc.data().value)
      })

      doc.forEach((doc) => {
        const date = new Date(doc.data().createdAt.seconds * 1000 + doc.data().createdAt.nanoseconds / 1e6);
        const options: any = { month: 'short', day: 'numeric' };
        const formattedDate = date?.toLocaleDateString('en-US', options);
        dateValues.push(formattedDate)
      })

      doc.forEach((doc) => {
        console.log(doc)
        eventsArray.push({
          key: doc.id,
          name: doc.data().name,
          category: doc.data().category,
          value: doc.data().value,
          date: new Date(doc.data().createdAt.seconds * 1000 + doc.data().createdAt.nanoseconds / 1e6),
          notes: doc.data().notes,
        });
      });
      console.log("Before adding:" + weightEvents)
      setWeightEvents(eventsArray);
      setWeights(weightValues);
      setDates(dateValues);

      return () => subscriber();
    })
  }, [])

  useEffect(() => {
    console.log("Updated weightEvents:", weightEvents);
  }, [weightEvents]);

  useEffect(() => {
    console.log("Updated weights:", weights);
  }, [weights]);

  useEffect(() => {
    console.log("Updated dates:", dates);
  }, [dates]);

  const handleClick = () => {
    navigation.navigate("AddActivityPage", {
      category: "Weight"
  });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chartContainer}>
        <LineChart
          data={data}
          width={screenWidth}
          height={256}
          chartConfig={chartConfig}
          bezier
        />
      </View>
      <Text style={[subheader.x40, { color: neutral.s800 }]}>Logged weights</Text>
      {weightEvents ? <FlatList
        data={weightEvents.reverse()}
        renderItem={({ item }: any) => (
          <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Event id={item.key} name={item.value} category='Weight' date={item.date} pet={petId} notes='' type='fromWeightPage' />
          </View>
        )}
        keyExtractor={(item: any) => item?.key}
      /> : <Text>Loading:</Text>
      }
      <Button title='Add weight' onPress={handleClick} />

    </SafeAreaView>
  )
}

export default WeightPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F2F7',
    paddingTop: 8,
    marginHorizontal: 16,
    gap: 8
  },
  chartContainer: {
    borderRadius: 12,
    marginTop: 16,
    alignItems: 'center',
    overflow: 'hidden'
  }
})