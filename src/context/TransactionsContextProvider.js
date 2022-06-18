import React, { createContext, useReducer } from "react";

export const TransactionsContext = createContext();

const initialState = {
    transactions: [],
};


const transactionsReducer = (state, action) => {
    let transferred = action.transferred;
    let balanceTran = action.payload.balance;
    switch (action.type) {
        case "ADD_ITEM":
            state.transactions.push({
                ...action.payload,
                newBalance: +transferred + balanceTran
            })
            return{
                ...state,
                transactions: [...state.transactions],
            }
        case "INCREASE":
            const indexT = state.transactions.findLastIndex(tran => tran.account_id === action.payload.account_id)
            state.transactions.push({
                ...action.payload,
                newBalance: state.transactions[indexT].newBalance + +transferred
            })
            return{
                ...state,
                transactions: [...state.transactions],
            }
        default:
            return state
    }
}

const TransactionsContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(transactionsReducer, initialState);

    return(
        <TransactionsContext.Provider value={{state, dispatch}}>
            {children}
        </TransactionsContext.Provider>
    );
};

export default TransactionsContextProvider;