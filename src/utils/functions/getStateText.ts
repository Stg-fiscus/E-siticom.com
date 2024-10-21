export const getStateText = (stateValue: string): string => {
  switch (parseInt(stateValue)) {
    case 0:
      return "Хүлээгдэж байна";
    case 1:
      return "Хийгдэж байна";
    case 2:
      return "Хийгдсэн";
    case 3:
      return "Цуцалсан";
    default:
      return "";
  }
};
