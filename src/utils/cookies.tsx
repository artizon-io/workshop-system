import Logger from "js-logger";

// Deprecated
export const getCookie = () => {
  const pairs = document.cookie.split(";");
  let cookie = {};
  pairs.forEach(pair => {
    const [key, value] = pair.split("=");
    cookie[key.trim()] = value;
  });
  return cookie;
}

// Deprecated
export const setCookie = (key: string, value: string, expire_in_days: number) : void => {
  Logger.debug("Before", document.cookie);
  const date = new Date();
  date.setTime(date.getTime() + (expire_in_days *24*60*60*1000));
  document.cookie = `;${key}=${value} ;secure ;expires=${date.toUTCString()}`;
  Logger.debug("After", document.cookie);
}