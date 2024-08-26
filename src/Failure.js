import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import BASE_URL from './config';
import './css/Failure.css';

const Failure = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const sessionId = query.get('cko-session-id');
    const [statusData, setStatusData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!sessionId) {
            console.error('Session ID is missing');
            return;
        }

        const fetchStatus = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/payments/status/${sessionId}`);
                setStatusData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching status:', error);
                setLoading(false);
            }
        };

        fetchStatus();
    }, [sessionId]);

    if (loading) return <div className="failure-container">Loading...</div>;

    return (
        <div className="failure-container">
            <h2>Payment Failed</h2>
            {statusData ? (
                <div className="failure-details">
                    <p><strong>Payment ID:</strong> {statusData.paymentId}</p>
                    <p><strong>Session ID:</strong> {statusData.sessionId}</p>
                    <p><strong>User ID:</strong> {statusData.userId}</p>
                    <p><strong>Amount:</strong> {statusData.amount.toFixed(2)}</p>
                    <p><strong>Currency:</strong> {statusData.currency}</p>
                    <p><strong>Status:</strong> DECLINED</p>
                    <p><strong>Payment Type:</strong> {statusData.paymentType}</p>
                </div>
            ) : (
                <p>No payment details available.</p>
            )}
            <div className="failure-message">
                <p>Unfortunately, your payment was not successful. Please try again or contact support if the problem persists.</p>
            </div>
        </div>
    );
};

export default Failure;
