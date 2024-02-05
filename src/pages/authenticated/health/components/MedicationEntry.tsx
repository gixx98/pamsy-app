import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { neutral } from '../../../../assets/style/colors';
import { body, subheader } from '../../../../assets/style/typography';

interface MedicationEntryProps {
  name: string;
  type: string;
  frequency: string;
  treatment: string;
}

const MedicationEntry: React.FC<MedicationEntryProps> = ({
  name,
  type,
  frequency,
  treatment,
}) => {
  const icon = type === 'Vitamin' ? '🍏' : '💊';

  return (
    <TouchableOpacity style={[styles.container]}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={[body.x10, { color: neutral.s400 }]}>{treatment}</Text>
        <Text style={[subheader.x20, { color: neutral.s800 }]}>{name}</Text>
      </View>
      <View style={styles.frequencyContainer}>
        <Text style={styles.frequency}>{frequency}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 8,
    borderBottomColor: '#f0f0f0',
  },

  iconContainer: {
    backgroundColor: "#f6f6f6",
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    borderRadius: 10,

  },
  icon: {
    fontSize: 16,
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },

  treatment: {
    fontSize: 14,
    color: '#666666',
  },
  frequencyContainer: {},
  frequency: {
    fontSize: 14,
    color: '#666666',
  },
});

export default MedicationEntry;
