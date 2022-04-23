import axios from "axios";

import { GET_MESSAGE_URL } from "../../constants/apiUrls";

// Get user goals
const getMessages = async (page, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page,
    },
  };

  const response = await axios.get(GET_MESSAGE_URL, config);

  return response.data;
};

const deleteMessage = async (messageId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(GET_MESSAGE_URL + messageId, config);

  return response.data;
};

const messageService = {
  getMessages,
  deleteMessage,
};

export default messageService;
