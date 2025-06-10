import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import Auth from "./pages/Auth";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>} />
                <Route path="/auth" element={<Auth/>} />
                <Route path="/main" element={<Main/>} />
            </Routes>
      </BrowserRouter>
  );
}

export default App;
