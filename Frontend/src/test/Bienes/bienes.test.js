import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { render, screen } from '@testing-library/react';
import { Provider } from "react-redux"
import { store } from "../../views/home/app/store"
import CreatedBienes from "../../views/home/option/bienes/modalnew/CreateBienes";

describe('Created Bienes', () => {
    let renderForm;
    beforeEach(() => {
        renderForm = render(
            <Provider store={store}>
                <BrowserRouter>
                    <CreatedBienes />
                </BrowserRouter>
            </Provider>
        )
    });
    afterEach(jest.clearAllMocks);
    it('render created bienes  component', () => {
        expect(renderForm).toBeTruthy();
    })
});