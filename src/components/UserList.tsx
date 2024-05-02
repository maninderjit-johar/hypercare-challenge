// src/components/UserList.tsx

import React, { useEffect, useState, useCallback } from "react";
import { UserCard, User } from "./UserCard";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import "./styles/User.css";

export const UserList = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [visibleUsers, setVisibleUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 20;
  const [hasMore, setHasMore] = useState(true);
  const { state, dispatch } = useTheme();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://9e06da9a-97cf-4701-adfc-9b9a5713bbb9.mock.pstmn.io/users"
      );
      setAllUsers(response.data.data.users);
      setVisibleUsers(response.data.data.users.slice(0, itemsPerPage));
      setHasMore(response.data.data.users.length > itemsPerPage);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch users", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleScroll = useCallback(
    (event: any) => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollHeight - scrollTop <= clientHeight + 100 && hasMore) {
        const totalVisible = visibleUsers.length;
        const nextVisible = allUsers.slice(
          totalVisible,
          totalVisible + itemsPerPage
        );
        setVisibleUsers((prevVisible) => [...prevVisible, ...nextVisible]);
        setHasMore(totalVisible + itemsPerPage < allUsers.length);
      }
    },
    [hasMore, allUsers, visibleUsers.length]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const toggleText =
    state.theme === "light" ? "Switch to Dark Theme" : "Switch to Light Theme";

  return (
    <div className="user-list-container">
      <button
        style={{ position: "fixed", top: 10, right: 10 }}
        onClick={() => dispatch({ type: "TOGGLE_THEME" })}
      >
        {toggleText}
      </button>
      {visibleUsers.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
      {loading && <div className="loading">Loading...</div>}
    </div>
  );
};
