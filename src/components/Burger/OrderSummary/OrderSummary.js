import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) =>{

    const ingredientSummary = Object.keys(props.ingredients)
        .map( igKey => {
            return <li key = {igKey}><span style= {{textTransform : 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}</li>
        });
    return (
        <Auxiliary>
            <h3>Your Order</h3>
            <p>Delicious Burger with the following ingredients</p>
            <ul>
                {ingredientSummary}

            </ul>
            <p><strong>Total Price : {props.price}</strong></p>
            <p>Continue to Checkout</p>
            <Button clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button clicked={props.purchaseContinued}>CONTINUE</Button>
        </Auxiliary>
    )
};
export default orderSummary;