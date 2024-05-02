import React, { useState } from "react";

import { useTheme } from "../context/ThemeContext";
import { Modal } from "./UI/Modal/Modal";
import "./styles/User.css";

export type User = {
  id: string;
  avatar: string;
  firstname: string;
  lastname: string;
  role: string;
  join_date: string;
  description: string;
};

type UserCardProps = {
  user: User;
};

export const UserCard = React.memo(({ user }: UserCardProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { state } = useTheme();

  return (
    <div className="user-card">
      <img
        src={user.avatar}
        alt={`${user.firstname} ${user.lastname}`}
        style={{
          width: 100,
          height: 100,
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />
      <h2>
        {user.firstname} {user.lastname}
      </h2>
      <button onClick={() => setModalOpen(true)}>View More</button>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <img
          src={user.avatar}
          alt={`${user.firstname} ${user.lastname}`}
          style={{ width: "100%", height: "auto" }}
        />
        <h2>
          {user.firstname} {user.lastname}
        </h2>
        <p>Role: {user.role}</p>
        <p>Joined: {user.join_date}</p>
        <p>{user.description}</p>
      </Modal>
    </div>
  );
});
