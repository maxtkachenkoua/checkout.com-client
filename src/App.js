import React, { useState } from 'react';
import Login from './Login';
import PaymentForm from './PaymentForm';

const App = () => {
    const [token, setToken] = useState(null);

    return (
        <div>
            {!token ? (
                <Login onLogin={setToken} />
            ) : (
                <PaymentForm token={token} />
            )}
        </div>
    );
};

export default App;
