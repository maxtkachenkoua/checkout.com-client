# Payment Processing Application [Task Task]

This project is a React-based web application that handles user authentication and payment processing. The application integrates with a backend server for payment status tracking and utilizes the Checkout.com API for payment processing.

Backend source code: https://github.com/maxtkachenkoua/checkout.com
## Tech Stack

- **Frontend**: React.js
- **Routing**: React Router
- **HTTP Client**: Axios
- **Backend Integration**: RESTful API (Spring Boot based)
- **Payment Gateway**: Checkout.com

## Features

- **User Authentication**: Users can log in to the application using their username and password.
- **Payment Processing**: Users can submit payment details, which are processed via the Checkout.com API.
- **Tokenizing card info**: Users can choose an option to process payment request using tokenized card information
- **Payment Status Tracking**: The application tracks the payment status and provides real-time updates to the user.
- **Failure Handling**: If a payment fails, the user is notified and provided with relevant details.

## Environment Setup

### Prerequisites

- **Node.js**: Ensure you have Node.js installed.
- **npm**: npm is bundled with Node.js, but you can install it separately if needed.

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/maxtkachenkoua/checkout.com-client
2. **Install dependencies**
   ```bash
   npm install
3. **Define server backend url:port**
   ```bash   
   const BASE_URL = 'http://your-backend-url-here:port';
   export default BASE_URL;
3. **Start Development Server**
   ```bash
   npm start
4. **Open Application Page**
   ```bash 
   This will start the application on http://localhost:3000/.

## Application Overview

### Login Component

-   **Path**: `/`
-   **Functionality**:
    -   The `Login` component handles user authentication.
    -   Upon successful login, the authentication token is stored in the parent component's state.
    -   The user is then redirected to the payment form.

### Payment Form Component

-   **Path**: `/payment`
-   **Functionality**:
    -   The `PaymentForm` component allows users to input their payment details.
    -   The form collects information such as card number, expiry date, CVV, amount, currency, and payment type (either `CARD_INFO` or `CARD_TOKEN`).
    -   After submitting, the form sends a POST request to the backend to process the payment.
    -   If 3D Secure (3DS) verification is required, the user is redirected to the verification page.
    -   On successful payment, the user is redirected to the status page.

### Status Component

-   **Path**: `/status?cko-session-id=SESSION_ID`
-   **Functionality**:
    -   The `Status` component fetches the payment status using the `cko-session-id` from the URL query parameters.
    -   It displays the payment details and tracks the status until it's either `CAPTURED` or `DECLINED`.

### Failure Component

-   **Path**: `/failure?cko-session-id=SESSION_ID`
-   **Functionality**:
    -   The `Failure` component displays a detailed view of failed payment attempts.
    -   It fetches the failure details using the `cko-session-id` from the URL query parameters.