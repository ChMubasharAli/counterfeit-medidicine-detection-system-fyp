import React from 'react';
import SearchComponent from './DrugDictionary';
import NavbarComponent from '../../../components/Navbar';

export const metadata = {
    title: "DrugDictionary - Counterfeit"
}

const drugDictionary = () => {
    return (
        <>
            <NavbarComponent />
            <SearchComponent />
        </>
    )
}

export default drugDictionary;
