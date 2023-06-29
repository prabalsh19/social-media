import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: "0",
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
    followers: [],
    following: [],
  },
  {
    _id: "1",
    firstName: "John",
    lastName: "Smith",
    username: "johnsmith92",
    password: "mysecretpassword",
    fullName: "John Smith",
    bio: "Avid reader and coffee lover ☕️📚",
    portfolio: "",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    followers: [],
    following: [],
  },
  {
    _id: "2",
    firstName: "Emma",
    lastName: "Johnson",
    username: "emmajay23",
    password: "securepass123",
    fullName: "Emma Johnson",
    bio: "Passionate about art and photography 🎨📷",
    portfolio: "",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    followers: [],
    following: [],
  },
  {
    _id: "3",
    firstName: "Michael",
    lastName: "Brown",
    username: "mikebrown84",
    password: "password123",
    fullName: "Michael Brown",
    bio: "Travel enthusiast and adventure seeker ✈️🌍",
    portfolio: "",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    followers: [],
    following: [],
  },
  {
    _id: "4",
    firstName: "Sophia",
    lastName: "Davis",
    username: "sophiadavis19",
    password: "s3cur3password",
    fullName: "Sophia Davis",
    bio: "Nature lover and animal rights advocate 🌿🐾",
    portfolio: "",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    followers: [],
    following: [],
  },
  {
    _id: "5",
    firstName: "Oliver",
    lastName: "Wilson",
    username: "owilson",
    password: "p@ssw0rd!",
    fullName: "Oliver Wilson",
    bio: "Tech geek and coding enthusiast 💻🚀",
    portfolio: "",
    avatar:
      "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    followers: [],
    following: [],
  },
];
