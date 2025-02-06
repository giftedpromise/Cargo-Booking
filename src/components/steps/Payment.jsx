import React, { useContext, useMemo, useState } from "react";
import { StepperContext } from "../../contexts/StepperContext";

const Payment = () => {
  const { userData, setUserData } = useContext(StepperContext);
  const [errors, setErrors] = useState({});
  const [showPriceDetails, setShowPriceDetails] = useState(false);

  // Constants for pricing calculations
  const PRICING_CONSTANTS = {
    basePricePerKg: 5,
    volumeRate: 10,
    hazardousFee: 500,
    maxDimension: 100, // maximum dimension in meters
    minDimension: 0.1, // minimum dimension in meters
    maxWeight: 10000, // maximum weight in kg
  };

  // Validation functions
  const validateDimension = (value, name) => {
    if (!value) return `${name} is required`;
    const num = parseFloat(value);
    if (isNaN(num)) return `${name} must be a number`;
    if (num < PRICING_CONSTANTS.minDimension)
      return `${name} must be at least ${PRICING_CONSTANTS.minDimension}m`;
    if (num > PRICING_CONSTANTS.maxDimension)
      return `${name} cannot exceed ${PRICING_CONSTANTS.maxDimension}m`;
    return "";
  };

  const validateField = (name, value) => {
    switch (name) {
      case "length":
      case "width":
      case "height":
        return validateDimension(value, name);
      case "paymentMethod":
        return !value ? "Please select a payment method" : "";
      default:
        return "";
    }
  };

  // Handle dimension changes
  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Price calculation with validation
  const pricing = useMemo(() => {
    const { basePricePerKg, volumeRate, hazardousFee } = PRICING_CONSTANTS;

    // Validate dimensions and weight
    const length = parseFloat(userData.length || 0);
    const width = parseFloat(userData.width || 0);
    const height = parseFloat(userData.height || 0);
    const weight = parseFloat(userData.cargoWeight || 0);

    if (isNaN(length) || isNaN(width) || isNaN(height) || isNaN(weight)) {
      return 0;
    }

    const weightPrice = weight * basePricePerKg;
    const volumePrice = length * width * height * volumeRate;
    const specialHandlingFee =
      userData.cargoType === "Hazardous Materials" ? hazardousFee : 0;

    const breakdown = {
      weightPrice: Math.round(weightPrice),
      volumePrice: Math.round(volumePrice),
      specialHandlingFee,
      total: Math.round(weightPrice + volumePrice + specialHandlingFee),
    };

    return breakdown;
  }, [
    userData.cargoType,
    userData.cargoWeight,
    userData.length,
    userData.width,
    userData.height,
  ]);

  // Update userData with price
  React.useEffect(() => {
    setUserData((prev) => ({ ...prev, totalPrice: pricing.total }));
  }, [pricing, setUserData]);

  return (
    <div className="space-y-4">
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Shipment Price Summary</h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-gray-600">Cargo Type:</div>
            <div className="font-semibold">
              {userData.cargoType || "Not Selected"}
            </div>

            <div className="text-gray-600">Cargo Weight:</div>
            <div className="font-semibold">{userData.cargoWeight || 0} kg</div>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-gray-500 text-xs uppercase">
              Dimensions (m)
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <input
                  type="number"
                  name="length"
                  value={userData.length || ""}
                  onChange={handleDimensionChange}
                  placeholder="Length"
                  className={`w-full p-2 border rounded ${
                    errors.length ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {errors.length && (
                  <p className="text-red-500 text-xs mt-1">{errors.length}</p>
                )}
              </div>
              <div>
                <input
                  type="number"
                  name="width"
                  value={userData.width || ""}
                  onChange={handleDimensionChange}
                  placeholder="Width"
                  className={`w-full p-2 border rounded ${
                    errors.width ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {errors.width && (
                  <p className="text-red-500 text-xs mt-1">{errors.width}</p>
                )}
              </div>
              <div>
                <input
                  type="number"
                  name="height"
                  value={userData.height || ""}
                  onChange={handleDimensionChange}
                  placeholder="Height"
                  className={`w-full p-2 border rounded ${
                    errors.height ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {errors.height && (
                  <p className="text-red-500 text-xs mt-1">{errors.height}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={() => setShowPriceDetails(!showPriceDetails)}
            className="text-blue-600 text-sm mb-2 hover:text-blue-800"
          >
            {showPriceDetails ? "Hide Details" : "Show Price Breakdown"}
          </button>

          {showPriceDetails && (
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span>Weight Charge:</span>
                <span>₦{pricing.weightPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Volume Charge:</span>
                <span>₦{pricing.volumePrice}</span>
              </div>
              {pricing.specialHandlingFee > 0 && (
                <div className="flex justify-between">
                  <span>Special Handling Fee:</span>
                  <span>₦{pricing.specialHandlingFee}</span>
                </div>
              )}
            </div>
          )}

          <div className="text-xl font-bold text-blue-600">
            Total Estimated Price: ₦{pricing.total}
          </div>
        </div>
      </div>

      <div>
        <div className="font-bold text-gray-500 text-xs uppercase mb-2">
          Payment Method
        </div>
        <select
          name="paymentMethod"
          value={userData.paymentMethod || ""}
          onChange={(e) => {
            setUserData((prev) => ({ ...prev, paymentMethod: e.target.value }));
            const error = validateField("paymentMethod", e.target.value);
            setErrors((prev) => ({ ...prev, paymentMethod: error }));
          }}
          className={`w-full p-2 border rounded ${
            errors.paymentMethod ? "border-red-500" : "border-gray-200"
          }`}
        >
          <option value="">Select Payment Method</option>
          <option value="credit">Credit Card</option>
          <option value="bank">Bank Transfer</option>
          <option value="paypal">PayPal</option>
        </select>
        {errors.paymentMethod && (
          <p className="text-red-500 text-xs mt-1">{errors.paymentMethod}</p>
        )}
      </div>
    </div>
  );
};

export default Payment;
