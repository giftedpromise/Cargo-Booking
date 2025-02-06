import React, { useContext } from "react";
import { StepperContext } from "../../contexts/StepperContext";

const Final = () => {
  const { userData } = useContext(StepperContext);

  const handleSubmit = () => {
    // Actual submission logic would go here
    console.log("Final Submission Data:", userData);
    alert("Shipment Booking Confirmed!");
  };

  return (
    <div className="container md:mt-10">
      <div className="flex flex-col items-center">
        <div className="wrapper">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-green-500">
            Booking Confirmed
          </h2>
          <div className="mt-4 text-lg">
            <p>Thank you, {userData.fullname}!</p>
            <p>Your cargo shipment has been successfully booked.</p>
          </div>

          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Booking Details</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-gray-600">Name:</div>
              <div>{userData.fullname}</div>

              <div className="text-gray-600">Email:</div>
              <div>{userData.email}</div>

              <div className="text-gray-600">Phone:</div>
              <div>{userData.phoneNumber}</div>

              <div className="text-gray-600">Cargo Type:</div>
              <div>{userData.cargoType}</div>

              <div className="text-gray-600">Total Price:</div>
              <div className="font-bold text-blue-600">
                ${userData.totalPrice}
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Confirm & Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Final;
