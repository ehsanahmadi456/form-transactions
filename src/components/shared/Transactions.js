import React from 'react';

const Transactions = ({dataTransactions}) => {

    return (
        <li>
            Transferred ${dataTransactions.balance} from account {dataTransactions.account_id} the current account balance ${dataTransactions.newBalance}
        </li>
    );
};

export default Transactions;