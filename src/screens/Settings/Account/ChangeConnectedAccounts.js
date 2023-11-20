import React, { useState } from 'react';
import TitleTopBar from "../../../components/TitleTopBar";
import { PaperProvider } from "react-native-paper";
import { theme } from "../../../styles/Theme";
import { Text, Pressable, View, Modal, StyleSheet, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";


const ChangeConnectedAccounts = ({ navigation }) => {
    const [connectedAccounts, setConnectedAccounts] = useState([
        { name: 'Google', logo: require('../../../assets/google.png'), color: 'rgba(41,134,204, 0.5)' },
        { name: 'Facebook', logo: require('../../../assets/facebook.png'), color: 'rgba(59, 89, 152, 0.5)' },
    ]);
    const [selectedAccount, setSelectedAccount] = useState('');
    const [isAddModalVisible, setAddModalVisible] = useState(false);

    const addAccount = () => {
        if (selectedAccount && !connectedAccounts.find((acc) => acc.name === selectedAccount)) {
          const newAccount = { name: selectedAccount, logo: require('../../../assets/think.png'), color: 'rgba(255, 131, 0, 0.5)' };
          setConnectedAccounts((prevAccounts) => [...prevAccounts, newAccount]);
          setAddModalVisible(false);
        }
      };

    const deleteAccount = (account) => {
        setConnectedAccounts((prevAccounts) => prevAccounts.filter((acc) => acc.name !== account.name));
    };

    const isAddButtonDisabled = selectedAccount === '';

    return (
        <PaperProvider theme={theme}>
          <TitleTopBar
            backAction={() => navigation.navigate('Settings')}
            title={'Return to Settings'}
          />
    
          <View style={styles.container}>
            <Text style={styles.title}>Connected Accounts</Text>
            <View style={styles.accountList}>
                {connectedAccounts.map((account) => (
                    <View key={account.name} style={[styles.accountItem, { backgroundColor: account.color }]}>
                        <Image source={account.logo} style={styles.accountLogo} />
                        <Text style={styles.accountName}>{account.name}</Text>
                        <Pressable onPress={() => deleteAccount(account)} style={styles.deleteButton}>
                            <Text style={styles.deleteButtonText}>Delete</Text>
                        </Pressable>
                    </View>
                ))}
            </View>
            <Pressable style={styles.addButton} onPress={() => setAddModalVisible(true)}>
                <Text style={styles.addButtonText}>Add Account</Text>
            </Pressable>

            <Modal
              visible={isAddModalVisible}
              transparent={true}
              animationType="fade"
              onRequestClose={() => setAddModalVisible(false)}
              style={styles.modal}
            >
              <View style={styles.modalContainer}>
                <Picker
                  selectedValue={selectedAccount}
                  style={styles.picker}
                  onValueChange={(itemValue) => setSelectedAccount(itemValue)}
                >
                    <Picker.Item label="Select Account" value="" />
                    <Picker.Item label="Twitter" value="Twitter" />
                    <Picker.Item label="LinkedIn" value="LinkedIn" />
                </Picker>
                <View style={styles.modalButtonContainer}>
                  <Pressable
                    style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, styles.addButtonModal, { backgroundColor: isAddButtonDisabled ? theme.colors.disabled : theme.colors.success }]}
                    onPress={addAccount}
                    disabled={isAddButtonDisabled}
                  >
                    <Text style={styles.addButtonText}>Add</Text>
                  </Pressable>
                  <Pressable
                    style={styles.cancelButtonModal}
                    onPress={() => setAddModalVisible(false)}
                  >
                    <Text style={styles.addButtonText}>Cancel</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
        </PaperProvider>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        padding: 20,
        flex: 6,
      },
      title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 16,
        padding: 10,
        color: theme.colors.text,
      },
      accountList: {
        marginBottom: 20,
      },
      accountItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        borderRadius: 8,
      },
      accountLogo: {
        width: 30,
        height: 30,
        marginRight: 10,
      },
      accountName: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
      },
      deleteButton: {
        backgroundColor: '#E14818',
        padding: 10,
        borderRadius: 5,
      },
      deleteButtonText: {
        color: 'white',
      },
      addButton: {
        backgroundColor: theme.colors.success,
        padding: 10,
        alignItems: 'center',
        borderRadius: 30,
      },
      addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold",
        padding: 5,
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      picker: {
        width: '80%',
        backgroundColor: theme.colors.background,
        marginBottom: 20,
        borderRadius: 20,
      },
      modalButtonContainer:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },
      addButtonModal: {
        backgroundColor: theme.colors.success,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        paddingHorizontal: 20,
        marginHorizontal: 20,
      },
      cancelButtonModal: {
        backgroundColor: theme.colors.disabled,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 7,
      },
    });
    
    export default ChangeConnectedAccounts;