import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Unchecked from '../assets/icons/check-circle.svg'
import Checked from '../assets/icons/check_circle_checked.svg'
import { body } from '../assets/style/typography';
import { neutral, primary } from '../assets/style/colors';

interface Reminder {
    id: string;
    name: string;
    category: string;
    isChecked: boolean;
    date: {
        nanoseconds: number;
        seconds: number;
    };
    recurring?: {
        frequency: string;
        days: string[];
    } | null;
}

interface ReminderListProps {
    reminders: Reminder[]
}



const Reminders: React.FC<ReminderListProps> = ({ reminders }) => {

    const [reminderList, setReminderList] = useState(reminders);

    const handleCheck = (id: string) => {
        const updatedReminders = reminderList.map(reminder => {
            if (reminder.id === id) {
                return { ...reminder, isChecked: !reminder.isChecked }
            }
            return reminder;
        });
        setReminderList(updatedReminders);
    }

    const renderItem = ({ item }: { item: Reminder }) => (

        <View style={[styles.container]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <TouchableOpacity onPress={() => handleCheck(item.id)}>
                    {item.isChecked ? <Checked color={primary.s600} /> : <Unchecked color={primary.s600} />}

                </TouchableOpacity>
                <View style={{}}>
                    <Text style={[body.x10, { fontSize: 12, lineHeight: 16, color: neutral.s400 }]}>{item.name}</Text>
                    <Text style={[body.x20, { color: neutral.s800, lineHeight: 20 }]}>{item.category}</Text>
                </View>
            </View>


            <Text>{new Date(item.date.seconds * 1000 + item.date.nanoseconds / 1e6).toLocaleString()}</Text>
            {/* {item.recurring && (
                <Text>
                    Recurring: {item.recurring.frequency} {item.recurring.days.length > 0 ? `on ${item.recurring.days.join(', ')}` : ''}
                </Text>
            )} */}
        </View>
    );
    return (
        <FlatList
            data={reminderList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
    )
}

export default Reminders

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },


})