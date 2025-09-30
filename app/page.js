import React from 'react';
import Layout from "../components/Layout/Layout";
import ItemsTable from "../components/ItemsTable/ItemsTable";
import backendAddr from "../config";
import OptionsArea from "../components/OptionsArea/OptionsArea";

export default async function Index (){
    const response = await fetch(`${backendAddr}/products`)
    const products = await response.json()
    return (
        <>
            <Layout>
                <ItemsTable>{products}</ItemsTable>
            </Layout>
        </>
    );
};
