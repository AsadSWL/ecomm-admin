import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SupplierListLayer = () => {
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const baseURL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/get-suppliers', {
                    headers: {
                    Authorization: `Bearer ${token}`,
                }});
                setSuppliers(response.data.suppliers || []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching suppliers:', error);
                setLoading(false);
            }
        };

        fetchSuppliers();
    }, []);

    const handleEntriesPerPageChange = (e) => {
        setEntriesPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const filteredSuppliers = suppliers.filter(supplier => {
        const matchesStatus = statusFilter === 'All' || supplier.status === statusFilter;
        return matchesStatus;
    });

    const totalPages = Math.ceil(filteredSuppliers.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const currentSuppliers = filteredSuppliers.slice(startIndex, startIndex + entriesPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="card">
            <div className="card-header d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div className="d-flex flex-wrap align-items-center gap-3">
                    <div className="d-flex align-items-center gap-2">
                        <span>Show</span>
                        <select className="form-select form-select-sm w-auto" defaultValue="10" onChange={handleEntriesPerPageChange}>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                    <div className="icon-field">
                        <input
                            type="text"
                            name="search"
                            className="form-control form-control-sm w-auto"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <span className="icon">
                            <Icon icon="ion:search-outline" />
                        </span>
                    </div>
                </div>
                <div className="d-flex flex-wrap align-items-center gap-3">
                    <select className="form-select form-select-sm w-auto" value={statusFilter} onChange={handleStatusFilterChange}>
                        <option value="All">All</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    <Link to="/suppliers-add" className="btn btn-sm btn-primary-600">
                        <i className="ri-add-line" /> Add Supplier
                    </Link>
                </div>
            </div>
            <div className="card-body">
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
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Address</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            Array(entriesPerPage).fill().map((_, index) => (
                                <tr key={index}>
                                    <td><Skeleton width={30} /></td>
                                    <td><Skeleton height={30} width={30} circle /><Skeleton width={80} /></td>
                                    <td><Skeleton width={100} /></td>
                                    <td><Skeleton width={100} /></td>
                                    <td><Skeleton width={80} /></td>
                                    <td><Skeleton width={80} /><Skeleton height={30} width={30} circle /><Skeleton height={30} width={30} circle /></td>
                                </tr>
                            ))
                        ) : (
                            currentSuppliers.map((supplier, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="form-check style-check d-flex align-items-center">
                                            <label className="form-check-label" htmlFor={`check${index + 1}`}>
                                                {startIndex + index + 1}
                                            </label>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={baseURL + supplier.icon}
                                                alt={supplier.name}
                                                className="flex-shrink-0 me-12 radius-8"
                                                width={50}
                                            />
                                            <h6 className="text-md mb-0 fw-medium flex-grow-1">
                                                {supplier?.name}
                                            </h6>
                                        </div>
                                    </td>
                                    <td>{supplier.email}</td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <h6 className="text-md mb-0 fw-medium flex-grow-1">
                                                {supplier?.address.street + ", " + supplier?.address.city}
                                            </h6>
                                        </div>
                                    </td>
                                    <td>
                                        <span
                                            className={`bg-${supplier.status === 'Active' ? 'success' : 'warning'}-focus text-${supplier.status === 'Active' ? 'success' : 'warning'}-main px-24 py-4 rounded-pill fw-medium text-sm`}
                                        >
                                            {supplier.status}
                                        </span>
                                    </td>
                                    <td>
                                        <Link
                                            to={`/supplier-products/${supplier._id}`}
                                            className=" me-8 bg-info-focus text-primary px-24 py-4 rounded-pill fw-medium text-sm"
                                        >
                                            View Products
                                        </Link>
                                        <Link
                                            to={`/suppliers-edit/${supplier._id}`}
                                            className="w-32-px h-32-px me-8 bg-success-focus text-success-main rounded-circle d-inline-flex align-items-center justify-content-center"
                                        >
                                            <Icon icon="lucide:edit" />
                                        </Link>
                                        <Link
                                            to="#"
                                            className="w-32-px h-32-px me-8 bg-danger-focus text-danger-main rounded-circle d-inline-flex align-items-center justify-content-center"
                                        >
                                            <Icon icon="mingcute:delete-2-line" />
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mt-24">
                    <span>
                        Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, filteredSuppliers.length)} of {filteredSuppliers.length} entries
                    </span>
                    <ul className="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
                        <li className="page-item">
                            <Link
                                className="page-link text-secondary-light fw-medium radius-4 border-0 px-10 py-10 d-flex align-items-center justify-content-center h-32-px  me-8 w-32-px bg-base"
                                to="#"
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                <Icon icon="ep:d-arrow-left" />
                            </Link>
                        </li>
                        {[...Array(totalPages).keys()].map((pageNum) => (
                            <li key={pageNum} className="page-item">
                                <Link
                                    className={`page-link text-secondary-light fw-medium radius-4 border-0 px-10 py-10 d-flex align-items-center justify-content-center h-32-px me-8 w-32-px ${currentPage === pageNum + 1 ? 'bg-primary-600 text-white' : 'bg-base'}`}
                                    to="#"
                                    onClick={() => handlePageChange(pageNum + 1)}
                                >
                                    {pageNum + 1}
                                </Link>
                            </li>
                        ))}
                        <li className="page-item">
                            <Link
                                className="page-link text-secondary-light fw-medium radius-4 border-0 px-10 py-10 d-flex align-items-center justify-content-center h-32-px  me-8 w-32-px bg-base"
                                to="#"
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                <Icon icon="ep:d-arrow-right" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SupplierListLayer;
