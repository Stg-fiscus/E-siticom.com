import { UserRole } from "@types";

interface ResponseRole {
  id: number;
  name: string;
}

const role2enum = (role: ResponseRole) => {
  switch (role.id) {
    case 4:
      return UserRole.client;
    default:
      return UserRole.site;
  }
};

export const getRolesFromResponse = (roles: ResponseRole[]) => {
  return roles.map(role2enum);
};

export const getRolesFromStorage = () => {
  if (localStorage.getItem("role") == "client") {
    return [UserRole.client, UserRole.site];
  }

  if (localStorage.getItem("token")) {
    return [UserRole.site];
  }

  return [];
};

export const hasRole = (roles: UserRole[], role: UserRole) => {
  return roles.includes(role);
};

export const roles2string = (roles: UserRole[]) => {
  if (hasRole(roles, UserRole.client)) {
    return "client";
  }

  return "";
};
