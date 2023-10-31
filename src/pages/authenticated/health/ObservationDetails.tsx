import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const ObservationDetails = ({ route, navigation }: any) => {
    const props = route.params;
    
    useEffect(() => {
        console.log(props)
    }, [])

    return (
        <View>
            <Text>{props?.key}</Text>
        </View>
    )
}

export default ObservationDetails

const styles = StyleSheet.create({})