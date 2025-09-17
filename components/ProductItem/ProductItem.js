import React from 'react';
import styles from './ProductItem.module.scss'
import Link from "next/link";
import backendAddr from "../../config";

const ProductItem = ({children}) => {
    return (
        <Link href={`/products/product?id=${children.id}`} className={styles.container}>
            <img src={`${backendAddr}/${children.main_image?.image}`} alt=""/>
            <span>{children.name}</span>
            <span>{children.price} ₽</span>
            {/*{children.tags.map((item) =>*/}
            {/*<p>{item}</p>*/}
            <div className={styles.sizes_block}>
                {children.sizes.map((item, index) =>
                    <p key={index}>{item.index}{item}</p>
                )}
            </div>
        </Link>
    );
};

export default ProductItem;