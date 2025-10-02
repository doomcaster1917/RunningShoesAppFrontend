'use client'
import React, {useEffect} from 'react';
import styles from './OptionsArea.module.scss';
import backendAddr from "../../config";

export default function OptionsArea({startProducts, setProducts}) {
    const [active, setActive] = React.useState(false);
    const [sizes, setSizes] = React.useState()
    const [categories, setCategories] = React.useState()
    const [chosenSizes, setChosenSizes] = React.useState([])
    const [chosenCategories, setChosenCategories] = React.useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const szResponse = await fetch(`${backendAddr}/get_all_sizes`)
                const szData = await szResponse.json();
                setSizes(szData);

                const ctResponse = await fetch(`${backendAddr}/get_group_names`)
                const ctData = await ctResponse.json();
                setCategories(ctData);
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
    }

    function handleSizesRemove(size) {
        let newlist = chosenSizes.filter(element => element !== Number(size));
        setChosenSizes(newlist)
    }

    function handleCategoriesAdd(category) {
        if (!chosenCategories){
            setChosenCategories([category]);
        } else {
            setChosenCategories([...chosenCategories, category]);
        }
    }

    function handleCategoriesRemove(category) {
        let newlist = chosenCategories.filter(element => element !== category);
        setChosenCategories(newlist)
    }

    function productsMatchSizesHandler(){
        let products = []
        if(chosenSizes.length > 0) {
            products = startProducts.filter(product => product.sizes.some(size => chosenSizes.includes(size)));
        }
        if(chosenCategories.length > 0){
            if(products.length > 0){
                products = products.filter(product => product.product_groups.some(category => chosenCategories.includes(category)));
            }
            else {
                products = startProducts.filter(product => product.product_groups.some(category => chosenCategories.includes(category)));
            }
        }
        if(chosenCategories.length === 0&&chosenSizes.length === 0){
            setProducts(startProducts);
        }else{
            setProducts(products);
        }
        setActive(false)
    }

    return (
        <div className={styles.container}>
            <button className={styles.filter_button} onClick={() => {active?setActive(false):setActive(true)}}>
                <img src={'/static/images/icons/filter_icon.png'} alt=""/>
            </button>
            {active ? <div className={styles.filters_area}>
                <span>Выберите размер:</span>
                <div className={styles.sizes_area}>
                    {sizes?.map((item, index) => (
                        <button
                            className={styles.size}
                            key={index}
                            onClick={() => {
                                chosenSizes.includes(Number(item)) ? handleSizesRemove(item) : handleSizesAdd(item)
                            }}
                            style={{
                                backgroundColor: chosenSizes.includes(Number(item)) ? 'darkblue' : 'darkorchid'
                            }}
                        >{item}</button>
                    ))}
                </div>

                <span>Выберите категорию:</span>
                <div className={styles.sizes_area}>
                    {categories?.map((item, index) => (
                        <button
                            className={styles.size}
                            key={index}
                            onClick={() => {
                                chosenCategories.includes(item) ? handleCategoriesRemove(item) :handleCategoriesAdd(item)
                            }}
                            style={{
                                backgroundColor: chosenCategories.includes(item) ? 'darkblue' : 'darkorchid'
                            }}
                        >{item}</button>
                    ))}
                </div>

                <button className={styles.show_button} onClick={() => productsMatchSizesHandler()}>Показать выбор</button>
            </div> : null}
        </div>
    );
};

