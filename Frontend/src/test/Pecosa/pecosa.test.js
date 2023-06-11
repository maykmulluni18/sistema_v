import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { render, screen } from '@testing-library/react';
import { Provider } from "react-redux"
import { store } from "../../views/home/app/store"
import CrearNeas_cont from "../../views/home/option/Pecosa/Pecosa_bienes/Crear_pecosa_bienes/CrearPecosaBienes_cont"

describe('Created Pecosa', () => {
    let renderForm;
    beforeEach(() => {
        renderForm = render(
            <Provider store={store}>
                <BrowserRouter>
                    <CrearPecosa_cont />
                </BrowserRouter>
            </Provider>
        )
    });
    afterEach(jest.clearAllMocks);
    it('render created pecosa  component', () => {
        expect(renderForm).toBeTruthy();
    })
});