import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import styles from './Sidedrawer.module.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';

const Sidedrawer = (props) => {
    let attachedstyles = [styles.Sidedrawer, styles.close]
    if (props.open) {
        attachedstyles = [styles.Sidedrawer, styles.open]
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedstyles.join(' ')}>
                <div className={styles.Logo} >
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Aux>
    );


};

export default Sidedrawer;