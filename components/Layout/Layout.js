import styles from './Layout.module.scss'
import React from 'react';
import Header from "../Header/Header";

export default async function Layout({children}){
    return (
        <>
        <Header/>
            <div className={styles.body}>
            {children}
            </div>
        </>
    );
};

