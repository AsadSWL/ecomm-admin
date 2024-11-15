import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BranchListLayer = () => {
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const branches = [
        { name: 'Branch 1', email: 'branch1@email.com', address: 'St 1, abc, xyz', payment_method: 'COD', orders: '120', status: 'Active' },
        { name: 'Branch 2', email: 'branch2@email.com', address: 'St 2, abc, xyz', payment_method: 'Card', orders: '100', status: 'Inactive' },
        { name: 'Branch 3', email: 'branch3@email.com', address: 'St 3, abc, xyz', payment_method: 'Card', orders: '80', status: 'Active' },
        { name: 'Branch 4', email: 'branch4@email.com', address: 'St 4, abc, xyz', payment_method: 'COD', orders: '160', status: 'Active' },
        { name: 'Branch 5', email: 'branch5@email.com', address: 'St 5, abc, xyz', payment_method: 'Card', orders: '200', status: 'Inactive' },
    ];

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

    const filteredSuppliers = branches.filter(branch => {
        const matchesStatus = statusFilter === 'All' || branch.status === statusFilter;
        const matchesSearchTerm =
            branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            branch.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            branch.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
            branch.products.toLowerCase().includes(searchTerm.toLowerCase()) ||
            branch.orders.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearchTerm;
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
                    <Link to="/branches-add" className="btn btn-sm btn-primary-600">
                        <i className="ri-add-line" /> Add Branch
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
                            <th scope="col">Payment Method</th>
                            <th scope="col">Orders</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentSuppliers.map((branch, index) => (
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
                                        <h6 className="text-md mb-0 fw-medium flex-grow-1">
                                            {branch.name}
                                        </h6>
                                    </div>
                                </td>
                                <td>
                                    {branch.email}
                                </td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <h6 className="text-md mb-0 fw-medium flex-grow-1">
                                            {branch.address}
                                        </h6>
                                    </div>
                                </td>
                                <td>{branch.payment_method}</td>
                                <td>{branch.orders}</td>
                                <td>
                                    <span
                                        className={`bg-${branch.status === 'Active' ? 'success' : 'warning'}-focus text-${branch.status === 'Active' ? 'success' : 'warning'}-main px-24 py-4 rounded-pill fw-medium text-sm`}
                                    >
                                        {branch.status}
                                    </span>
                                </td>
                                <td>
                                    {/* <Link
                                        to="/branches-view"
                                        className="w-32-px h-32-px me-8 bg-primary-light text-primary-600 rounded-circle d-inline-flex align-items-center justify-content-center"
                                    >
                                        <Icon icon="iconamoon:eye-light" />
                                    </Link> */}
                                    <Link
                                        to="/branches-edit"
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
                        ))}
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
                                <Icon icon="ep:d-arrow-left" className="text-xl" />
                            </Link>
                        </li>
                        {[...Array(totalPages)].map((_, index) => (
                            <li key={index} className="page-item">
                                <Link
                                    className={`page-link ${index + 1 === currentPage ? 'bg-primary-600 text-white' : 'bg-primary-50 text-secondary-light'} fw-medium radius-4 border-0 px-10 py-10 d-flex align-items-center justify-content-center h-32-px  me-8 w-32-px`}
                                    to="#"
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </Link>
                            </li>
                        ))}
                        <li className="page-item">
                            <Link
                                className="page-link text-secondary-light fw-medium radius-4 border-0 px-10 py-10 d-flex align-items-center justify-content-center h-32-px  me-8 w-32-px bg-base"
                                to="#"
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                <Icon icon="ep:d-arrow-right" className="text-xl" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BranchListLayer;
