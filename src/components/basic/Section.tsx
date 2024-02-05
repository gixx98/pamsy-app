import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import { subheader } from '../../assets/style/typography';
import { neutral } from '../../assets/style/colors';

interface SectionProps {
    title?: string;
    children: ReactNode;
  }

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <View style={styles.container}>
      {title && <Text style={[subheader.x30, { color: neutral.s800 }]}>{title}</Text>}
      <View style={styles.content}>{children}</View>
    </View>
  )
}

export default Section

const styles = StyleSheet.create({
    container: {
        gap: 8,
        flexDirection: 'column',
        marginTop: 12,
        marginHorizontal: 16,
    },

    content: {
        backgroundColor: "#FFF",
        padding: 16,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: neutral.s100
    }
})