import { ApiController } from "./components/ApiController";
import { AccountContextProvider } from "./contexts/AccountContext";

function App() {
  return (
    <AccountContextProvider>
      <ApiController />
    </AccountContextProvider>
  );
}

export default App;
