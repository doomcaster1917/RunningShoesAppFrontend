import React from 'react';
import Layout from "../../../components/Layout/Layout";
import backendAddr from "../../../config";
import Product from "../../../components/Product/Product";

export default async function ProductPage({searchParams}){
    const { id } = await searchParams;
    const response = await fetch(`${backendAddr}/products/?id=${id}`, { cache: "no-store"})
    const children = await response.json()

    return (
        <>
            <Layout>
                {children.map((item) =>
                    <Product key={item.id}>{item}</Product>
                )}
            </Layout>
        </>
    );
};


