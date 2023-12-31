import moment from 'moment';
import { theme } from '../styles/Theme';

// This file contains all relevant hard-coded data
// Hard-coded friends list to be displayed for all users
export const FriendsList = [
  {
    name: 'Sam Nguyen',
    image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    userId: 0,
  },
  {
    name: 'Tom Brown',
    image: 'https://cdn-icons-png.flaticon.com/512/4975/4975733.png',
    userId: 1,
  },
  {
    name: 'Emily Parker',
    image: 'https://cdn-icons-png.flaticon.com/512/6833/6833605.png',
    userId: 2,
  },
  {
    name: 'Jake Tomson',
    image: 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp',
    userId: 3,
  },
  {
    name: 'Susan Ko',
    image: 'https://www.shareicon.net/data/512x512/2016/09/15/829453_user_512x512.png',
    userId: 4,
  }
];

// Default activity categories for activity category selection in event planning
export const ActivityCategories = [
  {
    label: 'Dining Out / Eating',
    value: 'Dining',
  },
  {
    label: 'Outdoor Recreation',
    value: 'Outdoor Recreation',
  },
  {
    label: 'Fitness & Wellness',
    value: 'Fitness & Wellness',
  },
  {
    label: 'Entertainment',
    value: 'Entertainment',
  },
  {
    label: 'Meeting / Networking',
    value: 'Work',
  },
  {
    label: 'Other',
    value: 'Other',
  },
];

// Hard-coded dates and schedules for event time selection and
// "View in Calendar" option
const today = moment();
const date1 = today.add(2, 'days').format('YYYY-MM-DD');
const date2 = today.add(4, 'days').format('YYYY-MM-DD');
const date3 = today.add(5, 'days').format('YYYY-MM-DD');
const date4 = today.add(7, 'days').format('YYYY-MM-DD');

export const calendarDisplay = {
  [date1]: [
    {
      start: `${date1} 09:00:00`,
      end: `${date1} 11:00:00`,
      title: 'Accounting Tutorial',
      color: theme.colors.success,
    },
    {
      start: `${date1} 12:00:00`,
      end: `${date1} 16:00:00`,
      title: 'Your Potential Hangout',
      color: theme.colors.primary,
    },
  ],
  [date2]: [
    {
      start: `${date2} 14:00:00`,
      end: `${date2} 16:00:00`,
      title: 'Oztag Practice',
      color: theme.colors.success,
    },
    {
      start: `${date2} 16:00:00`,
      end: `${date2} 19:00:00`,
      title: 'Oztag Group Dinner',
      color: theme.colors.success,
    },
    {
      start: `${date2} 16:00:00`,
      end: `${date2} 20:00:00`,
      title: 'Your Potential Hangout',
      color: theme.colors.primary,
    },
  ],
  [date3]: [
    {
      start: `${date3} 09:00:00`,
      end: `${date3} 12:00:00`,
      title: 'Your Potential Hangout',
      color: theme.colors.primary,
    },
  ],
  [date4]: [
    {
      start: `${date4} 17:00:00`,
      end: `${date4} 21:00:00`,
      title: 'Your Potential Hangout',
      color: theme.colors.primary,
    },
  ],
};

// Hard-coded date options for event finalisation
export const dateOptions = [
  {
    date: date1,
    startTime: '12:00 pm',
    endTime: '4:00 pm',
  },
  {
    date: date2,
    startTime: '4:00 pm',
    endTime: '8:00 pm',
  },
  {
    date: date3,
    startTime: '9:00 am',
    endTime: '12:00 pm',
  },
  {
    date: date4,
    startTime: '5:00 pm',
    endTime: '9:00 pm',
  },
];

// Hard-coded activity options for event finalisation
export const activityOptions = [
  {
    type: 'Indoor Futsal',
    icon: 'football',
    votesNum: 2,
    other: {
      image: 'https://www.topendsports.com/sport/soccer/images/soccer-indoor-boys-pixabay.jpg',
      groupSize: '8 - 12',
      price: '$$$',
      nearby: 'Tangy recommends playing futsal at the All Sorts Indoor Sports Centre in Rosebery to leverage group and student discounts!',
    },
  },
  {
    type: 'Hiking',
    icon: 'image-filter-hdr',
    votesNum: 1,
    other: {
      image: 'https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/topic_centers/2019-8/couple-hiking-mountain-climbing-1296x728-header.jpg?w=1155&h=1528',
      groupSize: '3 - 6',
      price: 'Free',
      nearby: 'Tangy recommends exploring hiking routes in the Blue Mountains!',
    },
  },
  {
    type: 'Board Games',
    icon: 'gamepad-variant-outline',
    votesNum: 0,
    other: {
      image: 'https://media.timeout.com/images/105627949/750/422/image.jpg',
      groupSize: '5 - 10',
      price: '$',
      nearby: 'Tangy recommends Double Kill Games Cafe in Haymarket!',
    },
  },
  {
    type: 'Movie Night',
    icon: 'movie-open',
    votesNum: 0,
    other: {
      image: 'https://hips.hearstapps.com/hmg-prod/images/movie-night-ideas-1608824743.jpg',
      groupSize: '3 - 6',
      price: '$',
      nearby: 'Tangy recommends watching movies at Events Cinema George Street, which is a central location for your group!',
    },
  },
];

// Hard-coded location options for event finalisation
export const locationOptions = [
  {
    name: 'All Sorts Indoor Sports Centre',
    rating: 4.2,
    numReviews: 205,
    suburb: 'Rosebery NSW',
    image: 'https://fastly.4sqi.net/img/general/600x600/381188561_0og2tHiPFwvX9dkuqxnn9iRJlvP4x6zZwKf0LVjWhkI.jpg',
    other: {
      address: '12-20 Rosebery Ave, Rosebery NSW 2018',
      hours: '6am - 8pm',
      phone: '(02) 9469 5654',
      website: 'https://allsortsfitness.com.au/indoor-sports/sports/',
    },
  },
  {
    name: 'Sportsworld Indoor Peakhurst',
    rating: 4.3,
    numReviews: 109,
    suburb: 'Peakhurst NSW',
    image: 'https://www.sportsworldindoor.com.au/wp-content/uploads/2020/06/soccer-1-768x512.jpg',
    other: {
      address: '1/707 Forest Rd, Peakhurst NSW 2210',
      hours: '11am - 9pm',
      phone: '(02) 9534 3100',
      website: 'https://www.sportsworldindoor.com.au/',
    },
  },
  {
    name: 'Morris Iemma Indoor Sports Centre',
    rating: 4.1,
    numReviews: 107,
    suburb: 'Riverwood NSW',
    image: 'https://cbcity.nsw.gov.au/MIISC%20Slider/casual%20shooting%20picture.jpg?RenditionID=5',
    other: {
      address: '150 Belmore Rd North, Riverwood NSW 2210',
      hours: '9am - 10pm',
      phone: '(02) 9153 0441',
      website: 'https://www.cbcity.nsw.gov.au/miisc',
    },
  },
];

// Default group that all users will be a part of
// This is so that we can set up default events
export const defaultGroup = {
  groupId: 0,
  name: 'Zestee Bestees',
  members: [0, 1, 2, 3, 4],
}

// Default event options for full event planning flow demonstration
// Any planning progress made towards these events will not be saved
export const defaultEvents = [
  {
    eventId: 0,
    groupId: 0,
    organiser: null, // whoever the logged in user is would be the owner
    name: 'Monthly Catchup',
    description: 'Casual hangout and catchups',
    decider: 'group',
    status: 'in progress for finalisation',
    finalisationStage: 0,
    eventDate: null,
    activity: null,
    location: null,
  }, 
  {
    eventId: 1,
    groupId: 0,
    organiser: null,
    name: 'Sports Day',
    description: 'One-off Sports Hangout',
    decider: 'group',
    status: 'in progress for finalisation',
    finalisationStage: 2,
    eventDate: 0, // index from dateOptions array
    activity: 'Indoor Futsal',
    location: null,
  },
  {
    eventId: 2,
    groupId: 0,
    organiser: 0,
    name: 'Futsal Practice',
    description: 'Practice for UniGames',
    decider: 'single',
    status: 'in progress for finalisation',
    finalisationStage: 3,
    eventDate: 1, // index from dateOptions array
    activity: 'Indoor Futsal',
    location: 0, // index from locationOptions array
  },
];
