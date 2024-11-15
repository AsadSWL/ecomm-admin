import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProductLayer = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate(-1);
    };

    const handleFileChange = (e) => {
        if (e.target.files.length) {
            const src = URL.createObjectURL(e.target.files[0]);
            setImagePreview(src);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);
    return (
        <div className="card h-100 p-0 radius-12 overflow-hidden">
            <div className="card-body p-40">
                <h6 className="text-md text-primary-light mb-16">Product Image</h6>
                {/* Upload Image Start */}
                <div className="upload-image-wrapper d-flex align-items-center gap-3">
                    {/* Image preview section */}
                    {imagePreview ? (
                        <div className="uploaded-img position-relative h-120-px w-120-px border input-form-light radius-8 overflow-hidden border-dashed bg-neutral-50">
                            <button
                                type="button"
                                onClick={removeImage}
                                className="uploaded-img__remove position-absolute top-0 end-0 z-1 text-2xxl line-height-1 me-8 mt-8 d-flex"
                                aria-label="Remove uploaded image"
                            >
                                <Icon
                                    icon="radix-icons:cross-2"
                                    className="text-xl text-danger-600"
                                ></Icon>
                            </button>
                            <img
                                id="uploaded-img__preview"
                                className="w-100 h-100 object-fit-cover"
                                src={imagePreview}
                                alt="Preview"
                            />
                        </div>
                    ) : (
                        <label
                            className="upload-file h-120-px w-120-px border input-form-light radius-8 overflow-hidden border-dashed bg-neutral-50 bg-hover-neutral-200 d-flex align-items-center flex-column justify-content-center gap-1"
                            htmlFor="upload-file"
                        >
                            <Icon
                                icon="solar:camera-outline"
                                className="text-xl text-secondary-light"
                            ></Icon>
                            <span className="fw-semibold text-secondary-light">Upload</span>
                        </label>
                    )}

                    {/* Always render the input, but hide it */}
                    <input
                        id="upload-file"
                        type="file"
                        onChange={handleFileChange}
                        hidden
                        ref={fileInputRef}
                        accept="image/*" // Optional: restrict to image files
                    />
                </div>
                {/* Upload Image End */}
                <form action="#" className='row'>
                    <div className="mb-20 col-6">
                        <label
                            htmlFor="name"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            Product Name <span className="text-danger-600">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control radius-8"
                            id="name"
                            placeholder="Enter Product Name"
                        />
                    </div>
                    <div className="mb-20 col-6">
                        <label
                            htmlFor="sku"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            SKU <span className="text-danger-600">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control radius-8"
                            id="sku"
                            placeholder="Enter product sku"
                        />
                    </div>
                    <div className="mb-20 col-6">
                        <label
                            htmlFor="price"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            Price <span className="text-danger-600">*</span>
                        </label>
                        <input
                            type="number"
                            className="form-control radius-8"
                            id="price"
                            placeholder="Enter product price"
                        />
                    </div>
                    <div className="mb-20 col-6">
                        <label
                            htmlFor="vat"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            VAT <span className="text-danger-600">*</span>
                        </label>
                        <input
                            type="number"
                            className="form-control radius-8"
                            id="vat"
                            placeholder="Enter VAT"
                        />
                    </div>
                    <div className="mb-20 col-6">
                        <label
                            htmlFor="category"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            Category
                            <span className="text-danger-600">*</span>{" "}
                        </label>
                        <select
                            className="form-control radius-8 form-select"
                            id="category"
                        >
                            <option disabled>
                                Select Category
                            </option>
                            <option value="Category 1">Category 1</option>
                            <option value="Category 2">Category 2</option>
                        </select>
                    </div>
                    <div className="mb-20 col-6">
                        <label
                            htmlFor="supplier"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            Supplier
                            <span className="text-danger-600">*</span>{" "}
                        </label>
                        <select
                            className="form-control radius-8 form-select"
                            id="supplier"
                        >
                            <option disabled>
                                Select Supplier
                            </option>
                            <option value="Supplier 1">Supplier 1</option>
                            <option value="Supplier 2">Supplier 2</option>
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
                    <div className="mb-20 col-12">
                        <label
                            htmlFor="desc"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                            Description
                        </label>
                        <textarea
                            name="#0"
                            className="form-control radius-8"
                            id="desc"
                            placeholder="Write description..."
                            defaultValue={""}
                        />
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

export default AddProductLayer;