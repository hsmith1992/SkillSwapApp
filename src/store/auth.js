import { API } from "@/config";
import { signin, signout } from "@/utils/auth";
import * as ApplicationSettings from "application-settings";

export default {
  state: {
    //Current State
    user: null,
    token: null,
    status: null,
  },
  mutations: {
    signinRequest(state, data) {
      state.status = { signedIn: true };
      state.user = data.user;
      state.token = data.token;
    },
    signinSuccess(state, data) {
      state.status = { signedIn: true };
      state.user = data.user;
      state.token = data.token;
    },
    signinFailure(state) {
      state.status = {};
      state.user = null;
      state.token = null;
    },
    signout(state) {
      state.status = {};
      const storedToken = ApplicationSettings.getString("token");
      const storedUser = ApplicationSettings.getString("user");
      if (storedToken) {
        state.token = null;
        ApplicationSettings.remove("token");
      }
      if (storedUser) {
        state.user = null;
        ApplicationSettings.remove("user");
      }
    },

    loadFromStorage(state) {
      const storedToken = ApplicationSettings.getString("token");
      const storedUser = ApplicationSettings.getString("user");
      if (storedToken) {
        const token = JSON.parse(storedToken);
        state.token = token;
      }
      if (storedUser) {
        const user = JSON.parse(storedUser);
        state.user = user;
      }
    },
    clearToken(state) {
      const storedState = ApplicationSettings.getString("token");
      if (storedState) {
        state.token = null;
        ApplicationSettings.remove("token");
      }
    }
  },
  actions: {
    //Makes requests then commits mutations
    signin({ commit }, user) {
      commit("signinRequest", user);
      return signin(user).then(
        (user) => {
          commit("signinSuccess", user);
          ApplicationSettings.setString("token", JSON.stringify(user.token));
          ApplicationSettings.setString("user", JSON.stringify(user.user));
          return user;
        },
        (error) => {
          commit("signinFailure", error);
        }
      );
    },

    signout({ commit }, next) {
      signout(next);
      commit("signout");
    },
  },
  getters: {
    isAuth(state) {
      if (state.user && state.token) {
        return { user: state.user, token: state.token };
      } else {
        return false;
      }
    },
    isAdmin(state) {
      if (state.user && state.user.role === 1) {
        return { user: state.user, token: state.token }
      } else {
        return false;
      }
    }
  },
};
