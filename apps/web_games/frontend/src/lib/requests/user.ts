import { PUBLIC_ENVIRONMENT } from "$env/static/public";
import { App, getAppURL, GlobalRoutes, makeRequest, type RouteInformation, type ServerResponse } from "@jeffrey-carr/frontend-common";

export const logout = async (): Promise<void> => {
  const appURL = getAppURL(PUBLIC_ENVIRONMENT, App.Auth);
  const info = GlobalRoutes.LOGOUT;
  const route = `${appURL}${info.path}`;
  const fullInfo: RouteInformation = {
    path: route,
    method: info.method,
    credentials: 'required',
  };
  const response = await makeRequest(fullInfo, {
    body: { logoutEverywhere: true },
  });

  if (response.status !== 200) {
    const serverResponse: ServerResponse = await response.json();
    throw serverResponse;
  }
};