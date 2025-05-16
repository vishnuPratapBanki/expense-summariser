import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/api/transactions')
      .then(res => {
        setTransactions(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch transactions', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading transactions...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-indigo-100">
            <th className="border border-gray-300 p-2">Date & Time</th>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">Action</th>
            <th className="border border-gray-300 p-2">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn, idx) => (
            <tr key={idx} className="even:bg-indigo-50">
              <td className="border border-gray-300 p-2">{new Date(txn.timestamp).toLocaleString()}</td>
              <td className="border border-gray-300 p-2 capitalize">{txn.category}</td>
              <td className="border border-gray-300 p-2 capitalize">{txn.action}</td>
              <td className={`border border-gray-300 p-2 ${txn.type === 'deduct' ? 'text-red-600' : 'text-green-600'}`}>
                {txn.amount.toFixed(2)}
              </td>
            </tr>
          ))}
          {transactions.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center p-4">No transactions found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
