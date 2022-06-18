// Components
import FormTransactions from './components/FormTransactions';

// Context
import TransactionsContextProvider from "./context/TransactionsContextProvider.js";

function App() {
  return (
    <TransactionsContextProvider>
      <FormTransactions />
    </TransactionsContextProvider>
  );
}

export default App;
