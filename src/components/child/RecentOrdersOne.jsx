import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const RecentOrdersOne = () => {
    const [entriesPerPage, setEntriesPerPage] = useState(5);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get('https://ecomm-backend-sooty.vercel.app/api/get-all-orders', {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                setOrders(response.data.orders);
                setLoading(false);
                console.log(response.data.orders);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
                setLoading(false);
            });
    }, []);

    const currentOrders = orders.slice(1, 5);

    return (
        <div className="col-xxl-9 col-lg-6">
            <div className="card h-100">
                <div className="card-body p-24">
                    <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between mb-20">
                        <h6 className="mb-2 fw-bold text-lg mb-0">Recent Orders</h6>
                        <Link
                            to="/order-list"
                            className="text-primary-600 hover-text-primary d-flex align-items-center gap-1"
                        >
                            View All
                            <Icon
                                icon="solar:alt-arrow-right-linear"
                                className="icon"
                            />
                        </Link>
                    </div>
                    <div className="table-responsive scroll-sm">
                        <table className="table bordered-table mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        <div className="form-check style-check d-flex align-items-center">
                                            <label className="form-check-label" htmlFor="checkAll">
                                                S.L
                                            </label>
                                        </div>
                                    </th>
                                    <th scope="col">Branch</th>
                                    <th scope="col">Suppliers</th>
                                    <th scope="col">Order Date</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Payment Method</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentOrders.map((order, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="form-check style-check d-flex align-items-center">
                                                <label className="form-check-label" htmlFor={`check${index + 1}`}>
                                                    {index + 1}
                                                </label>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <h6 className="text-md mb-0 fw-medium flex-grow-1">
                                                    {order?.branch?.firstname + " " + order?.branch?.lastname}
                                                </h6>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <h6 className="text-md mb-0 fw-medium flex-grow-1">
                                                    {order?.supplier?.name}
                                                </h6>
                                            </div>
                                        </td>
                                        <td>{new Date(order?.createdAt).toLocaleDateString('en-GB', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </td>
                                        <td>{order?.totalPrice}</td>
                                        <td>
                                            {order?.status}
                                        </td>
                                        <td>
                                            <Link
                                                to={`/order-view/${order._id}`}
                                                className="w-32-px h-32-px me-8 bg-primary-light text-primary-600 rounded-circle d-inline-flex align-items-center justify-content-center"
                                            >
                                                <Icon icon="iconamoon:eye-light" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecentOrdersOne