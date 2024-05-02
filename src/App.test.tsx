import React from "react";
import { render, screen } from "@testing-library/react";
import { UserCard } from "./components/UserCard";
import { UserList } from "./components/UserList";

test("renders user card with correct user information", () => {
  const user = {
    avatar: "",
    firstname: "John",
    lastname: "Doe",
    description: "Checking",
    role: "Developer",
    join_date: "5/21/2024",
    id: "1",
  };

  render(<UserCard user={user} onViewMore={() => console.log(user)} />);

  // Check if user information is rendered correctly
  expect(
    screen.getByText(`${user.firstname} ${user.lastname}`)
  ).toBeInTheDocument();
  expect(screen.getByText(user.description)).toBeInTheDocument();
  expect(
    screen.getByAltText(`${user.firstname} ${user.lastname}`)
  ).toBeInTheDocument();
});
