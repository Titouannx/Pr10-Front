import axios from "axios";
import { store } from '../store';

const API_URL = "http://localhost:3001/api/v1/user/";

const login = (email, password, rememberMe) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
        if (response.data.body) {
            if (rememberMe) {
                localStorage.setItem("user", JSON.stringify(response.data.body));
            }
            else sessionStorage.setItem("user", JSON.stringify(response.data.body));
      }

      return response.data;
    })
    .catch((error) => {
      console.error("Error: ", error);
      throw error;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  sessionStorage.removeItem("user");
};

const getCurrentUser = () => {
  let user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      user = JSON.parse(sessionStorage.getItem("user"));
    }
  return user;
};

const getUserProfile = () => {
    let user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      user = JSON.parse(sessionStorage.getItem("user"));
    }
  if (user && user.token) {
    return axios
      .post(API_URL + "profile", {}, { headers: { Authorization: 'Bearer ' + user.token } })
      .then((response) => {
        if (response.data.status === 200) {
          return response.data.body;
        } else {
          throw new Error(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
        throw error;
      });
  } else {
    throw new Error("No user logged in");
  }
};

const updateUserProfile = async ({ firstName, lastName }) => {
  try {
    let user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      user = JSON.parse(sessionStorage.getItem("user"));
    }
    const response = await axios.put(API_URL + "profile",
    { firstName, lastName },
    { headers: { Authorization: 'Bearer ' + user.token } })
    return response.data;
  } catch (error) {
    console.error("Error updating user profile: ", error);
    throw error;
  }
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
  getUserProfile,
  updateUserProfile,
}

export default AuthService;
