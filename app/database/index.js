const database = [];

export const addData = ({ chatId, message }) => {
  const index = database.findIndex(({ chatId: id }) => id === chatId);
  if (index == -1) {
    database.push({ chatId, chatList: [message] });
  } else {
    database[index].chatList.push(message);
  }
};

export const getDatabase = () => database;
