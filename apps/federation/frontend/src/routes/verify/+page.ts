import { isUUID, type NotificationInfo } from "@jeffrey-carr/frontend-common";
import { redirect } from "@sveltejs/kit";

export type VerificationRouteValues = {
  token: string;
};
export const load = ({ url }: { url: URL}): VerificationRouteValues => {
  let token = url.searchParams.get("token")?.trim();
  if (token == null || !isUUID(token)) {
    throw redirect(303, '/');
  }

  return { token };
};
