import moment from 'moment';
import { theme } from '../styles/Theme';

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
