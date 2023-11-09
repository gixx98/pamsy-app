import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { neutral, primary } from '../assets/style/colors'
import { body } from '../assets/style/typography'

interface LoadingModalProps {
    modalVisible: boolean,
    task: string
}

const LoadingModal = (props: LoadingModalProps) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.modalVisible}
            statusBarTranslucent={true}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ActivityIndicator size={'small'} color={primary.s600} />
                    {props.task ?
                        <Text style={[body.x20, { color: neutral.s800, textAlign: 'center' }]}>{props.task}</Text> :
                        <Text style={[body.x20, { color: neutral.s800, textAlign: 'center' }]}>Loading...</Text>
                    }
                </View>
            </View>
        </Modal>
    )
}

export default LoadingModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0008'
    },

    modalView: {
        margin: 20,
        width: '80%',
        gap: 8,
        height: 70,
        backgroundColor: '#FFF',
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})