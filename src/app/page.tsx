"use client"; // This directive is necessary to indicate that this is a Client Component

import React, { useState, FormEvent } from 'react';
import QRCode from 'qrcode.react';

export default function App() {
    const [username, setUsername] = useState('');
    const [amount, setAmount] = useState('');
    const [upiLink, setUpiLink] = useState('');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const upiString = `upi://pay?pa=gajjoshi2003-2@oksbi&pn=Gaj%20Joshi&aid=uGICAgMCytK-RRg`;
        setUpiLink(upiString);
    };

    return (
        <>
            <div className="container mx-auto p-10">
                <header className="flex justify-center mb-2">
                    <img src='/mansoor.png' alt="Logo" className="h-60 w-60" />
                </header>

                <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg max-w-md mx-auto">
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
                                className="mt-1 block w-full px-4 py-2 bg-white-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bold-text"
                            />
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Generate UPI QR Code
                            </button>
                        </div>
                    </form>
                    {upiLink && (
                        <div className="mt-8 text-center">
                            <QRCode value={upiLink} size={256} />
                            <div className="mt-4">
                                <a href={upiLink} className="upi-pay1 w-full px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                                    Pay Now!
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
