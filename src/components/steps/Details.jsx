import React, { useContext, useState } from "react";
import { StepperContext } from "../../contexts/StepperContext";

const Details = () => {
  const { userData, setUserData } = useContext(StepperContext);
  const [errors, setErrors] = useState({});

  const cargoTypes = [
    "General Cargo",
    "Hazardous Materials",
    "Refrigerated",
    "Oversized",
  ];

  const shippingItems = [
    { id: "electronics", name: "Electronics", baseWeight: 5, maxWeight: 1000 },
    { id: "furniture", name: "Furniture", baseWeight: 50, maxWeight: 5000 },
    {
      id: "machinery",
      name: "Industrial Machinery",
      baseWeight: 100,
      maxWeight: 10000,
    },
    {
      id: "perishables",
      name: "Perishable Goods",
      baseWeight: 10,
      maxWeight: 2000,
    },
    { id: "documents", name: "Documents", baseWeight: 1, maxWeight: 50 },
    { id: "other", name: "Other", baseWeight: 0, maxWeight: 10000 },
  ];

  const validateField = (name, value, allValues = {}) => {
    switch (name) {
      case "shippingItem":
        return !value ? "Please select a shipping item" : "";

      case "cargoType":
        return !value ? "Please select a cargo type" : "";

      case "pickupAddress":
        return !value.trim()
          ? "Pickup address is required"
          : value.length < 10
          ? "Please enter a complete address"
          : "";

      case "deliveryAddress":
        return !value.trim()
          ? "Delivery address is required"
          : value.length < 10
          ? "Please enter a complete address"
          : value === allValues.pickupAddress
          ? "Delivery address must be different from pickup address"
          : "";

      case "deliveryDate":
        const today = new Date();
        const selectedDate = new Date(value);
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);

        return !value
          ? "Delivery date is required"
          : selectedDate < today
          ? "Delivery date cannot be in the past"
          : selectedDate > maxDate
          ? "Delivery date cannot be more than 3 months in advance"
          : "";

      case "cargoWeight":
        const weight = parseFloat(value);
        const selectedItem = shippingItems.find(
          (item) => item.id === allValues.shippingItem
        );
        const maxWeight = selectedItem ? selectedItem.maxWeight : 0;

        return !value
          ? "Weight is required"
          : weight <= 0
          ? "Weight must be greater than 0"
          : maxWeight && weight > maxWeight
          ? `Maximum weight for ${selectedItem.name} is ${maxWeight}kg`
          : "";

      case "specialInstructions":
        return value.length > 500
          ? "Special instructions cannot exceed 500 characters"
          : "";

      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));

    // Validate the changed field and update errors
    const error = validateField(name, value, { ...userData, [name]: value });
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    // Special handling for shipping item selection
    if (name === "shippingItem") {
      const selectedItem = shippingItems.find((item) => item.id === value);
      if (selectedItem) {
        const newData = {
          ...userData,
          cargoWeight: selectedItem.baseWeight,
          shippingItemName: selectedItem.name,
        };
        setUserData(newData);

        // Validate weight after auto-setting
        const weightError = validateField(
          "cargoWeight",
          selectedItem.baseWeight,
          newData
        );
        setErrors((prev) => ({
          ...prev,
          cargoWeight: weightError,
        }));
      }
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value, userData);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      <div>
        <div className="font-bold text-gray-500 text-xs uppercase mb-2">
          Shipping Item
        </div>
        <select
          name="shippingItem"
          value={userData.shippingItem || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full p-2 border rounded ${
            errors.shippingItem ? "border-red-500" : "border-gray-200"
          }`}
        >
          <option value="">Select Shipping Item</option>
          {shippingItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        {errors.shippingItem && (
          <p className="text-red-500 text-xs mt-1">{errors.shippingItem}</p>
        )}
      </div>

      <div>
        <div className="font-bold text-gray-500 text-xs uppercase mb-2">
          Cargo Type
        </div>
        <select
          name="cargoType"
          value={userData.cargoType || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full p-2 border rounded ${
            errors.cargoType ? "border-red-500" : "border-gray-200"
          }`}
        >
          <option value="">Select Cargo Type</option>
          {cargoTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.cargoType && (
          <p className="text-red-500 text-xs mt-1">{errors.cargoType}</p>
        )}
      </div>

      <div>
        <div className="font-bold text-gray-500 text-xs uppercase mb-2">
          Pickup Address
        </div>
        <input
          name="pickupAddress"
          value={userData.pickupAddress || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter full pickup address"
          className={`w-full p-2 border rounded ${
            errors.pickupAddress ? "border-red-500" : "border-gray-200"
          }`}
        />
        {errors.pickupAddress && (
          <p className="text-red-500 text-xs mt-1">{errors.pickupAddress}</p>
        )}
      </div>

      <div>
        <div className="font-bold text-gray-500 text-xs uppercase mb-2">
          Delivery Address
        </div>
        <input
          name="deliveryAddress"
          value={userData.deliveryAddress || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter full delivery address"
          className={`w-full p-2 border rounded ${
            errors.deliveryAddress ? "border-red-500" : "border-gray-200"
          }`}
        />
        {errors.deliveryAddress && (
          <p className="text-red-500 text-xs mt-1">{errors.deliveryAddress}</p>
        )}
      </div>

      <div>
        <div className="font-bold text-gray-500 text-xs uppercase mb-2">
          Preferred Delivery Date
        </div>
        <input
          type="date"
          name="deliveryDate"
          value={userData.deliveryDate || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          min={new Date().toISOString().split("T")[0]}
          className={`w-full p-2 border rounded ${
            errors.deliveryDate ? "border-red-500" : "border-gray-200"
          }`}
        />
        {errors.deliveryDate && (
          <p className="text-red-500 text-xs mt-1">{errors.deliveryDate}</p>
        )}
      </div>

      <div>
        <div className="font-bold text-gray-500 text-xs uppercase mb-2">
          Weight (kg)
        </div>
        <input
          type="number"
          name="cargoWeight"
          value={userData.cargoWeight || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter cargo weight"
          className={`w-full p-2 border rounded ${
            errors.cargoWeight ? "border-red-500" : "border-gray-200"
          }`}
        />
        {errors.cargoWeight && (
          <p className="text-red-500 text-xs mt-1">{errors.cargoWeight}</p>
        )}
      </div>

      <div>
        <div className="font-bold text-gray-500 text-xs uppercase mb-2">
          Special Instructions
        </div>
        <textarea
          name="specialInstructions"
          value={userData.specialInstructions || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Any special handling requirements"
          className={`w-full p-2 border rounded ${
            errors.specialInstructions ? "border-red-500" : "border-gray-200"
          }`}
          rows={3}
        />
        {errors.specialInstructions && (
          <p className="text-red-500 text-xs mt-1">
            {errors.specialInstructions}
          </p>
        )}
      </div>
    </div>
  );
};

export default Details;
