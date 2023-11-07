import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = '@tangy_users';
const EVENTS_KEY = '@tangy_events';
const GROUPS_KEY = '@tangy_groups';

/**
 * Data Types Explanation:
 * Users Struct:
 * {
 *   userId: number,
 *   email: string,
 *   password: string,
 *   image: string (to be used as uri for React Native Image component)
 * }
 * 
 * Events Struct:
 * {
 *   eventId: number,
 *   name: string,
 *   description: string,
 * }
 * 
 * Groups Struct:
 * {
 *   groupId: number,
 *   name: string,
 *   members: array of userId's
 * }
 */

/**
 * Retrieve all users that exist in the TangyTimeTable database
 * @returns 
 */
export const getAllUsers = async () => {
  try {
    const users = await AsyncStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch (e) {
    console.log(`Failed to retrieve TangyTimeTable users: ${e}`);
  }
}

/**
 * Retrieve all groups that the logged in user is a part of
 * @param {*} userId 
 * @returns 
 */
export const getAllGroups = async (userId) => {
  try {
    const allGroups = await AsyncStorage.getItem(GROUPS_KEY);
    if (allGroups) {
      const userGroups = JSON.parse(allGroups).filter((group) => group.members.includes(userId));
      return userGroups;
    }
    return []; // User is not a part of any groups on TangyTimeTable
  } catch (e) {
    console.log(`Failed to retrieve groups on TangyTimeTable: ${e}`);
  }
}

/**
 * Adds a new group to the TangyTimeTable database
 * @param {Object} groupObj 
 */
export const addGroup = async (groupObj) => {
  try {
    const allGroups = await AsyncStorage.getItem(GROUPS_KEY);
    const newGroupId = allGroups ? JSON.parse(allGroups).length : 0;
    const newGroupData = {
      groupId: newGroupId,
      name: groupObj.name,
      members: groupObj.members,
    };
    await AsyncStorage.setItem(GROUPS_KEY, [...allGroups, newGroupData]);
  } catch (e) {
    console.log(`Failed to update groups list: ${e}`);
  }
}

