import React from 'react';
import { useAuth } from "../context/AuthContext";

const CompanyLayer = () => {
    const { user } = useAuth();

    return (
        <div className="card h-100 p-0 radius-12 overflow-hidden">
            <div className="card-body p-40">
                <form action="#">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="mb-20">
                                <label
                                    htmlFor="firstname"
                                    className="form-label fw-semibold text-primary-light text-sm mb-8"
                                >
                                    First Name <span className="text-danger-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control radius-8"
                                    id="firstname"
                                    placeholder="Enter First Name"
                                    value={user.firstname}
                                />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="mb-20">
                                <label
                                    htmlFor="lastname"
                                    className="form-label fw-semibold text-primary-light text-sm mb-8"
                                >
                                    Last Name <span className="text-danger-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control radius-8"
                                    id="lastname"
                                    placeholder="Enter Last Name"
                                    value={user.lastname}
                                />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="mb-20">
                                <label
                                    htmlFor="email"
                                    className="form-label fw-semibold text-primary-light text-sm mb-8"
                                >
                                    Email <span className="text-danger-600">*</span>
                                </label>
                                <input
                                    type="email"
                                    className="form-control radius-8"
                                    id="email"
                                    placeholder="Enter email address"
                                    value={user.email}
                                />
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center gap-3 mt-24">
                            <button
                                type="reset"
                                className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-40 py-11 radius-8"
                            >
                                Reset
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary border border-primary-600 text-md px-24 py-12 radius-8"
                            >
                                Save Change
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default CompanyLayer;