import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/main/Main";
import Auth from "./pages/auth/Auth";
import { AuthContext } from "./components/context";
import { useState } from "react";

function App() {
    const [authState, setAuthState] = useState(false);
    return (
        <BrowserRouter>
        <AuthContext.Provider value={[authState, setAuthState]}>
            <Routes>
                <Route path="/" element={<Main/>} />
                <Route path="*" element={<Main/>} />
                <Route path="/auth" element={<Auth/>} />
                <Route path="/main" element={<Main/>} />
            </Routes>
        </AuthContext.Provider>
        </BrowserRouter>
  );
}

export default App;
