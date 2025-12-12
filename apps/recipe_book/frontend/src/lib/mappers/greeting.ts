import { getRandomElement } from "@jeffrey-carr/frontend-common";

export const greetUser = (name: string): string => {
  const greetings = [
    "Hello %s",
    "Hi %s",
    "Hey %s",
    "Howdy %s",
    "Hey there %s",
    "Hi there %s",
    "Hello there %s",
    "Yo %s",
    "Hiya %s!",
    "Hey hey %s",
    "Hey friend",
    "Hi friend",
    "Hey buddy",
    "Hi buddy",
    "Hey pal",
    "Hi pal",
    "Hey you",
    "Hi again",
    "Hey, you there!",
    "Hey champ",
    "Hi champ",
    "Hey rockstar",
    "Hi rockstar",
    "Hey superstar",
    "Hi superstar",
    "Hey legend",
    "Hi legend",
    "Hey chief",
    "Hi chief",
    "Hey tiger",
    "Hey boss",
    "Hi boss",
    "Hey ace",
    "Hi ace"
  ];

  let greeting = getRandomElement(greetings);
  greeting = greeting.replace("%s", name);
  return greeting;
}