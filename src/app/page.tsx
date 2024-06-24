"use client"; // This directive is necessary to indicate that this is a Client Component

import React, { useState, FormEvent } from 'react';
import Script from 'next/script';

interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id?: string;
    razorpay_signature?: string;
}

export default function App() {
    const [username, setUsername] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const razorpayOptions = {
            key: 'rzp_test_gWRG1xXp3xxAYs', // Replace with your Razorpay key_id
            amount: Number(amount) * 100, // Amount is in paisa (Indian currency)
            currency: 'INR', // You can change currency if needed
            name: 'Prime 999 Boook ',
            description: 'Donation',
            image: '/mansoor.png', // Path to your logo image in the public directory
            handler: function(response: RazorpayResponse) {
                alert(`Payment ID: ${response.razorpay_payment_id}`);
                // You can handle the success or failure response here
            },
            prefill: {
                name: username,
                email: 'example@example.com', // Replace with user's email
                contact: '9999999999' // Replace with user's mobile number
            },
            theme: {
                color: '#3399cc' // You can customize the color
            }
        };

        const rzp = new (window as any).Razorpay(razorpayOptions);
        rzp.open();
    };

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
            <div className="container mx-auto p-10">
                <header className="flex justify-center mb-8">
                    <img src='/mansoor.png' alt="Logo" className="h-72 w-72" />
                </header>

                <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg max-w-md mx-auto">
                <img src='/D247.png' alt="Logo" className="h-15 w-15 mb-10" />
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" className="block text-lg font-medium text-gray-200">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 bg-white-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bold-text"
                            />
                        </div>
                        <div>
                            <label htmlFor="amount" className="block text-lg font-medium text-gray-200">Amount</label>
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 bg-white-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bold-text" // Apply bold-text class here
                                />
                                                            <p className="text-sm text-gray-500 mt-1">* 10% Signing Bonus . 7% Standard deposit</p>

                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Donate
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
