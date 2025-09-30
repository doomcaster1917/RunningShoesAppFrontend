'use client'
import React, {useEffect} from 'react';
import styles from './OptionsArea.module.scss';
import backendAddr from "../../config";

export default function OptionsArea({startProducts, setProducts}) {
    const [active, setActive] = React.useState(false);
    const [sizesActive, setSizesActive] = React.useState(false);
    const [sizes, setSizes] = React.useState()
    const [chosenSizes, setChosenSizes] = React.useState([])


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${backendAddr}/get_all_sizes`)
                const data = await response.json();

                setSizes(data);
            } catch (error) {
                console.error('Ошибка:', error);
            }
        }
        fetchData();
    }, []);

    function handleSizesAdd(size) {
        if (!chosenSizes){
            setChosenSizes([Number(size)]);
        } else {
            setChosenSizes([...chosenSizes, Number(size)]);
        }
        console.log(chosenSizes);
    }

    function handleSizesRemove(size) {
        let newlist = chosenSizes.filter(element => element !== Number(size));
        setChosenSizes(newlist)
        console.log(chosenSizes);
    }

    function productsMatchSizesHandler(){
        if(chosenSizes.length > 0) {
            const filteredProducts = startProducts.filter(product => product.sizes.some(size => chosenSizes.includes(size)));
            setProducts(filteredProducts);
        }else{
            setProducts(startProducts);
        }
        setActive(false)
    }

    return (
        <div className={styles.container}>
            <button className={styles.filter_button} onClick={() => {active?setActive(false):setActive(true)}}>
                <img src={'/static/images/icons/filter_icon.png'} alt=""/>
            </button>
            {active ? <div className={styles.filters_area}>
                <button className={styles.menu_button} onClick={() => {sizesActive?setSizesActive(false):setSizesActive(true)}}>
                    Фильтр размера ⇵</button>
                {sizesActive?
                    <div className={styles.sizes_area}>
                        {sizes?.map((item, index) => (
                            <button
                                className={styles.size}
                                key={index}
                                onClick={() => {chosenSizes.includes(Number(item))?handleSizesRemove(item):handleSizesAdd(item)}}
                                style={{
                                    backgroundColor: chosenSizes.includes(Number(item))? 'darkblue':'darkorchid'
                                }}
                            >{item}</button>
                        ))}
                    </div>:null}
                <button className={styles.show_button} onClick={() => productsMatchSizesHandler()}>Показать</button>
            </div>: null}
        </div>
    );
};

