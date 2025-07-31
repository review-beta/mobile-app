export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

// You can add more utils later
export const titleCase = (str: string) =>
  str
    .toLowerCase()
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');