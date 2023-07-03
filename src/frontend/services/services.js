import axios from "axios";

const getEncodedToken = () => localStorage.getItem("encodedToken");

export const signUpService = async (signupData) => {
  return axios.post("/api/auth/signup", {
    ...signupData,
    fullName: `${signupData.firstName} ${signupData.lastName}`,
  });
};

export const loginService = async ({ username, password }) =>
  axios.post("/api/auth/login", {
    username,
    password,
  });

export const getUsersService = async () => {
  return axios.get("/api/users");
};

export const getUserService = async (userId) => {
  return axios.get(`/api/users/${userId}`);
};

export const editUserService = async (userData) => {
  return axios.post(
    "/api/users/edit",
    {
      userData,
    },
    {
      headers: { authorization: getEncodedToken() },
    }
  );
};

export const getPostsService = async () => {
  return axios.get("/api/posts");
};

export const createPostService = async (postData) => {
  return axios.post(
    "/api/posts",
    {
      postData,
    },
    {
      headers: {
        authorization: getEncodedToken(),
      },
    }
  );
};

export const deletePostService = async (postId) => {
  return axios.delete(`/api/posts/${postId}`, {
    headers: { authorization: getEncodedToken() },
  });
};

export const editPostService = async (postId, postData) => {
  return axios.post(
    `/api/posts/edit/${postId}`,
    {
      postData,
    },
    {
      headers: {
        authorization: getEncodedToken(),
      },
    }
  );
};

export const likePostService = async (postId) => {
  return axios.post(
    `/api/posts/like/${postId}`,
    {},
    {
      headers: { authorization: getEncodedToken() },
    }
  );
};

export const dislikePostService = async (postId) => {
  return axios.post(
    `/api/posts/dislike/${postId}`,
    {},
    {
      headers: { authorization: getEncodedToken() },
    }
  );
};

export const addToBookmarkService = async (postId) => {
  return axios.post(
    `/api/users/bookmark/${postId}`,
    {},
    { headers: { authorization: getEncodedToken() } }
  );
};

export const removeFromBookmarkService = async (postId) => {
  return axios.post(
    `/api/users/remove-bookmark/${postId}`,
    {},
    { headers: { authorization: getEncodedToken() } }
  );
};

export const getAllBookmarksService = async () => {
  return axios.get("/api/users/bookmark/", {
    headers: { authorization: getEncodedToken() },
  });
};

export const followUserService = async (postId) => {
  return axios.post(
    `/api/users/follow/${postId}`,
    {},
    {
      headers: { authorization: getEncodedToken() },
    }
  );
};

export const unfollowUserService = async (postId) => {
  return axios.post(
    `/api/users/unfollow/${postId}`,
    {},
    {
      headers: { authorization: getEncodedToken() },
    }
  );
};
