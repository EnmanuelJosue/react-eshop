import {useState, useEffect} from 'react';
import axios from 'axios';
import initialState from '../initialState';

const API = 'https://us-central1-gndx-fake-api.cloudfunctions.net/api';

const useInitialState = () => {
    const [state, setState] = useState(initialState);
    const [products, setProducts] = useState([]);

    const getProducts  = async() => {
        const response = await axios(API);
        setProducts(response.data);
    }
    useEffect(()=>{
       getProducts();
    },[])

    const addToCart = (payload) => {
        setState(
            {
                ...state,
                cart: [...state.cart, payload]
            }
        )
    };
    
    const removeFromCart = (payload, indexToRemove) => {
        setState({
            ...state,
            cart: state.cart.filter((items, index) => items.id != payload.id || index != indexToRemove)
        })
    };

    const addToBuyer = (payload) => {
        setState({
            ...state,
            buyer: [...state.buyer, payload]
        })
    };

    const addNewOrder = (payload) => {
        setState({
            ...state,
            orders: [...state.orders, payload]
        })
    }

    return {
        addToCart,
        removeFromCart,
        addToBuyer,
        addNewOrder,
        products,
        state
    };
};
export default useInitialState;