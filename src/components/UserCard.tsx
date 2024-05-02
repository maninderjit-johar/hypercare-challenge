import React, { useState } from "react";

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
  onViewMore: () => void;
};

export const UserCard = React.memo(({ user, onViewMore }: UserCardProps) => {
  const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="user-card">
      <div className="user-image-container">
        <img src={user.avatar} alt={`${user.firstname} ${user.lastname}`} />
      </div>
      <div className="user-info">
        <h3 className="user-name">
          {user.firstname} {user.lastname}
        </h3>
        <p className="user-description">{truncateText(user.description, 50)}</p>
      </div>
      <button className="view-more-button" onClick={onViewMore}>
        View More
      </button>
    </div>
  );
});
