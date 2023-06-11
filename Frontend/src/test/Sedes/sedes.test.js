import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { render, screen } from '@testing-library/react';
import { Provider } from "react-redux"
import userEvent from "@testing-library/user-event";
import { store } from "../../views/home/app/store"

import Listinfosedes from "../../views/home/option/sedes/Listinfosedes"
describe('test component form administrtivos',()=>{
    test('should first', () => { 
        render(
            <Provider store={store}>
                <BrowserRouter>
                <Listinfosedes/>
                </BrowserRouter>
            </Provider>
        );
     })
})