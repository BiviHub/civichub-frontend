import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css'; // Keep this for now, but we’ll adjust it

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
            <div className="flex space-x-4 mb-8">
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo h-16" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo h-16" alt="React logo" />
                </a>
            </div>
            <h1 className="text-4xl font-bold mb-4">Vite + React</h1>
            <div className="card bg-gray-800 p-6 rounded-lg shadow-lg">
                <button
                    onClick={() => setCount((count) => count + 1)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                    count is {count}
                </button>
                <p className="mt-4">
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs mt-4 text-gray-400">
                Click on the Vite and React logos to learn more
            </p>
        </div>
    );
}

export default App;
