import React, { useContext, useState } from "react";
import { StepperContext } from "../../contexts/StepperContext";

const PersonalInfo = () => {
  const { userData, setUserData } = useContext(StepperContext);
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case "fullname":
        return !value.trim()
          ? "Name is required"
          : value.length < 2
          ? "Name must be at least 2 characters"
          : !/^[a-zA-Z\s]+$/.test(value)
          ? "Name can only contain letters"
          : "";

      case "email":
        return !value
          ? "Email is required"
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Invalid email format"
          : "";

      case "phoneNumber":
        return !value
          ? "Phone number is required"
          : !/^\+?[\d\s-]{10,}$/.test(value)
          ? "Invalid phone number format"
          : "";

      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      {/* Full Name Field */}
      <div className="w-full">
        <div className="font-bold text-gray-500 text-xs uppercase mb-1">
          Full Name
        </div>
        <div
          className={`bg-white p-1 flex border rounded ${
            errors.fullname ? "border-red-500" : "border-gray-200"
          }`}
        >
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            value={userData?.fullname || ""}
            name="fullname"
            placeholder="John Doe"
            className="p-2 w-full outline-none text-gray-800"
          />
        </div>
        {errors.fullname && (
          <p className="text-red-500 text-xs mt-1">{errors.fullname}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="w-full">
        <div className="font-bold text-gray-500 text-xs uppercase mb-1">
          Email
        </div>
        <div
          className={`bg-white p-1 flex border rounded ${
            errors.email ? "border-red-500" : "border-gray-200"
          }`}
        >
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            value={userData?.email || ""}
            name="email"
            type="email"
            placeholder="john@example.com"
            className="p-2 w-full outline-none text-gray-800"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      {/* Phone Number Field */}
      <div className="w-full">
        <div className="font-bold text-gray-500 text-xs uppercase mb-1">
          Phone Number
        </div>
        <div
          className={`bg-white p-1 flex border rounded ${
            errors.phoneNumber ? "border-red-500" : "border-gray-200"
          }`}
        >
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            value={userData?.phoneNumber || ""}
            name="phoneNumber"
            placeholder="+1 234 567 8900"
            className="p-2 w-full outline-none text-gray-800"
          />
        </div>
        {errors.phoneNumber && (
          <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;
