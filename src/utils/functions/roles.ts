import { UserRole } from "@types";

interface ResponseRole {
  id: number;
  name: string;
}

const role2enum = (role: ResponseRole) => {
  switch (role.id) {
    case 4:
      return UserRole.client;
    case 7:
      return UserRole.employee;
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

  return localStorage.getItem("role")?.split(",") as UserRole[] || [];
};

export const hasRole = (roles: UserRole[], role: UserRole) => {
  return roles.includes(role);
};

export const roles2string = (roles: UserRole[]) => {
  return roles.join(",");
};
