// src/components/Login.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, vi } from "vitest";
import Login from "./Login";

describe("Login Component", () => {
  let mockLogin;

  beforeEach(() => {
    mockLogin = vi.fn();
    render(
      <MemoryRouter>
        <Login login={mockLogin} />
      </MemoryRouter>
    );
  });

  test("renders without crashing", () => {
    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
  });

  test("allows user to enter credentials", () => {
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    expect(usernameInput.value).toBe("testuser");
    expect(passwordInput.value).toBe("password");
  });

  test("calls login function on form submission", async () => {
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(submitButton);

    expect(mockLogin).toHaveBeenCalledWith({
      username: "testuser",
      password: "password",
    });
  });

  test("displays error message on failed login", async () => {
    mockLogin.mockResolvedValueOnce({ success: false, errors: ["Invalid credentials"] });

    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: "wronguser" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpass" } });
    fireEvent.click(submitButton);

    await screen.findByText("Invalid credentials");
    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });
});
