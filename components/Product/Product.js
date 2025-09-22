'use client'
import styles from './Product.module.scss';
import backendAddr from "../../config";
import React, { useState} from 'react';
import BuyFormModal from "../modal/BuyFormModal/BuyFormModal";
import { useRawInitData } from '@telegram-apps/sdk-react';
import Link from "next/link";

export default function Product ({children}){
    const [mainImage, setMainImage] = useState(`${backendAddr}${children?.main_image?.image}`)
    const [modalMode, setModalMode] = useState(false)

    const token = useRawInitData()
    return (
        <div className={styles.container}>
            <div className={styles.product_images_area}>
                <div className={styles.main_image_wrapper}>
                    <img className={styles.main_image} src={mainImage} alt={""}/>
                </div>
                <div className={styles.images_switcher}>
                    {children.images.slice(0, 10).map((image) =>
                        <button key={image.id}
                                onClick={() => setMainImage(`${backendAddr}${image.image}`)}>
                            <img className={styles.tiny_image} src={`${backendAddr}${image.image}`}
                                 alt={""}/>
                        </button>
                    )}
                </div>
            </div>
            <div className={styles.info}>
                {/*here: {token}*/}
                <h1>{children.name}</h1>
                <div className={styles.sizes}>

                    <span>Размеры:</span>{
                    children.sizes.map((item, index) =>
                        <span key={index}>{item}</span>
                    )
                }</div>
                <button onClick={() => setModalMode(true)}>Купить</button>
            </div>
            <div className={styles.description_block}>
                Описание:
                <p>{children.full_description}</p>
            </div>
            <Link className={styles.back_button} href={'/'}>
                <img src={'../static/images/icons/back_button.png'} alt=""/>
            </Link>
            {modalMode&&<BuyFormModal price={children.price} sizes={children.sizes} itemName={children.name} tgToken={token} setModalMode={setModalMode}></BuyFormModal>}
        </div>
    );
};

