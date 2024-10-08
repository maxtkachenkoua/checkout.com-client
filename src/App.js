import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import PaymentForm from './PaymentForm';
import Status from './Status';
import Failure from "./Failure";

const App = () => {
    const [token, setToken] = useState(null);
    return (
        <Router>
            <div>
                <Routes>
                    <Route
                        path="/"
                        element={!token ? <Login onLogin={setToken} /> : <PaymentForm token={token} />}
                    />
                    <Route path="/status/" element={<Status />} />
                    <Route path="/failure/" element={<Failure />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
