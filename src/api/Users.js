// eslint-disable-next-line import/no-extraneous-dependencies
import axios from '../utils/axios';
import { API_URL } from '../config-global';

// GET all users

export const AllUsers = async () => {
  try {
    const users = await axios.get(`${API_URL}/users/all-users`);
    return users;
  } catch (err) {
    console.log(err);
    return err;
  }
};
