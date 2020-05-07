import React from 'react';
import logo from '../../Assets/Images/logo.png';
import styles from './Logo.module.css';

const Logo = (props) => (
    <div className={styles.Logo} style={{ height: props.height }}>
        <img src={logo} alt="Burger" />
    </div >
);

export default Logo;