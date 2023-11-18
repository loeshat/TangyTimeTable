import React, { useState, useEffect } from 'react';
import { theme } from '../../styles/Theme';
import { PaperProvider, Text, Snackbar } from 'react-native-paper';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import TitleTopBar from '../../components/TitleTopBar';
import FriendDisplayCard from '../../components/FriendDisplayCard';
import { FriendsList } from '../../services/Data';
import FriendCard from '../../components/FriendCard';



const AddFriends = ({ route, navigation }) => {

  // Friend selection state handling
  const initialStates = Array.from({ length: FriendsList.length }, () => false);
  const [friendStates, setFriendStates] = useState(initialStates);
  const [confirmDisabled, setDisabled] = useState(true);
  const handleFriendChange = (id, newState) => {
    if (newState) setVisibleAlert(true); // feedback to user that they added friends to group successfully
    const newStates = [...friendStates];
    newStates[id] = newState;
    setFriendStates(newStates);
    setDisabled(!newStates.some((state) => state === true));
  }

  // Friends Added alert controls
  const [visibleAlert, setVisibleAlert] = useState(false);

	return (
		<PaperProvider theme={theme}>
            <View style={styles.page}>
                {/* <TitleTopBar
                    backAction={() => navigation.navigate('Friends')}
                    title={'See All Groups'}
                /> */}
                <View style={styles.container1}>
                    <Text style={styles.title}>
                        Add Friends
                    </Text>
                </View>

                <View style={styles.container2}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Friends')}
                    >
                        <Text style={styles.buttonText}> Back </Text>
                    </TouchableOpacity>
                    <Text style={styles.text}>
                        Send to
                    </Text>
                    <TouchableOpacity
                        
                        onPress={() => {
                            alert('Friend request(s) sent!')
                            navigation.navigate('Friends')
                        }}
                    >
                        <Text style={styles.buttonText}> Add </Text>
                    </TouchableOpacity>
                    
                </View>
                <View style={styles.inviteContainer}>
                    <Text style={styles.bodyText}>
                        Join me on TangyTimeTable!
                    </Text>
                    <Text>
                        www.tangytimetable.com
                    </Text>
                </View>
                <ScrollView
                    style={{
                    display: 'inline-flex',
                    height: 300,
                    marginLeft: 20,
                    marginRight: 20,
                    }}
                >
                    {
                    FriendsList.map((item, index) => (
                    <FriendCard 
                        key={index}
                        name={item.name}
                        image={item.image}
                        isCheckbox={true}
                        onChange={(newState) => handleFriendChange(index, newState)}
                    />
                    ))
                }
                </ScrollView>
            </View>
		</PaperProvider>
	);
};

export default AddFriends;

const styles = StyleSheet.create({
	container1: {
		alignItems: 'center',
        paddingTop: 90,
        paddingBottom: 30,
	},
    container2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
    },
	title: {
		color: theme.colors.text,
		fontSize: 26,
		fontWeight: '700',
	},
    text: {
        color: theme.colors.text,
        fontSize: 18,
        fontWeight: '500',
    },
    buttonText: {
        color: '#79C1A9',
        fontSize: 18,
        fontWeight: '500',
    },
    inviteContainer: {
        backgroundColor: 'lightgrey',
        padding: 20,
        borderRadius: 15,
        margin: 20,
    },
    bodyText: {
        fontSize: 18, 
        paddingBottom: 15,
    },
    page: {
        flex: 1,
        backgroundColor: 'white',
    }
  
});
