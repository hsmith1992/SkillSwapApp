import { API } from "@/config";
import axios from 'axios';

export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      return error;
    });
};

export const signin = (user) => {
  console.log("Gets to sign in", API)
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      return error;
    });
};

export const signout = (next) => {
  if (typeof window !== undefined) {
    next();
    fetch(`${API}/signout`, { method: "GET" })
      .then((response) => {
        console.log("signout", response);
      })
      .catch((error) => {
        return error;
      });
  }
};


export const isAuth = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
