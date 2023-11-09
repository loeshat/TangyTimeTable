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
 *   groupId: number,
 *   organiser: userId of organiser,
 *   name: string,
 *   description: string,
 *   decider: string (single or group),
 *   status: string (past, in progress or upcoming),
 *           - if event is still in planning, it is in progress
 *           - if the event's date is in the past, it is a past event
 *           - if the event's planning is completed, it is an upcoming event
 *   inputDates: array of dates in DD/MM/YYYY format for members to provide availabilities,
 *   eventDate: string (in DD/MM/YYYY format),
 *   startTime: string (in HH:MM format),
 *   endTime: string (in HH:MM format),
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
    let groupList = [];
    if (allGroups) {
      groupList = [...allGroups, newGroupData];
    } else {
      groupList = [newGroupData];
    }
    await AsyncStorage.setItem(GROUPS_KEY, JSON.stringify(groupList));
    return newGroupId;
  } catch (e) {
    console.log(`Failed to update groups list: ${e}`);
  }
}

/**
 * Retrieve all events of a given group
 * @param {*} groupId 
 */
export const getGroupEvents = async (groupId) => {
  try {
    const allEvents = await AsyncStorage.getItem(EVENTS_KEY);
    if (allEvents) {
      const groupEvents = JSON.parse(allEvents).filter((e) => e.groupId === groupId);
      return groupEvents;
    }
    return [];
  } catch (e) {
    console.log(`Failed to retrieve events for group ${groupId}: ${e}`);
  }
}

/**
 * Generate an ID for new event
 * @returns 
 */
export const getNewEventId = async () => {
  try {
    const allEvents = await AsyncStorage.getItem(EVENTS_KEY);
    if (allEvents) {
      return JSON.parse(allEvents).length;
    } else {
      return 0;
    }
  } catch (e) {
    console.log(`Failed to generate new event ID: ${e}`);
  }
}

/**
 * Save new group event to backend
 * @param {*} groupId 
 * @param {*} eventId 
 * @param {*} eventObj 
 */
export const addGroupEvent = async (groupId, eventId, eventObj) => {
  try {
    const allEvents = await AsyncStorage.getItem(EVENTS_KEY);
    const newEventData = {
      eventId,
      groupId,
      ...eventObj,
    };
    let newEventList = [];
    if (allEvents) {
      newEventList = [...allEvents, newEventData];
    } else {
      newEventList = [newEventData];
    }
    await AsyncStorage.setItem(EVENTS_KEY, JSON.stringify(newEventList));
  } catch (e) {
    console.log(`Failed to add new event: ${e}`);
  }
}

// FOR TESTING ONLY
export const clearEvents = async () => {
  await AsyncStorage.removeItem(EVENTS_KEY);
}

export const clearGroups = async () => {
  await AsyncStorage.removeItem(GROUPS_KEY);
}
