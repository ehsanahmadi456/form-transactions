import React, { useContext, useState, useEffect } from 'react';
import axios from "axios";
import { v4 } from "uuid"

// Styles
import styles from "./FormTransactions.module.css";

// Context
import { TransactionsContext } from "../context/TransactionsContextProvider.js";

// Components
import Transactions from './shared/Transactions';
import { validate } from './validate';

const FormTransactions = () => {

    const [data, setData] = useState({
        id: "",
        number: "",
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    useEffect(() => {
        setErrors(validate(data))
    }, [data, touched])

    const changeHandler = event => {
        if (event.target.name === "isAccepted") {
            setData({ ...data, [event.target.name]: event.target.checked })
        } else {
            setData({ ...data, [event.target.name]: event.target.value })
        }
    }

    const focusHanlder = event => {
        setTouched({ ...touched, [event.target.name]: true })
    }

    const {state, dispatch} = useContext(TransactionsContext);

    const submitHandler = async (event) => {
        event.preventDefault();
        setTouched({
            id: true,
            number: true,
        })
        if (state.transactions.find(item => item.account_id === event.nativeEvent.srcElement[0].value)) {
            axios.get(await `https://infra.devskills.app/api/accounting/accounts/${event.nativeEvent.srcElement[0].value}`)
            .then(response => dispatch({type: "INCREASE", payload: response.data, transferred: event.nativeEvent.srcElement[1].value}))
        } else {
            axios.get( await `https://infra.devskills.app/api/accounting/accounts/${event.nativeEvent.srcElement[0].value}`)
            .then(response => dispatch({type: "ADD_ITEM", payload: response.data, transferred: event.nativeEvent.srcElement[1].value}))
        }
    }

    return (
        <div className={styles.container}>
            <h2>Form Transactions</h2>
            <div className={styles.form}>
                <div className={styles.submit}>
                    <p>Submit new transaction</p>
                    <div className={styles.transaction_form}>
                        <form onSubmit={submitHandler}>
                            <div className={styles.inputForm}>
                                <label>Account ID</label>
                                <input
                                    type="text"
                                    name="id"
                                    value={data.id}
                                    onChange={changeHandler}
                                    onFocus={focusHanlder}
                                    data-type="account-id"
                                    />
                                {errors.id && touched.id && <span>{errors.id}</span>}
                            </div>
                            <div className={styles.inputForm}>
                                <label>Amount</label>
                                <input
                                    type="text"
                                    name="number"
                                    value={data.number}
                                    onChange={changeHandler}
                                    onFocus={focusHanlder}
                                    data-type="amount"
                                    />
                                {errors.number && touched.number && <span>{errors.number}</span>}
                            </div>

                            <div>
                                <input data-type="transaction-submit" type="submit" />
                            </div>
                        </form>
                    </div>
                </div>
                <div className={styles.transaction_history}>
                    <p>Transaction history</p>
                    <ul className={styles.history}>
                        {
                            state.transactions.map(item => <Transactions key={v4()} dataTransactions={item} />)
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FormTransactions;