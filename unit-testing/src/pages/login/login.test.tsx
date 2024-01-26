import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import LoginPage from "."

describe("login form", () => {
    const mockSubmit = jest.fn();

    test("render form correctly", () => {
        render(<LoginPage onSubmit={mockSubmit} />)
        const title = screen.getByText("Do you already have an account?");
        expect(title).toBeDefined();

        const emailInput = screen.getByLabelText("Email");
        expect(emailInput).toBeDefined();

        const passInput = screen.getByLabelText("Password");
        expect(passInput).toBeDefined();
    })

    test("Submit data from input value", async () => {
        render(<LoginPage onSubmit={mockSubmit} />)
        const emailInput = screen.getByLabelText("Email");
        const passInput = screen.getByLabelText("Password");
        const buttonLogin = screen.getByText("Login now!")

        fireEvent.change(emailInput, { target: {value: "email@gmail.com"}});
        fireEvent.change(passInput, { target: {value: "12345678"}});
        fireEvent.click(buttonLogin);

        await waitFor(() => expect(mockSubmit).toHaveBeenCalled());

        expect(mockSubmit).toHaveBeenCalledWith({
            email: "email@gmail.com",
            password: "12345678"
        })
    })
})