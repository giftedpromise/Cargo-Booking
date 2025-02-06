import React, { useState } from "react";
import { StepperContext } from "./contexts/StepperContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Stepper from "./components/Stepper";
import StepperControl from "./components/StepperControl";
import Account from "./components/steps/PersonalInfo";
import Payment from "./components/steps/Payment";
import Details from "./components/steps/Details";
import Final from "./components/steps/Final";

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState("");
  const [finalData, setFinalData] = useState([]);

  const steps = [
    "Personal Information",
    "Cargo Description",
    "Price Summary",
    "Complete",
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Account />;
      case 2:
        return <Details />;
      case 3:
        return <Payment />;
      case 4:
        return <Final />;
      default:
        return null;
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep < steps.length && setCurrentStep(newStep);
  };

  return (
    <div>
      <Header />
      <main className="relative md:w-1/2 mx-auto shadow-xl rounded-2xl  pb-2 bg-white">
        <div className="container horizontal mt-10">
          <Stepper steps={steps} currentStep={currentStep} />

          <div className="my-10 p-10">
            {/* Wrap the stepper context here */}
            <StepperContext.Provider
              value={{ userData, setUserData, finalData, setFinalData }}
            >
              {displayStep(currentStep)}
            </StepperContext.Provider>
          </div>
        </div>
        {currentStep !== steps.length && (
          <StepperControl
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;