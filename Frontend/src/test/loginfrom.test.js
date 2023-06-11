import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { cleanup, waitFor } from "@testing-library/react";
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux"
import { store } from "../views/home/app/store"
import axios from "axios";

import Login_inicio from "../views/login/Login_inicio";
import { LoginForm } from "../__mocks__/LoginForm";

jest.mock('axios')

describe('render login input form', () => {
    afterEach(cleanup)
    afterEach(jest.clearAllMocks)

    beforeEach(() => {
        axios.post.mockResolvedValue({ data: LoginForm });
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login_inicio />
                </BrowserRouter>
            </Provider>
        )
    })

    it('should input  existe at the screen', async () => {
        const usernameInput = screen.getByRole('textbox', { name: /Ingrese su Usuario/i })
        const passwordInput = screen.getByRole('button', { name: /toggle password/i })

        expect(usernameInput).toBeInTheDocument()
        expect(passwordInput).toBeInTheDocument()

        expect(usernameInput).toHaveValue('')
        expect(passwordInput).toHaveValue('')
    })

    it('should enable the submit button if the form value are validate', async () => {
        const usernameInput = screen.getByRole('textbox', { name: /Ingrese su Usuario/i })
        const passwordInput = screen.getByRole('button', { name: /toggle password/i })
        const submitButton = screen.getByRole('button', { name: /Iniciar Sesion/i })

        await userEvent.type(usernameInput, LoginForm.username)
        await userEvent.type(passwordInput, LoginForm.password)
        await userEvent.click(submitButton)

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledTimes(1)
            //expect(usernameInput).toHaveValue(LoginForm.username)
            //expect(passwordInput).toBeInTheDocument(LoginForm.password)
        })

    })
})
