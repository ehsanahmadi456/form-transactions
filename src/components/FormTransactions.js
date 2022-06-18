import React, { useContext, useState } from 'react';

// Style
import styles from "./FormTransactions.module.css";

const FormTransactions = () => {

    return (
        <div className={styles.container}>
            <h2>Form Transactions</h2>
            <div className={styles.form}>
                <div className={styles.submit}>
                    <p>Submit new transaction</p>
                    <div className={styles.transaction_form}>
                        <form>
                            <div className={styles.inputForm}>
                                <label>Account ID</label>
                                <input data-type="account-id" type="text" />
                            </div>
                            <div className={styles.inputForm}>
                                <label>Amount</label>
                                <input data-type="amount" type="text" />
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
                        <li>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FormTransactions;