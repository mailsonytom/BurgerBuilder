const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PURCHASE_INIT':
            return {
                ...state,
                purchased: false
            }
        case 'PURCHASE_BURGER_START':
            return {
                ...state,
                loading: true
            }
        case 'PURCHASE_BURGER_SUCCESS':
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            }
        case 'PURCHASE_BURGER_FAIL':
            return {
                ...state,
                loading: false
            }
        case 'FETCH_ORDER_SUCCESS':
            return {
                ...state,
                orders: action.orders,
                loading: false
            }
        case 'FETCH_ORDER_FAIL':
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case 'FETCH_ORDER_START':
            return {
                ...state,
                loading: true
            }   
        default:
            return state;
    }
};

export default reducer;