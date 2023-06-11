import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { render, screen } from '@testing-library/react';
import { Provider } from "react-redux"
import { store } from "../../views/home/app/store"
import CrearNeas_cont from "../../views/home/option/Neas/Neas_Entradas/Crear_neas_entradas/CrearNeasEntradas_cont"

describe('Created Neas', () => {
    let renderForm;
    beforeEach(() => {
        renderForm = render(
            <Provider store={store}>
                <BrowserRouter>
                    <CrearNeas_cont />
                </BrowserRouter>
            </Provider>
        )
    });
    afterEach(jest.clearAllMocks);
    it('render created Neas  component', () => {
        expect(renderForm).toBeTruthy();
    })
});