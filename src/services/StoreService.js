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
 *   inputDates: array of dates in YYYY-MM-DD format for members to provide availabilities,
 *   inputStartTime: string (in HH:MM format),
 *   inputEndTime: string (in HH:MM format),
 *   activity: string,
 *   location: string,
 *   eventDate: string (in YYYY-MM-DD format),
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
 * Create a new group and add it to the database
 * @param {Object} groupObj 
 * @returns 
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
 * Adds a new event to given group
 * @param {*} groupId 
 * @param {*} eventObj 
 * @returns ID of new event
 */
export const addGroupEvent = async (groupId, eventObj) => {
  try {
    const allEvents = await AsyncStorage.getItem(EVENTS_KEY);
    const newEventId = allEvents ? JSON.parse(allEvents).length : 0;
    const newEventData = {
      eventId: newEventId,
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
    return newEventId;
  } catch (e) {
    console.log(`Failed to add new event: ${e}`);
  }
}

/**
 * Update the event of given ID with additional details
 * Event details previously added will still stay the same
 * @param {*} eventId 
 * @param {*} eventObj 
 */
export const updateEventDetails = async (eventId, eventObj) => {
  try {
    const allEvents = await AsyncStorage.getItem(EVENTS_KEY);
    if (allEvents) {
      const eventsArray = JSON.parse(allEvents);
      const idToUpdate = eventsArray.findIndex(e => e.eventId === eventId);
      if (idToUpdate !== -1) {
        eventsArray[idToUpdate] = { ...eventsArray[idToUpdate], ...eventObj };
        console.log(eventsArray); // for testing only
        await AsyncStorage.setItem(EVENTS_KEY, JSON.stringify(eventsArray));
      }
    }
  } catch (e) {
    console.log(`Failed to update details for event ${eventId}: ${e}`);
  }
}

/**
 * Retrieve details about an event of given ID
 * @param {*} eventId 
 * @returns 
 */
export const getEvent = async (eventId) => {
  try {
    const allEvents = await AsyncStorage.getItem(EVENTS_KEY);
    if (allEvents) {
      const eventsArray = JSON.parse(allEvents);
      const eventMatch = eventsArray.filter(e => e.eventId === eventId);
      console.log(eventMatch[0]); // for testing only
      return eventMatch[0];
    }
    return [];
  } catch (e) {
    console.log(`Failed to get event details for event ${eventId}: ${e}`);
  }
}

/**
 * Retrieve a user's profile details in the TangyTimeTable database
 * @param {*} userId
 * @returns {*} userObj
*/
export const getProfile = async (userId) => {
  try {
    const allUsers = await AsyncStorage.getItem(USERS_KEY);
    if (allUsers) {
      const usersArray = JSON.parse(allUsers);
      const userMatch = usersArray.filter(u => u.userId === userId);
      console.log(userMatch[0]); // for testing
      return userMatch[0];
    }
    return [];
  } catch (e) {
    console.log(`Failed to get user details for the profile ${userId}: ${u}`);
  }
}

// FOR TESTING ONLY
export const clearEvents = async () => {
  await AsyncStorage.removeItem(EVENTS_KEY);
}

export const clearGroups = async () => {
  await AsyncStorage.removeItem(GROUPS_KEY);
}
