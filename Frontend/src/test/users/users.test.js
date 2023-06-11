import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { cleanup, waitFor } from "@testing-library/react";
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux"
import { store } from "../../views/home/app/store"
import CreatedUser from "../../views/home/option/User/CrearUsers/CreateUsers_cont"
import axios from "axios";


describe('render users input form', () => {
    afterEach(cleanup)
    afterEach(jest.clearAllMocks)
    beforeEach(() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <CreatedUser />
                </BrowserRouter>
            </Provider>
        )
    })

    it('should input users existe at the screen', async () => {
        const nameUserInput = screen.getByRole('textbox', { name: /username/i })

    })
})
