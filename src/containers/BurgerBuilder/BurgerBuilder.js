import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios.js';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import  withRouter  from '../../withRouter';
import { Navigate } from 'react-router-dom';


const INGREDIENT_PRICES  = {
        salad : 0.5,
        cheese : 0.4,
        meat : 1.3,
        bacon : 0.7
} ; 

class BurgerBuilder extends Component {

    state = {
        ingredients : null,
        totalPrice : 4,
        purchaseable : false,
        purchasing : false,
        loading : false,
        error : false
    }

    componentDidMount() {
        console.log(this.props);
       axios.get('https://react-my-burger-app-a38bc-default-rtdb.firebaseio.com/ingredients.json')
        .then( response => {
            this.setState({ingredients : response.data})
        })
        .catch (error => {
            this.setState({error : true})
        })
    }

    updatePurchaseState = (ingredients) => {
        // const ingredients = {
        //     ...this.state.ingredients
        // }
        const sum = Object.keys(ingredients).map(
            igKey => {
                return ingredients[igKey]
            }
        ).reduce((sum,el) => {
            return sum+el;
        } ,0);
        this.setState({purchaseable : sum>0})
    }


    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount +1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICES[type];
         const oldPrice = this.state.totalPrice;
         const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice : newPrice, ingredients : updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0)
            return ;


        const updateCount = oldCount -1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCount;
        const priceDeduction = INGREDIENT_PRICES[type];
         const oldPrice = this.state.totalPrice;
         const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice : newPrice, ingredients : updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing : true})
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing : false})
    }

    purchaseContinueHandler = () => {
        // //alert('You Continue');
        // this.setState({loading: true});
        // const order = {
        //     ingredients : this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer : {
        //         name : 'Rasheed',
        //         address : {
        //             street : 'Test Street',
        //             zipcode : '20002',
        //             country : 'India'
        //         },
        //         email : 'test@gmail.com'
        //     },
        //     deliveryMethod : 'fastest' 
        // }
        // axios.post('/orders.json', order)
        //     .then(response  => {
        //         this.setState({loading: false, purchasing : false})
        //     })
        //     .catch(error => {
        //         this.setState({loading: false, purchasing : false});
        //     });
    //    this.props.history.push("/checkout", null);
        // this.props.navigate('/checkout')
        <Navigate replace to='/checkout' />
    }
    
    render () {

        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let i in disabledInfo){
            disabledInfo[i] = disabledInfo[i] <=0 
        }
        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        if(this.state.ingredients) {
           burger = (
                <Auxiliary>
                <Burger ingredients = {this.state.ingredients} />
               <BuildControls 
                ingredientAdded = {this.addIngredientHandler}
                ingredientRemove = {this.removeIngredientHandler}
                disabled = {disabledInfo}
                purchaseable = {this.state.purchaseable}
                price = {this.state.totalPrice}
                ordered = {this.purchaseHandler}
               />
                </Auxiliary>
           ); 
           orderSummary = <OrderSummary ingredients ={this.state.ingredients}
           purchaseCanceled = {this.purchaseCancelHandler}
           purchaseContinued = {this.purchaseContinueHandler}
           price = {this.state.totalPrice}
      />;
        }

        if(this.state.loading) {
            orderSummary =  <Spinner />;
        }

        return (
           <Auxiliary>
               <Modal show = {this.state.purchasing} modalClosed= {this.purchaseCancelHandler} >
                   {orderSummary}
               </Modal>
               {burger} 
           </Auxiliary> 
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);