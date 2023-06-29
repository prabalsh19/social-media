import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: "1",
    content:
      "Must try of this week: Vada Pao from SK Vadewale in Pune. The taste is absolutely mind-boggling and fresh.",
    likes: {
      likeCount: 100,
      likedBy: [],
      dislikedBy: [],
    },
    username: "prabalsh19",
    fullName: "Prabal Sharma",
    postImage:
      "https://images.unsplash.com/photo-1687173566424-751ee0f54c49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=327&q=80",
    createdAt: "2022-05-01",
    updatedAt: "2023-06-11",
    comments: [
      {
        _id: "1",
        comment: "Nice!",
        fullName: "Anshaal Khanna",
        username: "anshaal10",
        profileAvatar: "https://picsum.photos/id/1005/150",
        createdAt: "2023-06-11",
        updatedAt: "2023-06-11",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },
  {
    _id: "2",
    content:
      "Enjoying the beautiful sunset at the beach. Nature's wonders never cease to amaze me!",
    likes: {
      likeCount: 50,
      likedBy: [],
      dislikedBy: [],
    },
    username: "emmajay23",
    fullName: "Emma Johnson",
    postImage:
      "https://images.unsplash.com/photo-1687428959667-369ef891658a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    createdAt: "2023-06-10",
    updatedAt: "2023-06-11",
    comments: [],
  },
  {
    _id: "3",
    content:
      "Just finished reading an amazing book, highly recommended: 'The Power of Now' by Eckhart Tolle.",
    likes: {
      likeCount: 200,
      likedBy: [],
      dislikedBy: [],
    },
    username: "mikebrown84",
    fullName: "Michael Brown",
    postImage:
      "https://images.unsplash.com/photo-1560792523-9b3e98060a4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=394&q=80",
    createdAt: "2023-06-09",
    updatedAt: "2023-06-11",
    comments: [
      {
        _id: "1",
        comment: "I love that book too! It's truly life-changing.",
        fullName: "Alice Johnson",
        username: "alice_j",
        profileAvatar: "https://picsum.photos/id/1011/150",
        createdAt: "2023-06-11",
        updatedAt: "2023-06-11",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },
  {
    _id: "4",
    content:
      "Just had a fantastic workout session at the gym. Feeling pumped up and energized!",
    likes: {
      likeCount: 20,
      likedBy: [],
      dislikedBy: [],
    },
    username: "sophiadavis19",
    fullName: "Sophia Davis",
    postImage:
      "https://images.unsplash.com/photo-1585468274952-66591eb14165?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80",
    createdAt: "2023-06-08",
    updatedAt: "2023-06-11",
    comments: [],
  },
  {
    _id: "5",
    content:
      "Exploring the streets of Tokyo. The city is vibrant and full of life!",
    likes: {
      likeCount: 70,
      likedBy: [],
      dislikedBy: [],
    },
    username: "owilson",
    fullName: "Oliver Wilson",
    postImage:
      "https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80",
    createdAt: "2023-06-07",
    updatedAt: "2023-06-11",
    comments: [
      {
        _id: "1",
        comment: "Tokyo is my dream destination! Enjoy your trip.",
        fullName: "Lily Anderson",
        username: "lily_a",
        profileAvatar: "https://picsum.photos/id/1025/150",
        createdAt: "2023-06-11",
        updatedAt: "2023-06-11",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: "2",
        comment: "I miss Tokyo so much! Have fun!",
        fullName: "David Chen",
        username: "david_c",
        profileAvatar: "https://picsum.photos/id/1003/150",
        createdAt: "2023-06-11",
        updatedAt: "2023-06-11",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },
  {
    _id: "6",
    content:
      "Attended an amazing concert last night. The music was electrifying!",
    likes: {
      likeCount: 60,
      likedBy: [],
      dislikedBy: [],
    },
    username: "owilson",
    fullName: "Oliver Wilson",
    postImage:
      "https://images.unsplash.com/photo-1687795975906-801167026fe2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    createdAt: "2023-06-06",
    updatedAt: "2023-06-11",
    comments: [
      {
        _id: "1",
        comment: "I wish I could've been there! Sounds incredible.",
        fullName: "Emily Smith",
        username: "emily_s",
        profileAvatar: "https://picsum.photos/id/1006/150",
        createdAt: "2023-06-11",
        updatedAt: "2023-06-11",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },
  {
    _id: "7",
    content:
      "Hiking up the mountains was an exhilarating experience. The view from the top was breathtaking!",
    likes: {
      likeCount: 80,
      likedBy: [],
      dislikedBy: [],
    },
    username: "sophiadavis19",
    fullName: "Sophia Davis",
    postImage:
      "https://images.unsplash.com/photo-1687851898206-6636e30dcab1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    createdAt: "2023-06-05",
    updatedAt: "2023-06-11",
    comments: [],
  },
  {
    _id: "8",
    content:
      "Cooked a delicious homemade pizza for dinner. It turned out better than expected!",
    likes: {
      likeCount: 52,
      likedBy: [],
      dislikedBy: [],
    },
    username: "mikebrown84",
    fullName: "Michael Brown",
    postImage:
      "https://images.unsplash.com/photo-1687677363615-03802b082962?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    createdAt: "2023-06-04",
    updatedAt: "2023-06-11",
    comments: [
      {
        _id: "1",
        comment: "That looks incredibly tasty! Share the recipe, please.",
        fullName: "Mark Thompson",
        username: "mark_t",
        profileAvatar: "https://picsum.photos/id/1004/150",
        createdAt: "2023-06-11",
        updatedAt: "2023-06-11",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },
  {
    _id: "9",
    content:
      "Celebrating my graduation with friends and family. A new chapter begins!",
    likes: {
      likeCount: 56,
      likedBy: [],
      dislikedBy: [],
    },
    username: "mikebrown84",
    fullName: "Michael Brown",
    postImage:
      "https://images.unsplash.com/photo-1687463221023-02f259da7d77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    createdAt: "2023-06-03",
    updatedAt: "2023-06-11",
    comments: [],
  },
];
