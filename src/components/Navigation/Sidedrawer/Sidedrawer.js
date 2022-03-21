import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './Sidedrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary';

const sidedrawer = (props) => {

    let  attachedClasses = ["Sidedrawer", "Close"];
     if(props.open){
         attachedClasses = ["Sidedrawer", "Open"]
     }
    return (
        <Auxiliary>
        <Backdrop show= {props.open} clicked = {props.closed} />
        <div className={attachedClasses.join(' ')}>
            <Logo height = "11%" margin="32px" />
            <nav>
                <NavigationItems />
            </nav>
        </div>
        </Auxiliary>
    );
}

export default sidedrawer