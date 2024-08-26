import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BASE_URL from './config';

const PaymentForm = ({ token }) => {
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        amount: '',
        currency: '',
        paymentType: 'CARD_INFO',
        use3Ds: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/payments/process`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const paymentResponse = response.data;

            if (paymentResponse.redirectUrl) {
                console.log(paymentResponse.redirectUrl);
                window.location.href = paymentResponse.redirectUrl;
            } else {
                navigate(`/status?cko-session-id=${response.data.id}`);
            }
        } catch (error) {
            alert(JSON.stringify(error.response.data));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Payment Form</h2>
            <table>
                <tbody>
                <tr>
                    <td>
                        <label>Card Number:</label>
                        <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            required
                        />
                    </td>
                    <td>
                        <label>Expiry Month:</label>
                        <input
                            type="text"
                            name="expiryMonth"
                            value={formData.expiryMonth}
                            onChange={handleChange}
                            required
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Expiry Year:</label>
                        <input
                            type="text"
                            name="expiryYear"
                            value={formData.expiryYear}
                            onChange={handleChange}
                            required
                        />
                    </td>
                    <td>
                        <label>CVV:</label>
                        <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            required
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Amount:</label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                        />
                    </td>
                    <td>
                        <label>Currency:</label>
                        <input
                            type="text"
                            name="currency"
                            value={formData.currency}
                            onChange={handleChange}
                            required
                        />
                    </td>
                </tr>
                <tr>
                    <td colSpan="2">
                        <label>Payment Type:</label>
                        <select
                            name="paymentType"
                            value={formData.paymentType}
                            onChange={handleChange}
                            required
                        >
                            <option value="CARD_INFO">Card Info</option>
                            <option value="CARD_TOKEN">Card Token</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td colSpan="2">
                        <label>3DS:</label>
                        <input
                            type="checkbox"
                            name="use3Ds"
                            checked={formData.use3Ds}
                            onChange={(e) =>
                                setFormData({ ...formData, use3Ds: e.target.checked })
                            }
                        />
                    </td>
                </tr>
                </tbody>
            </table>
            <button type="submit">Pay</button>
        </form>
    );
};

export default PaymentForm;
