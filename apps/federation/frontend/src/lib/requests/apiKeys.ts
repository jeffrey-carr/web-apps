import type { APIKey } from "$lib/types/apiKey";
import { makeRequest, METHODS, type RouteInformation, type ServerMessage } from "@jeffrey-carr/frontend-common";

const getAllKeysInfo: RouteInformation = {
  path: '/api/admin/keys',
  method: METHODS.GET,
  credentials: 'required',
};
export const getAllAPIKeys = async (): Promise<APIKey[]> => {
  const response = await makeRequest(getAllKeysInfo);
  // TODO - notification
  if (response.status !== 200) {
    const serverMessage: ServerMessage = await response.json();
    console.error(`Error fetching API keys: ${serverMessage.message}`);
    return [];
  }

  return await response.json();
};

const newAPIKeyInfo: RouteInformation = {
  path: '/api/admin/keys',
  method: METHODS.POST,
  credentials: 'required',
};
export const createAPIKey = async (app: string): Promise<APIKey> => {
  const response = await makeRequest(newAPIKeyInfo, { body: { app } });
  if (response.status !== 200) {
    const serverMessage: ServerMessage = await response.json();
    throw serverMessage;
  }

  return await response.json();
};

const revokeAPIKeyInfo: RouteInformation = {
  path: '/api/admin/keys/revoke',
  method: METHODS.POST,
  credentials: 'required',
};
export const revokeAPIKey = async (key: APIKey): Promise<APIKey> => {
  const response = await makeRequest(revokeAPIKeyInfo, { body: { key } });
  if (response.status !== 200) {
    const serverMessage: ServerMessage = await response.json();
    throw serverMessage;
  }

  return await response.json();
};