export const getCookies = () => {
  const pairs = document.cookie.split(";");
  let cookies = {};
  pairs.forEach(pair => {
    const [key, value] = pair.split("=");
    cookies[key.trim()] = value;
  });
  return cookies;
}