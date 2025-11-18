'use client'
import {useEffect, useState} from "react";

export function UseSaveCategories (categories){
    sessionStorage.setItem('categories', JSON.stringify(categories))
};

export function UseSaveSizes (sizes){
    sessionStorage.setItem('sizes', JSON.stringify(sizes))
};


const UseFiltersRestoration = ({startProducts, setProducts, setChosenCategories, setChosenSizes, chosenCategories, chosenSizes}) => {
    // const [chosenSizes, setChosenSizes] = useState([])
    // const [chosenCategories, setChosenCategories] = useState([])
    useEffect(() => {
        const ctData = sessionStorage.getItem('categories')
        const szData = sessionStorage.getItem('sizes')
        const chosenCategories = JSON.parse(`${ctData?ctData:'[]'}`)
        const chosenSizes = JSON.parse(`${szData?szData:'[]'}`)
        setChosenCategories(chosenCategories)
        setChosenSizes(chosenSizes)
    }, []);
    let products = []

    useEffect(() => {
        let filtered = [...startProducts]
        if (chosenSizes?.length > 0||chosenCategories?.length > 0){
            if(chosenSizes?.length > 0) {
                products = filtered.filter(product => product.sizes.some(size => chosenSizes.includes(size)));
            }
            if(chosenCategories?.length > 0){
                if(products.length > 0){
                    products = products.filter(product => product.product_groups.some(category => chosenCategories.includes(category)));
                }
                else {
                    products = filtered.filter(product => product.product_groups.some(category => chosenCategories.includes(category)));
                }
            }
            setProducts(products);
        }
    }, [chosenSizes, chosenCategories, startProducts, setProducts]); // <- End of useEffect()
    return null;
};

export default UseFiltersRestoration;