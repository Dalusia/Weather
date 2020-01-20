export const setCookie: (
  cookieName: string,
  cookieValue: string,
  expiryDays: number
) => void = (cookieName, cookieValue, expiryDays) => {
  const d = new Date();
  d.setTime(d.getTime() + expiryDays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = `${cookieName}=${cookieValue};${expires};path=/`;
};

export const getCookie: (cookieName: string) => string = cookieName => {
  var name = cookieName + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
