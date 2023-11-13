import { useEffect, useState } from "react";
import { View, TouchableWithoutFeedback, StyleSheet, Text } from "react-native";
import { CollapsableContainer } from "./CollapsibleContainer";
import { body, header, subheader } from "../../assets/style/typography";
import { neutral, primary } from "../../assets/style/colors";
import ChevronDownIcon from '../../assets/icons/angle-down.svg';
import ChevronUpIcon from '../../assets/icons/angle-up.svg';

type ListItemType = {
    title: string,
    createdAt: Date,
    duration: number,
    environment: string,
    description: string
    notes: string,
}

export const ListItem = ({ item }: { item: ListItemType }) => {
    const [expanded, setExpanded] = useState(false);
    const [count, setCount] = useState(0);

    const onItemPress = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        setCount(prevVal => prevVal + 1);
    }, [])

    const eventDate = item.createdAt;
    let options: any = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = eventDate.toLocaleDateString('en-US', options);

    return (
        <View style={styles.wrap}>
            <TouchableWithoutFeedback onPress={onItemPress}>
                <View style={styles.container}>
                    {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
                    <View style={styles.textContainer}>
                        <Text style={[subheader.x20, { color: neutral.s600 }]}>{formattedDate}</Text>
                    </View>
                    {expanded ? <ChevronUpIcon color={primary.s600} /> : <ChevronDownIcon color={primary.s600} />}

                </View>
            </TouchableWithoutFeedback>
            <CollapsableContainer expanded={expanded}>

                <View style={styles.detailsRow}>
                    <Text style={[body.x20, { color: neutral.s300 }]}>Duration</Text>
                    <Text style={[body.x20, { color: neutral.s600 }]}>{item.duration} mins</Text>
                </View>

                {item.description ? <View style={styles.detailsRow}>
                    <Text style={[body.x20, { color: neutral.s300 }]}>Description</Text>
                    <Text style={[body.x20, { color: neutral.s600 }]}>{item.description}</Text>
                </View> : <></>}
                
                {item.environment ? <View style={styles.detailsRow}>
                    <Text style={[body.x20, { color: neutral.s300 }]}>Environment</Text>
                    <Text style={[body.x20, { color: neutral.s600 }]}>{item.environment}</Text>
                </View> : <></>}
                

                <View style={styles.detailsRow}>
                    <Text style={[body.x10, { color: neutral.s300 }]}>Notes</Text>
                    {item.notes ?
                        <Text style={[body.x20, { color: neutral.s600 }]}>{item.notes}</Text>
                        :
                        <Text style={[body.x20, { color: neutral.s600 }]}>-</Text>
                    }
                </View>
            </CollapsableContainer>
        </View>
    );
};

const styles = StyleSheet.create({
    wrap: {
        borderColor: neutral.s100,
        borderWidth: 1,
        marginVertical: 6,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: "#fff",
        shadowColor: "#333",
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.05,
        width: '100%',
        flex: 1
    },
    container: { flexDirection: "row", justifyContent: 'space-between' },
    // image: { width: 50, height: 50, margin: 10, borderRadius: 12 },
    textContainer: { justifyContent: "space-around" },
    details: { margin: 10 },
    text: { opacity: 0.7 },
    detailsRow: {
        marginTop: 8,
        flex: 1,
        flexShrink: 1
    }
});