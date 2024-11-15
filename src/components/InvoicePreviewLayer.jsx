import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const InvoicePreviewLayer = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get-order/${id}`, {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                setOrder(response.data.order[0]);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="card">
            <div className="card-body py-40">
                <div className="row justify-content-center" id="invoice">
                    <div className="col-lg-8">
                        <div className="shadow-4 border radius-8">
                            <div className="py-28 px-20">
                                <div className="d-flex flex-wrap justify-content-between align-items-end gap-3">
                                    <div>
                                        <img src="../assets/images/logo.png" alt="image_icon" className="mb-8" width={150} />
                                    </div>
                                    <div>
                                        <table className="text-sm text-secondary-light">
                                            <tbody>
                                                <tr>
                                                    <td>Issus Date</td>
                                                    <td className="ps-8">:{new Date(order.createdAt).toLocaleDateString('en-GB')}</td>
                                                </tr>
                                                <tr>
                                                    <td>Branch</td>
                                                    <td className="ps-8">:{order?.branch?.firstname}</td>
                                                </tr>
                                                <tr>
                                                    <td>Payment Method</td>
                                                    <td className="ps-8">:{order.status}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="mt-24">
                                    <div className="table-responsive scroll-sm">
                                        <table className="table bordered-table text-sm">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="text-sm">
                                                        Items
                                                    </th>
                                                    <th scope="col" className="text-sm">
                                                        Supplier
                                                    </th>
                                                    <th scope="col" className="text-sm">
                                                        Qty
                                                    </th>
                                                    <th scope="col" className="text-sm">
                                                        Unit Price
                                                    </th>
                                                    <th scope="col" className="text-sm">
                                                        VAT %
                                                    </th>
                                                    <th scope="col" className="text-end text-sm">
                                                        Price
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.products.map((item, index) => {
                                                    const productPriceWithVAT = item.product.price * 1.20;
                                                    const productVAT = item.product.price * 0.20;

                                                    return (
                                                    <tr key={index}>
                                                        <td>{item.product.name}</td>
                                                        <td>{order.supplier.name}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>{item.product.price}</td>
                                                        <td>20%</td>
                                                        <td className="text-end">{productPriceWithVAT.toFixed(2) * item.quantity}</td>
                                                    </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="d-flex flex-wrap justify-content-between gap-3">
                                        <div>
                                        </div>
                                        <div>
                                            <table className="text-sm">
                                                <tbody>
                                                    <tr>
                                                        <td className="pe-64">Subtotal:</td>
                                                        <td className="pe-16">
                                                            <span className="text-primary-light fw-semibold">
                                                                {order.products.reduce((total, item) => total + (item.product.price * 1.20) * item.quantity, 0).toFixed(2)}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="pe-64">VAT:</td>
                                                        <td className="pe-16">
                                                            <span className="text-primary-light fw-semibold">
                                                                {order.products.reduce((total, item) => total + item.product.price * 0.20 * item.quantity, 0).toFixed(2)}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="pe-64 pt-4">
                                                            <span className="text-primary-light fw-semibold">
                                                                Total:
                                                            </span>
                                                        </td>
                                                        <td className="pe-16 pt-4">
                                                            <span className="text-primary-light fw-semibold">
                                                            {(order.products.reduce((total, item) => total + item.product.price * item.quantity, 0) + 
                                                                order.products.reduce((total, item) => total + item.product.price * 0.20 * item.quantity, 0))
                                                                    .toFixed(2)}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-64">
                                    <p className="text-center text-secondary-light text-sm fw-semibold">
                                        Thank you for your Order!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default InvoicePreviewLayer;