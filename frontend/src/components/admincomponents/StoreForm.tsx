import { useState } from "react";

import "./StoreForm.css";
import { StoreForm } from "./prop.StoreForm";
import Multiselect from "multiselect-react-dropdown";

const StoreForm = (StoreForm: StoreForm) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    storeName: "",
    email: "",
    phone: "",
    about: "",
    eventsClasses: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    website: "",
    instagram: "",
    tikTok: "",
    additionalInfo: "",
    startTime: "",
    endTime: "",
    primaryTag: "1",
    secondaryTags: [],
    socialImpactTags: [],
    offerClasses: "yes", // or "no"
  });
  const steps = ["Store Info", "Working Hours", "Tags"];

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRadioChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTagChange = (tags: any, type: any) => {
    setFormData({
      ...formData,
      [type]: tags,
    });
  };

  const isStepValid = (step: number) => {
    if (step === 0) {
      return formData.storeName.trim() !== "" && formData.email.trim() !== "";
    }
    if (step === 1) {
      // You can add validation logic for working hours here if needed
      return true;
    }
    return true;
  };

  const handleNext = (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Add this line to prevent page refresh
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === steps.length - 1) {
      // Handle the final step (converting text inputs to JSON)
      const textData = {
        storeName: formData.storeName,
        email: formData.email,
        phone: formData.phone,
        about: formData.about,
        // Add other text fields as needed
      };

      // Convert textData to JSON
      const jsonData = JSON.stringify(textData);
      // Log the JSON data in the browser console
      console.log("JSON Data:", jsonData);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      <div className={StoreForm.isOpen ? "storeForm" : "storeForm-disabled"}>
        <div className="navigation-form">
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
            /* Store Info */
            <>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Store Name"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="file"
                  className="form-control"
                  id="inputGroupFile02"
                />
              </div>
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
                <label htmlFor="inputPhone" className="form-label">
                  Phone
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="inputPhone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <span className="input-group-text">About</span>
                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="col-md-6">
                <span className="input-group-text">Event + Classes</span>
                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  name="eventsClasses"
                  value={formData.eventsClasses}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className="col-12">
                <label htmlFor="inputAddress" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  placeholder="1234 Main St"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputCity" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputCity"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="inputState" className="form-label">
                  State
                </label>
                <select
                  id="inputState"
                  className="form-select"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                >
                  <option selected>Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div className="col-md-2">
                <label htmlFor="inputZip" className="form-label">
                  Zip
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputZip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <div className="input-group mb-3">
                  <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                  >
                    Website
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-group mb-3">
                  <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                  >
                    Instagram
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-group mb-3">
                  <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                  >
                    TikTok
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    name="tikTok"
                    value={formData.tikTok}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <span className="input-group-text">Additional Information</span>
                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  name="additionalIfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </>
          )}
          {currentStep === 1 && (
            /* Working Hours */
            <>
              <div className="col-md-6">
                <span className="input-group-text">Working Days</span>
                <Multiselect
                  isObject={false}
                  options={[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ]}
                />
              </div>
              <div className="col-md">
                <div className="form-floating">
                  <input
                    type="time"
                    className="form-control"
                    id="startTime"
                    placeholder="8:00 AM"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="startTime">Start Time</label>
                </div>
              </div>
              <div className="col-md">
                <div className="form-floating">
                  <input
                    type="time"
                    className="form-control"
                    id="endTime"
                    placeholder="8:00 AM"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="endTime">End Time</label>
                </div>
              </div>
            </>
          )}
          {currentStep === 2 && (
            /* Tags */
            <>
              <div className="col-md-6">
                <span className="input-group-text">Primary Tag</span>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="primaryTag"
                  value={formData.primaryTag}
                  onChange={handleInputChange}
                >
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div className="col-md-6">
                <span className="input-group-text">Secondary Tag</span>
                <Multiselect
                  isObject={false}
                  onSelect={(selectedList) =>
                    handleTagChange(selectedList, "secondaryTags")
                  }
                  options={[
                    "Option 1",
                    "Option 2",
                    "Option 3",
                    "Option 4",
                    "Option 5",
                  ]}
                />
              </div>
              <div className="col-md-6">
                <span className="input-group-text">Social Impact Tags</span>
                <Multiselect
                  isObject={false}
                  onSelect={(selectedList) =>
                    handleTagChange(selectedList, "socialImpactTags")
                  }
                  options={[
                    "Option 1",
                    "Option 2",
                    "Option 3",
                    "Option 4",
                    "Option 5",
                  ]}
                />
              </div>
              <div className="col-md-6">
                <span className="input-group-text">Do you offer classes?</span>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="offerClasses"
                    id="flexRadioDefault1"
                    value="yes"
                    checked={formData.offerClasses === "yes"}
                    onChange={handleRadioChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Yes
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="offerClasses"
                    id="flexRadioDefault2"
                    value="no"
                    checked={formData.offerClasses === "no"}
                    onChange={handleRadioChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    No
                  </label>
                </div>
              </div>
            </>
          )}
          <div className="form-btn">
            {currentStep > 0 && (
              <div className="prev">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handlePrev}
                >
                  Previous
                </button>
              </div>
            )}
            {currentStep < steps.length - 1 && (
              <div className="nxt">
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
            {currentStep === steps.length - 1 && (
              <div className="submit">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleNext}
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default StoreForm;
