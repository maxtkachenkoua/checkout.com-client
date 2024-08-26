import React, {useState} from 'react';
import axios from 'axios';

const PaymentForm = ({token}) => {
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
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://95.216.224.218:8889/api/payments/process',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const paymentResponse = response.data;

            if (paymentResponse.redirectUrl) {
                console.log(paymentResponse.redirectUrl)
                  window.location.href = paymentResponse.redirectUrl
            } else {
                // Polling logic
                const {id} = paymentResponse;
                const pollPaymentStatus = async () => {
                    const statusResponse = await axios.get(
                        `http://95.216.224.218:8889/api/payments/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    if (statusResponse.data.status === 'CAPTURED') {
                        // Handle payment success
                    } else {
                        setTimeout(pollPaymentStatus, 5000); // Poll every 5 seconds
                    }
                };
                pollPaymentStatus();
            }
        } catch (error) {
            console.error('Payment failed:', error);
            console.log(`${token}`)
            alert('Payment failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Payment Form</h2>
            <div className="form-row">
                <div>
                    <label>Card Number:</label>
                    <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Expiry Month:</label>
                    <input
                        type="text"
                        name="expiryMonth"
                        value={formData.expiryMonth}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div className="form-row">
                <div>
                    <label>Expiry Year:</label>
                    <input
                        type="text"
                        name="expiryYear"
                        value={formData.expiryYear}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>CVV:</label>
                    <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div className="form-row">
                <div>
                    <label>Amount:</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Currency:</label>
                    <input
                        type="text"
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div>
                <label>3DS:</label>
                <input
                    type="checkbox"
                    name="use3Ds"
                    checked={formData.use3Ds}
                    onChange={(e) =>
                        setFormData({...formData, use3Ds: e.target.checked})
                    }
                />
            </div>
            <button type="submit">Pay</button>
        </form>
    );
};

export default PaymentForm;
