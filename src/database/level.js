import users from '@/__data__/users';

const { Level } = require('level');

const connectToDatabase = async () => {
  const options = { valueEncoding: 'json' };
  const db = new Level('database', options);
  const usersToBatch = [];

  users.map((user, index) => {
    usersToBatch.push({
      type: 'put',
      sublevel: db,
      key: user.username,
      value: {
        id: index,
        username: user.username,
        password: user.password,
        status: user.status,
      },
    });
  });

  await db.batch(usersToBatch);
  return db;
};

export default connectToDatabase;
