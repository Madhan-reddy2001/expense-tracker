import { useState, useEffect } from "react";

export const useGetUserInfo = () => {
  const [userInfo, setUserInfo] = useState<{
    name?: string;
    profilePhoto?: string;
    userID?: string;
    isAuth?: boolean;
  }>({});

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth") || "{}");
    setUserInfo({
      name: auth.name,
      profilePhoto: auth.profileURL,
      userID: auth.userID,
      isAuth: auth.isAuth,
    });
  }, []);

  return userInfo;
};
