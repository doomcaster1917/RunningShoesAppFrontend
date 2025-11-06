import React from 'react';
import Layout from "../components/Layout/Layout";
import ItemsTable from "../components/ItemsTable/ItemsTable";
import backendAddr from "../config";
import {UseScrollRestoration} from "../components/CustomHooks/useScrollRestoration/UseScrollRestoration";

export default async function Index (){
    const response = await fetch(`${backendAddr}/products`, {
        next: { revalidate: 600 },
    })
    const products = await response.json()

    return (
        <>
            <Layout>
                <ItemsTable>{products}</ItemsTable>
                <UseScrollRestoration/>
            </Layout>
        </>
    );
};
