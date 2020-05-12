import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';
import { connect } from 'react-redux';

class Layout extends Component {

    state = {
        showSidedrawer: false
    }

    SidedrawerClosedHandler = (props) => {
        this.setState({ showSidedrawer: false })
    }

    SidedrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSidedrawer: !prevState.showSidedrawer }
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    DrawerToggleClicked={this.SidedrawerToggleHandler} />
                <Sidedrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSidedrawer}
                    closed={this.SidedrawerClosedHandler} />
                <main className={styles.content} role="main">
                    {this.props.children}
                </main>
            </Aux >
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);