import React, { useState } from "react";
import Aheader from "./Aheader";
import Anavbar from "./Anavbar";
import "./StoreForm.css";

const StoreForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });

  const steps = ["Store Information", "Store Address", "Confirmation"];

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = (step: number) => {
    if (step === 0) {
      return formData.email.trim() !== "" && formData.password.trim() !== "";
    }
    if (step === 1) {
      return (
        formData.address.trim() !== "" &&
        formData.city.trim() !== "" &&
        formData.state.trim() !== "" &&
        formData.zip.trim() !== ""
      );
    }
    return true;
  };

  return (
    <>
      <Aheader></Aheader>
      <div className="main-container">
        <Anavbar></Anavbar>
        <div className="main">
          <div className="navigation">
            <ul>
              {steps.map((step, index) => (
                <li
                  key={index}
                  className={currentStep === index ? "active" : ""}
                  onClick={() => setCurrentStep(index)}
                >
                  {step}
                </li>
              ))}
            </ul>
          </div>
          <form className="row g-3">
            <h1>{steps[currentStep]}</h1>
            {currentStep === 0 && (
              <>
                <div className="col-md-6">
                  <label htmlFor="inputEmail4" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail4"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputPassword4" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword4"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}
            {currentStep === 1 && <>{/* Store Address Fields */}</>}
            {currentStep < steps.length - 1 && (
              <div className="col-12">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNext}
                  disabled={!isStepValid(currentStep)}
                >
                  Next
                </button>
              </div>
            )}
            {currentStep > 0 && (
              <div className="col-12">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handlePrev}
                >
                  Previous
                </button>
              </div>
            )}
            {currentStep === steps.length - 1 && (
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default StoreForm;
