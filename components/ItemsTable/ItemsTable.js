'use client'
import React, {useEffect, useLayoutEffect, useState} from 'react';
import styles from './itemsTable.module.scss'
import ProductItem from "../ProductItem/ProductItem";
import OptionsArea from "../OptionsArea/OptionsArea";
import UseFiltersRestoration from "../CustomHooks/Restorations/UseFiltersRestoration";
import {UseScrollRestoration} from "../CustomHooks/Restorations/UseScrollRestoration";

const ItemsTable = ({children}) => {
    const [products, setProducts] = useState();

    useEffect(() => {
        setProducts(children);
    }, []);

    return (
        <div className={styles.container}>

            <OptionsArea startProducts={children} setProducts={setProducts}/>
            <div className={styles.goods}>
                {products?.map((item) =>(<ProductItem key={item.id}>{item}</ProductItem>))}
            </div>
            <UseScrollRestoration products={products}/>
        </div>
    );
};

export default ItemsTable;