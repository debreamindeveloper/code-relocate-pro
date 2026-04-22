import { MsalProvider } from "@azure/msal-react";
import { ReactNode } from "react";
import { msalInstance } from "./msalConfig";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
};

export default AuthProvider;
