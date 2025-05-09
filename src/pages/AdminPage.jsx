// src/pages/AdminPage.jsx
import React, { useEffect, useState } from 'react';
import productService from '../appwrite/Product';
import shiftAuthService from '../appwrite/ShiftAuthService';
import recycleAuthService from '../appwrite/RecycleAuth';
import authService from '../appwrite/Auth';

function AdminPage() {
    const [section, setSection] = useState('orders');
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);

    // Fetch data based on the selected section
    const fetchData = async () => {
        try {
            let response;
            if (section === 'orders') {
                response = await productService.listAllOrders();
            } else if (section === 'shifting') {
                response = await shiftAuthService.listShiftingAgency();
            } else if (section === 'recycle') {
                response = await recycleAuthService.listRecycleAgency();
            } else if (section === 'users') {
                response = await authService.listAllUsers();
            }

            if (response && response.documents.length > 0) {
                const firstItem = response.documents[0];
                setColumns(Object.keys(firstItem));
                setData(response.documents);
            } else {
                setColumns([]);
                setData([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [section]);

    return (
        <div className="p-8">
            {/* Header */}
            <div className="bg-gray-800 text-white py-4 px-6 flex gap-8 shadow-md rounded-lg mb-8">
                <button onClick={() => setSection('orders')} className="hover:text-yellow-400">Orders</button>
                <button onClick={() => setSection('shifting')} className="hover:text-yellow-400">Shift Agencies</button>
                <button onClick={() => setSection('recycle')} className="hover:text-yellow-400">Recycle Agencies</button>
                <button onClick={() => setSection('users')} className="hover:text-yellow-400">Users</button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                {data.length > 0 ? (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                {columns.map((col, idx) => (
                                    <th key={idx} className="p-4 bg-gray-100 border-b text-gray-600">
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, rowIndex) => (
                                <tr key={rowIndex} className="border-b hover:bg-gray-50">
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex} className="p-4 border-b">
                                            {item[col] || '-'}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="p-8 text-center text-gray-500">No data available</p>
                )}
            </div>
        </div>
    );
}

export default AdminPage;
