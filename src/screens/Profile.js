import React from 'react';
import { theme } from '../styles/Theme';
import { View, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { PaperProvider, Text, Button, Avatar } from 'react-native-paper';
import ProfileTitleTopBar from '../components/ProfileTitleTopBar';
import { signOutRequest } from '../services/StoreService';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { loginStyles } from '../styles/LoginStyles';
import { getCurrentUserData } from '../services/StoreService';

/**
 * Profile Screen displaying user profile picture and general user details
 * Also contains Settings button, leading to Settings screen display
 * @param {*} navigation
 * @returns
 */
const Profile = ({ navigation }) => {
	const [name, setName] = React.useState(null);

	React.useEffect(() => {
		const fetchName = async () => {
			try {
				const currUser = await getCurrentUserData();
				if (currUser) setName(currUser.name);
			} catch (err) {
				console.error(err);
			}
		};
		fetchName();
	}, []);

	const handleSignOut = async () => {
		const success = await signOutRequest();
		if (success) {
			// log out successful, navigate to the landing page
			navigation.navigate('LoginRoutes', { screen: 'Landing' });
		} else {
			console.error('Could not log out');
		}
	};

	return (
		<PaperProvider theme={theme}>
			<ProfileTitleTopBar navigation={navigation} />
			<View
				style={{
					alignItems: 'center',
					backgroundColor: '#FFFFFF',
					height: '88%',
				}}
			>
				<View style={{ padding: 20, width: '90%' }}>
					<Avatar.Image
						size={150}
						style={{
							backgroundColor: '#FFFFFF',
							marginBottom: 20,
							alignSelf: 'center',
						}}
						source={{
							uri: 'https://img.freepik.com/premium-photo/3d-character-male-cartoon-with-square-pattern-red-black-flanel-good-profile-picture_477250-9.jpg',
						}}
					/>
					{name && (
						<Text style={[loginStyles.title, { textAlign: 'center' }]}>
							{name}
						</Text>
					)}
					<Button
						mode='contained'
						style={{
							width: '40%',
							backgroundColor: '#7ac1a9',
							alignSelf: 'center',
						}}
						onPress={() =>
							Alert.alert('Warning', 'This feature is not implemented yet!')
						}
					>
						Edit Profile
					</Button>
					<TouchableOpacity
						style={styles.container}
						onPress={() =>
							navigation.navigate('SettingsRoutes', {
								screen: 'ChangeConnectedAccounts',
							})
						}
					>
						<Text style={styles.text}>Connected Accounts </Text>
						<View style={{ flexDirection: 'row', gap: 20 }}>
							<Image
								source={require('../assets/google.png')}
								style={{
									height: 25,
									width: 25,
								}}
							/>
							<Image
								source={require('../assets/facebook.png')}
								style={{
									height: 25,
									width: 25,
								}}
							/>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.container}
						onPress={() =>
							navigation.navigate('GroupRoutes', { screen: 'Add Friends' })
						}
					>
						<View style={{ flexDirection: 'row', gap: 20 }}>
							<MaterialCommunityIcons
								name='account-multiple-plus'
								size={24}
								color='#5E412F'
							/>
							<Text style={styles.text}>Invite Friends</Text>
						</View>
						<MaterialCommunityIcons
							name='arrow-right'
							size={24}
							color='#5E412F'
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.container}
						onPress={() => alert('This feature is not available yet!')}
					>
						<View style={{ flexDirection: 'row', gap: 20 }}>
							<MaterialCommunityIcons name='home' size={24} color='#5E412F' />
							<Text style={styles.text}>Homebush, Sydney</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.container}
						onPress={() => alert('This feature is not available yet!')}
					>
						<View style={{ flexDirection: 'row', gap: 20 }}>
							<MaterialCommunityIcons name='map' size={24} color='#5E412F' />
							<Text style={styles.text}>Interests</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.container,
							{ backgroundColor: '#7ac1a9', justifyContent: 'center' },
						]}
						onPress={handleSignOut}
					>
						<Text style={{ alignSelf: 'center', color: 'white', fontSize: 18 }}>
							Sign Out
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</PaperProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 20,
		marginVertical: 10,
		backgroundColor: theme.colors.background,
		borderRadius: 10,
	},
	text: {
		fontSize: 18,
		color: theme.colors.text,
	},
});

export default Profile;
