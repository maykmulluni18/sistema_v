import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { render, screen } from '@testing-library/react';
import { Provider } from "react-redux"
import { store } from "../../views/home/app/store"
import CrearMetas_cont from "../../views/home/option/metas/CrearMetas/CrearMetas_cont"

describe('Created Metas', () => {
    let renderForm;
    beforeEach(() => {
        renderForm = render(
            <Provider store={store}>
                <BrowserRouter>
                    <CrearMetas_cont />
                </BrowserRouter>
            </Provider>
        )
    });
    afterEach(jest.clearAllMocks);
    it('render created metas  component', () => {
        expect(renderForm).toBeTruthy();
    })
});