import { FlatList, LayoutChangeEvent, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { usePetContext } from '../../../context/PetContext';
import { db } from '../../../services/config';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { body, header, subheader } from '../../../assets/style/typography';
import { neutral, primary } from '../../../assets/style/colors';
import CompletedIcon from '../../../assets/icons/completed.svg'
import NotCompletedIcon from '../../../assets/icons/not_completed.svg'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { editObservation } from '../../../services/observation';
import Button from '../../../components/basic/Button';
import { useSharedValue } from 'react-native-reanimated';
import { ListItem } from '../../../components/animated/ObservationItem';

const ObservationDetails = ({ route, navigation }: any) => {
    const props = route.params;
    const [records, setRecords]: any = useState([]);
    const { petId } = usePetContext();
    const [loading, setLoading] = useState(true);
    const [completed, setCompleted] = useState(props.completed);

    const [height, setHeight] = useState(0);
    const animatedHeight = useSharedValue(0);

    const onLayout = (event: LayoutChangeEvent) => {
        const onLayoutHeight = event.nativeEvent.layout.height;
      
        if (onLayoutHeight > 0 && height !== onLayoutHeight) {
          setHeight(onLayoutHeight);
        }
      };

      

    useEffect(() => {
        const subscriber = onSnapshot(query(collection(db, `pets/${petId}/observations/${props.key}/records`), orderBy("createdAt", 'desc')), (doc) => {
            const eventsArray: any = [];
            doc.forEach((doc) => {
                eventsArray.push({
                    key: doc.id,
                    title: doc.data().title,
                    createdAt: new Date(doc.data().createdAt.seconds * 1000 + doc.data().createdAt.nanoseconds / 1e6),
                    notes: doc.data().notes,
                    duration: doc.data().duration,
                    description: doc.data().description,
                    environment: doc.data().environment,
                });
            });
            setRecords(eventsArray);
            setLoading(false)
        })

        return () => subscriber();
    }, []);


    useEffect(() => {
        console.log(completed)
    }, [completed])

    const handleCompletion = async () => {
        setCompleted((prevState: any) => !prevState);
        editObservation(props.key, completed, petId);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <View>
                    <Text style={[subheader.x20, { color: neutral.s400 }]}>{props.createdAt}</Text>
                    <Text style={[header.x50, { color: neutral.s800 }]}>{props.title}</Text>
                </View>
                {completed ?
                    <TouchableOpacity onPress={handleCompletion}>
                        <CompletedIcon width={36} height={36} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={handleCompletion}>
                        <NotCompletedIcon width={36} height={36} />
                    </TouchableOpacity>}
            </View>
            <View style={styles.centerContainer}>
                <Text style={[body.x20, { color: neutral.s400 }]}>All observation</Text>
                <FlatList
                    data={records}
                    keyExtractor={(item: any) => item.key}
                    renderItem={({ item }: any) => (
                        <ListItem item={item} />
                    )}
                />
            </View>

            <View style={styles.bottomContainer}>
                <Button title='New observation' onPress={() => { }} />
            </View>
        </SafeAreaView>
    )
}

export default ObservationDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        height: '100%',
        backgroundColor: '#F3F2F7',
        justifyContent: 'space-between',
    },

    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        marginVertical: 8,
        flexShrink: 1
    },

    centerContainer: {
        flex: 1,
    },

    bottomContainer: {
        flexShrink: 1
    }
})