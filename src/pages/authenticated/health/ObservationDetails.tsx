import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { usePetContext } from '../../../context/PetContext';
import { db } from '../../../services/config';
import { collection, query } from 'firebase/firestore';
import { body, header, subheader } from '../../../assets/style/typography';
import { neutral, primary } from '../../../assets/style/colors';
import CompletedIcon from '../../../assets/icons/completed.svg'
import NotCompletedIcon from '../../../assets/icons/not_completed.svg'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { editObservation } from '../../../services/observation';
import Button from '../../../components/basic/Button';

const ObservationDetails = ({ route, navigation }: any) => {
    const props = route.params;
    const { petId } = usePetContext();
    const [completed, setCompleted] = useState(props.completed);

    useEffect(() => {
        // query(collection(db, `pets/${petId}/observations/${props.key}/observation`))
    }, [])

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
                <Text style={[body.x20, { color: neutral.s400 }]}>Observations</Text>
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
        margin: 16,
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
        backgroundColor: '#FFF'
    },

    bottomContainer: {
        flexShrink: 1
    }
})