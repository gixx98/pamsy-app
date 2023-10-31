import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { usePetContext } from '../../../context/PetContext';
import { db } from '../../../services/config';
import { collection, query } from 'firebase/firestore';
import { header, subheader } from '../../../assets/style/typography';
import { neutral, primary } from '../../../assets/style/colors';
import CompletedIcon from '../../../assets/icons/completed.svg'
import NotCompletedIcon from '../../../assets/icons/not_completed.svg'
import { TouchableOpacity } from 'react-native-gesture-handler';

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

    const handleCompletion = () => {
        setCompleted((prevState:any) => !prevState)
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
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
        </View>
    )
}

export default ObservationDetails

const styles = StyleSheet.create({
    container: {
        margin: 16,
        height: '100%',
        backgroundColor: '#F3F2F7'
    }
})