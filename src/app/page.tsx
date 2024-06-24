import React from 'react';
import bg from './mansoor.png';

export default function App() {
    return (
        <>
            <div className="container mx-auto p-4">
                <header className="flex justify-center mb-8">
                    <img src='./mansoor.png' alt="Logo" className="h-500" />
                </header>
                <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg max-w-md mx-auto">
                    <h1 className="cobra text-4xl font-bold text-center mb-8">Donate</h1>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-lg font-medium text-gray-200">Username</label>
                            <input type="text" id="username" name="username" className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label htmlFor="amount" className="block text-lg font-medium text-gray-200">Donation Amount</label>
                            <input type="number" id="amount" name="amount" className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="w-full px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                Donate
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
