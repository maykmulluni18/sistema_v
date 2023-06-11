import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { render, screen } from '@testing-library/react';
import { Provider } from "react-redux"
import userEvent from "@testing-library/user-event";
import { store } from "../../views/home/app/store"
import CreateAdministrativos from "../../views/home/option/usuarios/modalnewusers/CreateAdministrativos_cont";

describe('test component form administrtivos',()=>{
    test('should first', () => { 
        const testData = {n_documento: "2234", inputNombres: 'MAYKOL', apellido_paterno: "start", apellido_materno: "strat2"};

        const submitadm = jest.fn();

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <CreateAdministrativos />
                </BrowserRouter>
            </Provider>
        );
        
        const inputDocument = screen.getByLabelText('Documento');
        const inputName = screen.getByLabelText('NOMBRES');
        const inputFirtsName = screen.getByLabelText('APELLIDOS PATERNO');
        const inputLastName = screen.getByLabelText('APELLIDOS MATERNO');
        const button = screen.getByRole('button',{
            name: /Guardar/i
        }) 
        let nombres = 'JOEL';
        userEvent.clear(inputDocument);
        userEvent.type(inputDocument, testData.n_documento);

        userEvent.type(inputName, nombres);

        userEvent.clear(inputFirtsName);
        userEvent.type(inputFirtsName, testData.apellido_paterno);

        userEvent.clear(inputLastName);
        userEvent.type(inputLastName, testData.apellido_materno);

        userEvent.click(button);
        console.log(testData.n_documento, testData.inputNombres, testData.apellido_paterno, testData.apellido_materno);
       
        const listItem = screen.queryByText(testData.n_documento, testData.inputNombres, testData.apellido_paterno, testData.apellido_materno);
        
        const inputenv = screen.queryByText(nombres)
        console.log(inputenv);
        expect(inputenv).not.toBeInTheDocument();

     })
})
