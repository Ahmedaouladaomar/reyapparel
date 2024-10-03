export const shortFullName = (user) => {
  const { firstName, lastName } = user;
  const short = `${firstName[0]}${lastName[0]}`;
  return short;
};

export const capitalize = (string) => {
  let firstLetter = string.charAt(0);
  let capFirstLetter = firstLetter.toUpperCase();
  let stringWithoutFirstLetter = string.slice(1);
  return capFirstLetter.concat(stringWithoutFirstLetter);
};

export const setCharAt = (str, index, char) => {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + char + str.substring(index + 1);
};

export const generateHash = (a, b, c) => `${a}${b}${c}`;

export const ceilQuotient = (a, b) => {
  return Math.ceil(a / b);
};

export const getQueryString = (rpp, p, s, ob) => {
  if (rpp && p) {
    if (s) {
      if (ob) return `?rpp=${rpp}&p=${p}&search=${s}&sort=${ob}`;
      return `?rpp=${rpp}&p=${p}&search=${s}`;
    }
    if (ob) return `?rpp=${rpp}&p=${p}&sort=${ob}`;
    return `?rpp=${rpp}&p=${p}`;
  }

  if (s) {
    if (ob) return `?search=${s}&sort=${ob}`;
    return `?search=${s}`;
  }

  if (ob) return `?sort=${ob}`;
  return "";
};

export const getPlpQueryString = ({
  rpp,
  p,
  price = null,
  collection = [],
}) => {
  let collectionString = "collection=";
  let priceString = price ? `&price=${price}` : "";

  if (!!collection.length) {
    for (let i = 0; i < collection.length; i++) {
      let id = `${collection[i]},`;
      if (i == collection.length - 1) id = `${collection[i]}`;
      collectionString = collectionString.concat(id);
    }
  }

  if (rpp && p) {
    if (!!collection.length) {
      return `?rpp=${rpp}&p=${p}&${collectionString}${priceString}`;
    }
    return `?rpp=${rpp}&p=${p}${priceString}`;
  }
  return "";
};
