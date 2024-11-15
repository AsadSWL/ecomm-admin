import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddBranchLayer = () => {
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="card h-100 p-0 radius-12 overflow-hidden">
            <div className="card-body p-40">
                <form action="#" className='row'>
                    <div className="mb-20 col-6">
                        <label
                            htmlFor="name"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            Branch Name <span className="text-danger-600">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control radius-8"
                            id="name"
                            placeholder="Enter Branch Name"
                        />
                    </div>
                    <div className="mb-20 col-6">
                        <label
                            htmlFor="streetAddress"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            Street Address <span className="text-danger-600">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control radius-8"
                            id="streetAddress"
                            placeholder="Enter Street Address"
                        />
                    </div>
                    <div className="mb-20 col-6">
                        <label
                            htmlFor="city"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            City <span className="text-danger-600">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control radius-8"
                            id="city"
                            placeholder="Enter City"
                        />
                    </div>
                    <div className="mb-20 col-6">
                        <label
                            htmlFor="postalCode"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            Postcode <span className="text-danger-600">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control radius-8"
                            id="postalCode"
                            placeholder="Enter Postcode"
                        />
                    </div>
                    <div className="mb-20 col-6">
                        <label
                            htmlFor="status"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            Payment Method
                            <span className="text-danger-600">*</span>{" "}
                        </label>
                        <select
                            className="form-control radius-8 form-select"
                            id="status"
                        >
                            <option disabled>
                                Select Payment Method
                            </option>
                            <option value="COD">COD</option>
                            <option value="Card">Card</option>
                        </select>
                    </div>
                    <div className="mb-20 col-6">
                        <label
                            htmlFor="status"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            Status
                            <span className="text-danger-600">*</span>{" "}
                        </label>
                        <select
                            className="form-control radius-8 form-select"
                            id="status"
                        >
                            <option disabled>
                                Select Status
                            </option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <div className="d-flex align-items-center justify-content-center gap-3">
                        <button
                            onClick={handleCancel}
                            type="button"
                            className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default AddBranchLayer;