import { prodEnvironment, type App, type AppInfo, type Environment } from "@jeffrey-carr/frontend-common";

export const isValidEmail = (email: string): string => {
  const regexp = new RegExp(/(^[a-zA-Z0-9!#$%&'*+\-\/=?^_`{|}~]+[a-zA-Z0-9!#$%&'*+\-\/=?^_`{|}~.]+[a-zA-Z0-9!#$%&'*+\-\/=?^_`{|}~])@([a-zA-Z0-9\-]+).(com|org|net|edu|gov|mil)$/gm);
  // parts[0] = full email address (e.g. jeffrey.carr98@gmail.com)
  // parts[1] = jeffrey.carr98
  // parts[2] = gmail
  // parts[3] = com
  const parts = regexp.exec(email);
  if (parts == null) {
    return "Email is required";
  }

  return "";
}

export const isValidPassword = (password: string): string => {
  password = password.trim();
  if (password.length < 12) {
    return "Password must be at least 12 characters";
  }

  return "";
};

export const isValidName = (fName: string): string => {
  fName = fName.trim();
  if (fName.length === 0) {
    return 'Name is required';
  }
  
  const regexp = new RegExp(/^[a-zA-Z\-\s]+$/);
  if (!regexp.test(fName)) {
    return "Name can only container letters, spaces, or hyphens";
  }

  return "";
};

export const buildAppURL = (environment: Environment, app: AppInfo): string => {
  if (environment !== prodEnvironment) {
    return `http://${app.subdomain}.jeffreycarr.local:${app.devPort}`;
  }
  
  return `https://${app.subdomain}.jeffreycarr.dev`;
};
