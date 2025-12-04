import type { APIKey } from "$lib/types/apiKey";
import { makeRequest, METHODS, ServerError, type RouteInformation, type ServerMessage } from "@jeffrey-carr/frontend-common";

// TODO - notifications //

const getAllKeysInfo: RouteInformation = {
  path: '/api/admin/keys',
  method: METHODS.GET,
  credentials: 'required',
};
export const getAllAPIKeys = async (): Promise<APIKey[]> => {
  let keys: APIKey[];
  try {
    keys = await makeRequest(getAllKeysInfo);
  } catch (e) {
    const err = e as ServerError;
    console.error(`Error fetching API keys: ${err.message}`);
    return [];
  }

  return keys;
};

const newAPIKeyInfo: RouteInformation = {
  path: '/api/admin/keys',
  method: METHODS.POST,
  credentials: 'required',
};
export const createAPIKey = async (app: string): Promise<APIKey> => {
  let key: APIKey;
  try {
    key = await makeRequest(newAPIKeyInfo, { body: { app } });
  } catch (e) {
    const err = e as ServerError;
    throw err.message;
  }

  return key;
};

const revokeAPIKeyInfo: RouteInformation = {
  path: '/api/admin/keys/revoke',
  method: METHODS.POST,
  credentials: 'required',
};
export const revokeAPIKey = async (key: APIKey): Promise<APIKey> => {
  let revokedKey: APIKey;
  try {
    revokedKey = await makeRequest(revokeAPIKeyInfo, { body: { key } });
  } catch (e) {
    const err = e as ServerError;
    throw err.message;
  }

  return revokedKey;
};