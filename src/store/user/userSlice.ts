import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { IUser, UserRole } from "@types";
import { getIsAccountant } from "@utils/functions/getIsAccountant";
import {
  getRolesFromStorage,
  hasRole,
  roles2string,
} from "@utils/functions/roles";

const roles = getRolesFromStorage();

const id = localStorage.getItem("id");

const initialState: IUser = {
  id: id ? parseInt(id) : undefined,
  roles,
  isAnonymous: roles.length == 0,
  isClient: hasRole(roles, UserRole.client),
  isSite: hasRole(roles, UserRole.site),
  isEmployee: hasRole(roles, UserRole.employee),
  token: localStorage.getItem("token") ?? undefined,
  name: localStorage.getItem("name") ?? undefined,
  email: localStorage.getItem("email") ?? undefined,
  companies: JSON.parse(localStorage.getItem("companies") || "[]"),
  isAccountant: getIsAccountant(
    JSON.parse(localStorage.getItem("companies") || "[]"),
  ),
};

const _setUser = (state: Draft<IUser>, action: PayloadAction<IUser>) => {
  const payload = action.payload;

  state.id = payload.id;
  state.roles = payload.roles;
  state.isAnonymous = payload.isAnonymous;
  state.isClient = payload.isClient;
  state.isSite = payload.isSite;
  state.companies = payload.companies;
  state.email = payload.email;
  state.name = payload.name;
  state.token = payload.token;

  payload.id
    ? localStorage.setItem("id", payload.id.toString())
    : localStorage.removeItem("id");
  localStorage.setItem("role", roles2string(payload.roles));
  payload.token
    ? localStorage.setItem("token", payload.token)
    : localStorage.removeItem("token");
  payload.companies
    ? localStorage.setItem("companies", JSON.stringify(payload.companies))
    : localStorage.removeItem("companies");
  payload.email
    ? localStorage.setItem("email", payload.email)
    : localStorage.removeItem("email");
  payload.name
    ? localStorage.setItem("name", payload.name)
    : localStorage.removeItem("name");
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: _setUser,
    changeToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    changeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      localStorage.setItem("name", action.payload);
    },
    resetUser: (state) => {
      _setUser(state, {
        payload: {
          roles: [],
          isAnonymous: true,
          isClient: false,
          isSite: false,
          isEmployee: false,
          isAccountant: false,
        },
        type: "RESET_USER",
      });
    },
  },
});

export const { setUser, resetUser, changeName, changeToken } =
  userSlice.actions;

export default userSlice.reducer;
