import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    fullName: "Adarsh Balika",
    bio: "Life is what happens to you while you scroll through Instagram",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
