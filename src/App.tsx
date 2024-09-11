import axios from 'axios';
import './App.css'

function App() {

  const url = "http://localhost:8000/subscription/calculate/"
  const token = "553c54e09803935a67c7b058bae77d5becac5c10";

  const handlePay = async () => {
    try {
      // Make a request to your backend to get Razorpay order details
      const response = await axios.post(url, {}, {
        headers: {
          'Authorization': `Token ${token}`, // Adding the token to the request header
          'Content-Type': 'application/json'  // Set content type as JSON if needed
        }
      });
      const { order_id, razorpay_key_id, amount, currency } = response.data;
      
      // Razorpay options
      const options = {
        key: razorpay_key_id, // Razorpay key ID
        amount: amount, // Amount in paise
        currency: currency, // Currency
        name: "Test Transaction",
        description: "Test Payment",
        order_id: order_id, // Order ID from the backend
        handler: function (response: any) {
          alert("Payment Successful");
          console.log("Payment ID:", response.razorpay_payment_id);
          console.log("Order ID:", response.razorpay_order_id);
          console.log("Signature:", response.razorpay_signature);
        },
        prefill: {
          name: "John Doe", // Optional prefill
          email: "johndoe@example.com",
          contact: "9999999999"
        },
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: "#F37254"
        }
      };

      // Open Razorpay payment portal
      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    } catch (error) {
      console.error("Error while creating Razorpay order:", error);
      alert("Payment failed");
    }
  };

  return (
    <>
      <h1>Razorpay Test</h1>
      <div className="card">
        <button onClick={handlePay}>
          Pay
        </button>
        <p>
          URL : <code>{url}</code> 
        </p>
      </div>
    </>
  )
}

export default App
