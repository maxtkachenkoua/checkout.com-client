// src/Status.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Status.css'; // Import the CSS file

const Status = () => {
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
                const response = await axios.get(`http://95.216.224.218:8889/api/payments/status/${sessionId}`);
                setStatusData(response.data);
                setLoading(false);

                if (response.data.status !== 'CAPTURED' && response.data.status !== 'DECLINED') {
                    setTimeout(fetchStatus, 5000);
                }
            } catch (error) {
                console.error('Error fetching status:', error);
                setLoading(false);
            }
        };

        fetchStatus();
    }, [sessionId]);

    if (loading) return <div className="status-container">Loading...</div>;

    return (
        <div className="status-container">
            <h2>Payment Status</h2>
            {statusData ? (
                <div className="status-details">
                    <p><strong>Payment ID:</strong> {statusData.paymentId}</p>
                    <p><strong>Session ID:</strong> {statusData.sessionId}</p>
                    <p><strong>User ID:</strong> {statusData.userId}</p>
                    <p><strong>Amount:</strong> {statusData.amount.toFixed(2)}</p>
                    <p><strong>Currency:</strong> {statusData.currency}</p>
                    <p><strong>Status:</strong> {statusData.status}</p>
                    <p><strong>Payment Type:</strong> {statusData.paymentType}</p>
                </div>
            ) : (
                <p>No payment details available.</p>
            )}
        </div>
    );
};

export default Status;
