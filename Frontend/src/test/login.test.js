import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { fireEvent } from '@testing-library/react';
import { cleanup } from "@testing-library/react";
import { render, screen } from '@testing-library/react';
import { Provider } from "react-redux"
import { store } from "../views/home/app/store"

import Login_inicio from "../views/login/Login_inicio";

describe('Login', () => {
    let renderLogin;
    const userloguin = {
        username: 'admin',
        password: 'prueva123',
    };
    beforeEach(() => {
        renderLogin = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login_inicio />
                </BrowserRouter>
            </Provider>
        )
    });
    afterEach(jest.clearAllMocks);
    it('render login component', () => {
        expect(renderLogin).toBeTruthy();
    })
});
