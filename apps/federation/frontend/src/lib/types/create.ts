import type { Character } from "@jeffrey-carr/frontend-common";

export type createAccountRequest = {
  email: string;
  password: string;
  fName: string;
  lName: string;
  character: Character;
};