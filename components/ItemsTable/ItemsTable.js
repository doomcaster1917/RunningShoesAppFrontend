'use client'
import React, {useEffect, useLayoutEffect, useState} from 'react';
import styles from './itemsTable.module.scss'
import ProductItem from "../ProductItem/ProductItem";
import OptionsArea from "../OptionsArea/OptionsArea";

const ItemsTable = ({children}) => {
    const [products, setProducts] = useState();
    const [startProducts, setStartProducts] = useState();

    useEffect(() => {
        setProducts(children);
        setStartProducts(children);
    }, [children]);
    return (
        <div className={styles.container}>
            <OptionsArea startProducts={startProducts} setProducts={setProducts}/>
            <div className={styles.goods}>
                {products?.map((item) =>(<ProductItem key={item.id}>{item}</ProductItem>))}
            </div>
        </div>
    );
};

export default ItemsTable;