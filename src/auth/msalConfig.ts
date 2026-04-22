import { Configuration, LogLevel, PublicClientApplication } from "@azure/msal-browser";

const tenantId = import.meta.env.VITE_ENTRA_TENANT_ID ?? "";
const clientId = import.meta.env.VITE_ENTRA_CLIENT_ID ?? "";
const redirectUri =
  import.meta.env.VITE_ENTRA_REDIRECT_URI ?? window.location.origin;

export const adminGroupId: string =
  import.meta.env.VITE_ENTRA_ADMIN_GROUP_ID ?? "";

export const msalConfig: Configuration = {
  auth: {
    clientId,
    authority: tenantId
      ? `https://login.microsoftonline.com/${tenantId}`
      : "https://login.microsoftonline.com/common",
    redirectUri,
    postLogoutRedirectUri: redirectUri,
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message) => {
        if (level === LogLevel.Error) {
          console.error(message);
        }
      },
      logLevel: LogLevel.Warning,
    },
  },
};

export const loginRequest = {
  scopes: ["openid", "profile", "User.Read"],
};

export const msalInstance = new PublicClientApplication(msalConfig);
