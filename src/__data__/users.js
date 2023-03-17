import userStatus from '@/enums/user-status';

const usersData = [
  {
    username: 'muser1',
    password: 'mpassword1',
    status: userStatus.active,
  },
  {
    username: 'muser2',
    password: 'mpassword2',
    status: userStatus.active,
  },
  {
    username: 'muser3',
    password: 'mpassword3',
    status: userStatus.blocked,
  },
];

export default usersData;
