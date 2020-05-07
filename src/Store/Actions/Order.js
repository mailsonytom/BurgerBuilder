import axios from '../../axios';

// Purchasing Burger

// If purchase is success
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: 'PURCHASE_BURGER_SUCCESS',
        orderId: id,
        orderData: orderData
    };
};

// If purchase is failed
export const purchaseBurgerFail = (error) => {
    return {
        type: 'PURCHASE_BURGER_FAIL',
        error: error
    };
};

// Start purchase
export const purchaseBurgerStart = (loading) => {
    return {
        type: 'PURCHASE_BURGER_START',
        loading: loading
    };
};

// Post data to firebase using axios
export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log(response.data);
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    };
};

// Purchase init
export const purchaseInit = () => {
    return {
        type: 'PURCHASE_INIT'
    };
};


// Fetching orders from firebase using axios

// If fetching orders is success
export const fetchOrderSuccess = (orders) => {
    return {
        type: 'FETCH_ORDER_SUCCESS',
        orders: orders
    };
};

// If fetching orders is failed
export const fetchOrderFail = (error) => {
    return {
        type: 'FETCH_ORDER_FAIL',
        error: error
    };
};

// Start fetching order
export const fetchOrderStart = () => {
    return {
        type: 'FETCH_ORDER_START'
    };
};

// Fetch using axios
export const fetchOrders = () => {
    return dispatch => {
        // dispatch(fetchOrderStart());
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrderSuccess(fetchedOrders))
            })
            .catch(err => {
                dispatch(fetchOrderFail(err))
            });
    };
};
