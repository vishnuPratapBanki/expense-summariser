// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Transactions from './Transactions';
//
//
// export default function App() {
//   const [balance, setBalance] = useState({ familyMoney: 0, hiddenSavings: 0 });
//   const [amount, setAmount] = useState(''); // keep amount as string to handle decimals correctly
//   const [action, setAction] = useState({ type: '', category: '' });
//   const [loading, setLoading] = useState(false);
//
//   const fetchBalance = async () => {
//     try {
//       const res = await axios.get('http://localhost:8080/api/balance');
//       setBalance(res.data);
//     } catch (error) {
//       console.error('Failed to fetch balance', error);
//     }
//   };
//
//   useEffect(() => {
//     fetchBalance();
//   }, []);
//
//   const handleUpdate = async () => {
//     if (!action.type || !action.category || !amount) return;
//
//     const parsedAmount = parseFloat(amount);
//     if (isNaN(parsedAmount)) return;
//
//     setLoading(true);
//     try {
//       const url = `http://localhost:8080/api/balance/${action.category}/${action.type}?amount=${parsedAmount}`;
//       await axios.post(url);
//       setAmount('');
//       setAction({ type: '', category: '' });
//       fetchBalance();
//     } catch (error) {
//       console.error('Update failed', error);
//     }
//     setLoading(false);
//   };
//
//   const total = balance.familyMoney + balance.hiddenSavings;
//
//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-12">
//       <h1 className="text-3xl font-extrabold mb-6 text-center text-indigo-600">💰 Money Tracker</h1>
//
//       <div className="bg-indigo-50 rounded-xl p-6 mb-8 shadow-inner">
//         <p className="text-xl font-semibold mb-2">Total Balance: <span className="text-indigo-700">₹{total.toFixed(2)}</span></p>
//         <p className="text-green-700 font-medium">Money Shown to Family: ₹{balance.familyMoney.toFixed(2)}</p>
//         <p className="text-blue-700 font-medium">Hidden Savings: ₹{balance.hiddenSavings.toFixed(2)}</p>
//       </div>
//
//       <div className="flex flex-col gap-4">
//         <input
//           type="number"
//           step="any"
//           placeholder="Enter amount"
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//         />
//
//         <select
//           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
//           value={action.category}
//           onChange={(e) => setAction({ ...action, category: e.target.value })}
//         >
//           <option value="">Select Category</option>
//           <option value="family">Family</option>
//           <option value="savings">Savings</option>
//         </select>
//
//         <select
//           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
//           value={action.type}
//           onChange={(e) => setAction({ ...action, type: e.target.value })}
//         >
//           <option value="">Select Action</option>
//           <option value="add">Add</option>
//           <option value="deduct">Deduct</option>
//         </select>
//
//         <button
//           className={`w-full py-3 rounded-lg text-white font-semibold transition
//             ${loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
//           onClick={handleUpdate}
//           disabled={loading || !amount || !action.type || !action.category}
//         >
//           {loading ? 'Updating...' : 'Submit'}
//         </button>
//       </div>
//
//       <Transactions />
//     </div>
//
//   );
// }
import { useEffect, useState } from 'react';
import axios from 'axios';
import Transactions from './Transactions';

export default function App() {
  const [balance, setBalance] = useState({ familyMoney: 0, hiddenSavings: 0 });
  const [amount, setAmount] = useState('');
  const [action, setAction] = useState({ type: '', category: '' });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('balance'); // <-- new tab state

  const fetchBalance = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/balance');
      setBalance(res.data);
    } catch (error) {
      console.error('Failed to fetch balance', error);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  const handleUpdate = async () => {
    if (!action.type || !action.category || !amount) return;

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) return;

    setLoading(true);
    try {
      const url = `http://localhost:8080/api/balance/${action.category}/${action.type}?amount=${parsedAmount}`;
      await axios.post(url);
      setAmount('');
      setAction({ type: '', category: '' });
      fetchBalance();
    } catch (error) {
      console.error('Update failed', error);
    }
    setLoading(false);
  };

  const total = balance.familyMoney + balance.hiddenSavings;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-12">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-indigo-600">💰 Money Tracker</h1>

      {/* Tab Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-6 py-2 rounded-lg font-semibold ${
            activeTab === 'balance' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700'
          }`}
          onClick={() => setActiveTab('balance')}
        >
          Balance
        </button>
        <button
          className={`px-6 py-2 rounded-lg font-semibold ${
            activeTab === 'transactions' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700'
          }`}
          onClick={() => setActiveTab('transactions')}
        >
          Transactions
        </button>
      </div>

      {/* Conditional rendering based on active tab */}
      {activeTab === 'balance' && (
        <>
          <div className="bg-indigo-50 rounded-xl p-6 mb-8 shadow-inner">
            <p className="text-xl font-semibold mb-2">
              Total Balance: <span className="text-indigo-700">₹{total.toFixed(2)}</span>
            </p>
            <p className="text-green-700 font-medium">Money Shown to Family: ₹{balance.familyMoney.toFixed(2)}</p>
            <p className="text-blue-700 font-medium">Hidden Savings: ₹{balance.hiddenSavings.toFixed(2)}</p>
          </div>

          <div className="flex flex-col gap-4">
            <input
              type="number"
              step="any"
              placeholder="Enter amount"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              value={action.category}
              onChange={(e) => setAction({ ...action, category: e.target.value })}
            >
              <option value="">Select Category</option>
              <option value="family">Family</option>
              <option value="savings">Savings</option>
            </select>

            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              value={action.type}
              onChange={(e) => setAction({ ...action, type: e.target.value })}
            >
              <option value="">Select Action</option>
              <option value="add">Add</option>
              <option value="deduct">Deduct</option>
            </select>

            <button
              className={`w-full py-3 rounded-lg text-white font-semibold transition
                ${loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
              onClick={handleUpdate}
              disabled={loading || !amount || !action.type || !action.category}
            >
              {loading ? 'Updating...' : 'Submit'}
            </button>
          </div>
        </>
      )}

      {activeTab === 'transactions' && <Transactions />}
    </div>
  );
}
