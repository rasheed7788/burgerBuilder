import React , {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component {

    state = {
        showSidedrawer : true
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSidedrawer : false})
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return  {showSidedrawer : !prevState.showSidedrawer};
        }); 
    }


    render () {
        return (
            <Auxiliary>
        <Toolbar drawerToggleClicked = {this.sideDrawerToggleHandler} />
        <Sidedrawer open = {this.state.showSidedrawer} closed ={this.sideDrawerClosedHandler} />
        <main className='Content'>
            {this.props.children}
        </main>
    </Auxiliary>
        )
    }
}

export default Layout;