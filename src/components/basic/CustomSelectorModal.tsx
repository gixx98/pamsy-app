// CustomSelector.tsx
import React, { ReactNode } from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { neutral } from '../../assets/style/colors';
import { subheader } from '../../assets/style/typography';
import Cancel from '../../assets/icons/cancel.svg';

interface CustomSelectorModalProps {
    headerLabel: string,
    // onSelect: (selectedOption: string) => void;
    modalVisible: boolean;
    closeModal: () => void;
    children: ReactNode;

}

const CustomSelectorModal: React.FC<CustomSelectorModalProps> = ({ modalVisible, closeModal, headerLabel, children }) => {
    const handleSelect = (selectedOption: string) => {
        closeModal();
        // onSelect(selectedOption);
    };

    return (
        <Modal visible={modalVisible} animationType="fade" style={{ margin: 0 }} transparent={true}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={[subheader.x20, { color: neutral.s800 }]}>{headerLabel}</Text>
                        <TouchableOpacity onPress={closeModal}>
                            <Cancel color={neutral.s800} width={24} height={24} />
                        </TouchableOpacity>
                    </View>
                    <View>

                        {children}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#00000030'
    },

    content: {
        width: Dimensions.get('screen').width - 32,
        marginHorizontal: 8,
        marginBottom: 32,
        borderWidth: 1,
        borderColor: neutral.s200,
        borderRadius: 20,
        backgroundColor: '#FFF',
        padding: 16,
        shadowColor: '#21521',
        shadowOffset: { width: -2, height: 0 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },

    header: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    }
})

export default CustomSelectorModal;
