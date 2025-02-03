// src/components/Signup.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, vi } from "vitest";
import Signup from "./Signup";

describe("Signup Component", () => {
  let mockSignup;

  beforeEach(() => {
    mockSignup = vi.fn();
    render(
      <MemoryRouter>
        <Signup signup={mockSignup} />
      </MemoryRouter>
    );
  });

  test("renders without crashing", () => {
    expect(screen.getByRole("heading", { name: /sign up/i })).toBeInTheDocument();
  });

  test("allows user to enter information", () => {
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "newuser" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "newpassword" } });
    fireEvent.change(screen.getByPlaceholderText("First Name"), { target: { value: "John" } });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "john@example.com" } });

    expect(screen.getByPlaceholderText("Username").value).toBe("newuser");
    expect(screen.getByPlaceholderText("Password").value).toBe("newpassword");
    expect(screen.getByPlaceholderText("First Name").value).toBe("John");
    expect(screen.getByPlaceholderText("Last Name").value).toBe("Doe");
    expect(screen.getByPlaceholderText("Email").value).toBe("john@example.com");
  });

  test("calls signup function on form submission", async () => {
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "newuser" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "newpassword" } });
    fireEvent.change(screen.getByPlaceholderText("First Name"), { target: { value: "John" } });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "john@example.com" } });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(mockSignup).toHaveBeenCalledWith({
      username: "newuser",
      password: "newpassword",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
    });
  });

  test("displays error message on failed signup", async () => {
    mockSignup.mockResolvedValueOnce({ success: false, errors: ["Username already taken"] });

    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "existinguser" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });
    fireEvent.change(screen.getByPlaceholderText("First Name"), { target: { value: "Jane" } });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "jane@example.com" } });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await screen.findByText("Username already taken");
    expect(screen.getByText("Username already taken")).toBeInTheDocument();
  });
});
