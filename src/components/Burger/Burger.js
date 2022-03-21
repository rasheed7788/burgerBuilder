import React from 'react';
import './Burger.css';
import BurgerIngredient from '../Burger/BurgerIngredients/BurgerIngredients';


const burger = (props) => {
    let transformedIng = Object.keys(props.ingredients).map(
        igKey => {
            return [...Array(props.ingredients[igKey])].map((_,i) => {
              return  <BurgerIngredient key = {igKey+i} type={igKey} />;
            } )
        }
    ).reduce((arr,el) => {
        return arr.concat(el);
    },[]);
    

    if(transformedIng.length === 0){
        transformedIng = <p>Please start adding ingredients</p>;
    }
    return (
        <div className='Burger'>
            <BurgerIngredient type="bread-top"/>
            {transformedIng}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}
    

export default burger;