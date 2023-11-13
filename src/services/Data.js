import moment from 'moment';

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

export const dateOptions = [
  {
    date: today.add(5, 'days').format('YYYY-MM-DD'),
    startTime: '9:00 am',
    endTime: '12:00 pm',
  },
  {
    date: today.add(2, 'days').format('YYYY-MM-DD'),
    startTime: '12:00 pm',
    endTime: '4:00 pm',
  },
  {
    date: today.add(7, 'days').format('YYYY-MM-DD'),
    startTime: '5:00 pm',
    endTime: '9:00 pm',
  },
  {
    date: today.add(4, 'days').format('YYYY-MM-DD'),
    startTime: '4:00 pm',
    endTime: '8:00 pm',
  },
];

export const activityOptions = [
  {
    type: 'Indoor Futsal',
    icon: '',
    votesNum: 2,
    other: {
      image: '',
      groupSize: '8 - 12',
      price: '$$$',
      nearby: 'Tangy recommends playing futsal at the All Sorts Indoor Sports Centre in Rosebery to leverage group and student discounts!',
    },
  },
  {
    type: 'Hiking',
    icon: '',
    votesNum: 1,
    other: {
      image: '',
      groupSize: '3 - 6',
      price: 'Free',
      nearby: 'Tangy recommends exploring hiking routes in the Blue Mountains',
    },
  },
  {
    type: 'Board Games',
    icon: '',
    votesNum: 0,
    other: {
      image: '',
      groupSize: '5 - 10',
      price: '$',
      nearby: 'Tangy recommends Double Kill Games Cafe in Haymarket',
    },
  },
  {
    type: 'Movie Night',
    icon: '',
    votesNum: 0,
    other: {
      image: '',
      groupSize: '3 - 6',
      price: '$',
      nearby: 'Tangy recommends watching movies at Events Cinema George Street, which is a central location for your group',
    },
  },
];
