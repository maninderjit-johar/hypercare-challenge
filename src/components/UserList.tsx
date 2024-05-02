// src/components/UserList.tsx

import React, { useEffect, useState, useCallback } from "react";
import { UserCard, User } from "./UserCard";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import "./styles/User.css";
import { Modal } from "./UI/Modal/Modal";

export const UserList = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [visibleUsers, setVisibleUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 20;
  const [hasMore, setHasMore] = useState(true);
  const { state, dispatch } = useTheme();
  const [modalUser, setModalUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
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
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        setLoading(true);
      }
    },
    [hasMore, allUsers, visibleUsers.length]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const openModal = (user: User) => {
    setModalUser(user);
  };

  const closeModal = () => {
    setModalUser(null);
  };
  const toggleText =
    state.theme === "light" ? "Switch to Dark Theme" : "Switch to Light Theme";

  return (
    <div className="user-list-container">
      <button
        style={{ position: "fixed", top: 10, right: 10, marginRight: 15 }}
        onClick={() => dispatch({ type: "TOGGLE_THEME" })}
      >
        {toggleText}
      </button>

      {visibleUsers.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onViewMore={() => openModal(user)}
        />
      ))}

      {modalUser && (
        <Modal isOpen={true} onClose={closeModal}>
          <div>
            <img
              src={modalUser.avatar}
              alt="Avatar"
              style={{ width: "100px" }}
            />
            <h2>
              {modalUser.firstname} {modalUser.lastname}
            </h2>
            <p>Role: {modalUser.role}</p>
            <p>Description: {modalUser.description}</p>
          </div>
        </Modal>
      )}
      {loading && <div className="loading-spinner"></div>}
    </div>
  );
};
