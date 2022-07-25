export const LOCAL_STORAGE_KEYS = {
  CURRENT_USER: "currentUser",
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  AUTHORITIES: "authorities",
};

export const AUTHORITY = {
  ROLE_BASIC: "ROLE_BASIC",
  ROLE_ADMIN: "ROLE_ADMIN",
  ROLE_GUEST: "ROLE_GUEST",
};

export function authed(requiredRole?: string[]): boolean {
  const userAuthorities = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEYS.AUTHORITIES) || ""
  );
  // if no role required, then return true directly
  if (requiredRole) {
    let isValid: boolean = false;
    // iteritor all user's authority to see if any could match
    userAuthorities.forEach((a: { authority: string }) => {
      if (requiredRole.indexOf(a.authority) > -1) {
        isValid = true;
        return;
      }
    });
    return isValid;
  }
  return true;
}

export function formatDate(time: string) {
  return time.substring(0, time.indexOf("T"));
}
