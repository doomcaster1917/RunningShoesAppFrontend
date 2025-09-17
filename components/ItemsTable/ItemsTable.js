import React from 'react';
import styles from './itemsTable.module.scss'
import ProductItem from "../ProductItem/ProductItem";

const ItemsTable = ({children}) => {

    return (
        <div className={styles.container}>
            {children.map((item) =>(<ProductItem key={item.id}>{item}</ProductItem>))}
        </div>
    );
};

export default ItemsTable;