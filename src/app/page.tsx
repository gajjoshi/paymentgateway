"use client";

import React, { useState, FormEvent } from 'react';
import QRCode from 'qrcode.react';
import axios from 'axios';

export default function App() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [upiLink, setUpiLink] = useState('');
    const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);

    const handleGenerateQR = () => {
        const upiString = `upi://pay?pa=7506127222@kotak&pn=GAJ BHAVIK JOSHI&am=${amount}`;
        setUpiLink(upiString);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('amount', amount);
        if (paymentScreenshot) {
            formData.append('paymentScreenshot', paymentScreenshot);
        }

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('User created successfully with screenshot');
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error creating user');
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setPaymentScreenshot(event.target.files[0]);
        }
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
                            <label htmlFor="email" className="block text-lg font-medium text-gray-200">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                            <p className="text-sm text-gray-500 mt-1">*</p>
                        </div>
                        <div>
                            <label htmlFor="paymentScreenshot" className="block text-lg font-medium text-gray-200">Upload Payment Screenshot</label>
                            <input
                                type="file"
                                id="paymentScreenshot"
                                name="paymentScreenshot"
                                onChange={handleFileChange}
                                className="mt-1 block w-full px-4 py-2 bg-white-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bold-text"
                            />
                            {paymentScreenshot && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-500">Screenshot: {paymentScreenshot.name}</p>
                                </div>
                            )}
                        </div>
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={handleGenerateQR}
                                className="w-full px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Generate UPI QR Code
                            </button>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                Submit
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
