import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { ReactNode, useEffect } from "react";
import { adminGroupId, loginRequest } from "./msalConfig";

interface RequireAdminProps {
  children: ReactNode;
}

const Unauthorized = ({
  claims,
  expectedGroupId,
}: {
  claims: Record<string, unknown> | undefined;
  expectedGroupId: string;
}) => {
  const groups = (claims?.groups as string[] | undefined) ?? [];
  const hasGroups = claims?._claim_names || claims?.hasgroups;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-foreground mb-4">Unauthorized</h1>
        <p className="text-muted-foreground mb-6">
          You are signed in, but your account is not a member of the
          administrator group.
        </p>

        <details className="border rounded-md p-4 bg-muted/30">
          <summary className="cursor-pointer font-medium">
            Diagnostic details
          </summary>
          <div className="mt-4 space-y-3 text-sm">
            <div>
              <span className="font-medium">Expected group ID:</span>{" "}
              <code className="bg-muted px-1 rounded">{expectedGroupId || "(not set)"}</code>
            </div>
            <div>
              <span className="font-medium">Groups in token:</span>{" "}
              {groups.length === 0 ? (
                <em className="text-destructive">
                  none — the `groups` claim is missing from the ID token
                </em>
              ) : (
                <ul className="list-disc ml-6 mt-1">
                  {groups.map((g) => (
                    <li key={g}>
                      <code className="bg-muted px-1 rounded">{g}</code>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {hasGroups ? (
              <div className="text-destructive">
                Token has a groups-overage claim (user is in &gt;150 groups).
                The app would need to call Microsoft Graph to resolve
                membership.
              </div>
            ) : null}
            <div className="pt-2 text-xs text-muted-foreground">
              If groups is empty: check <strong>App registration → Token
              configuration → Add groups claim → Security groups → Group ID</strong>,
              then sign out and sign in again to refresh the token.
            </div>
          </div>
        </details>
      </div>
    </div>
  );
};

const SignInRedirect = () => {
  const { instance, inProgress } = useMsal();

  useEffect(() => {
    if (inProgress === InteractionStatus.None) {
      instance.loginRedirect(loginRequest).catch((error) => {
        console.error("Login redirect failed", error);
      });
    }
  }, [instance, inProgress]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <p className="text-muted-foreground">Redirecting to sign in…</p>
    </div>
  );
};

const AdminGate = ({ children }: { children: ReactNode }) => {
  const { accounts } = useMsal();
  const account = accounts[0];
  const claims = account?.idTokenClaims as Record<string, unknown> | undefined;
  const groups = (claims?.groups as string[] | undefined) ?? [];

  const isAdmin = adminGroupId !== "" && groups.includes(adminGroupId);

  if (!isAdmin) {
    return <Unauthorized claims={claims} expectedGroupId={adminGroupId} />;
  }

  return <>{children}</>;
};

const RequireAdmin = ({ children }: RequireAdminProps) => {
  return (
    <>
      <AuthenticatedTemplate>
        <AdminGate>{children}</AdminGate>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <SignInRedirect />
      </UnauthenticatedTemplate>
    </>
  );
};

export default RequireAdmin;
