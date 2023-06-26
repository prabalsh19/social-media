import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Prabal",
    lastName: "Sharma",
    username: "prabalsh19",
    password: "123456789",
    fullName: "Prabal Sharma",
    bio: "Trust me, not everyone matters!",
    portfolio: "",
    avatar:
      "https://pbs.twimg.com/profile_images/1629104062225604613/ptbp3IWg_400x400.jpg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
