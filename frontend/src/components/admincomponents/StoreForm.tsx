import { useState } from "react";

import storeimg from "../../assets/footer3.png";
import "./StoreForm.css";
import { StoreForm } from "./prop.StoreForm";
import Multiselect from "multiselect-react-dropdown";
import { IoIosRemoveCircle } from "react-icons/io";
import { BsHouseAddFill } from "react-icons/bs";

const StoreForm = (StoreForm: StoreForm) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    
      "additionalInformation": "",
      "addresses": [
        {
          "businessHours": [
            {
              "day": "",
              "endTime": "",
              "id": 0,
              "open": true,
              "startTime": ""
            }
          ],
          "email": "",
          "id": 0,
          "location": {
            "city": {
              "countryName": "",
              "countryShortName": "",
              "id": 0,
              "mapAttribute": {
                "id": 0,
                "latitude": 0,
                "longitude": 0,
                "name": "",
                "shortName": "",
                "zoom": 0
              }
            },
            "id": 0,
            "latitude": 0,
            "longitude": 0,
            "route": "",
            "secondStreet": "",
            "state": "",
            "street": "",
            "tip": "",
            "zip": ""
          },
          "phoneNumber": ""
        }
      ],
      "claimed": true,
      "currentAddress": {
        "businessHours": [
          {
            "day": "string",
            "endTime": "string",
            "id": 0,
            "open": true,
            "startTime": "string"
          }
        ],
        "email": "string",
        "id": 0,
        "location": {
          "city": {
            "countryName": "string",
            "countryShortName": "string",
            "id": 0,
            "mapAttribute": {
              "id": 0,
              "latitude": 0,
              "longitude": 0,
              "name": "string",
              "shortName": "string",
              "zoom": 0
            }
          },
          "id": 0,
          "latitude": 0,
          "longitude": 0,
          "route": "string",
          "secondStreet": "string",
          "state": "string",
          "street": "string",
          "tip": "string",
          "zip": "string"
        },
        "phoneNumber": "string"
      },
      "description": "",
      "hasClass": false,
      "id": 0,
      "learnWithUs": "",
      "meetUs": "",
      "name": "",
      "products": [
        {
          "description": "",
          "label": "",
          "value": 0
        }
      ],
      "profilePicture": "",
      "profileVideo": "",
      "rating": 0,
      "storeType": "CRAFT_STORE",
      "story": "",
      "tags": [
        {
          "description": "",
          "icon": "",
          "id": 0,
          "tag": "",
          "tagType": "PRODUCT"
        }
      ],
      "webPresences": [
        {
          "id": 0,
          "link": "",
          "order": 0,
          "webSite": ""
        }
      ]
    
  });
  const steps = ["Store Info", "Address", "Working Hours", "Tags"];
  const handleAddressChange = (index: number, field: string, value: string) => {
    const updatedAddresses = [...formData.addresses];
    updatedAddresses[index] = {
      ...updatedAddresses[index],
      location: {
        ...updatedAddresses[index].location,
        city: {
          ...updatedAddresses[index].location.city,
          [field]: value,
        },
      },
    };

    setFormData({
      ...formData,
      addresses: updatedAddresses,
    });
  };
  
  const handleAddAddress = () => {
    setFormData({
      ...formData,
      addresses: [
        ...formData.addresses,
        {
          businessHours: [
            {
              day: "string",
              endTime: "string",
              id: 0,
              open: true,
              startTime: "string",
            },
          ],
          email: "string",
          id: 0,
          location: {
            city: {
              countryName: "string",
              countryShortName: "string",
              id: 0,
              mapAttribute: {
                id: 0,
                latitude: 0,
                longitude: 0,
                name: "string",
                shortName: "string",
                zoom: 0,
              },
            },
            id: 0,
            latitude: 0,
            longitude: 0,
            route: "string",
            secondStreet: "string",
            state: "string",
            street: "string",
            tip: "string",
            zip: "string",
          },
          phoneNumber: "string",
        },
      ],
    });
  };
  
  const handleRemoveAddress = (index: number) => {
    const updatedAddresses = [...formData.addresses];
    updatedAddresses.splice(index, 1);
  
    setFormData({
      ...formData,
      addresses: updatedAddresses,
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
  
    // Check if the property is nested
    const nestedProperties = name.split('.');
  
    if (nestedProperties.length === 1) {
      // If not nested, update directly
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else if (nestedProperties.length === 2) {
      // If nested, update accordingly
      setFormData((prevFormData) => ({
        ...prevFormData,
        [nestedProperties[0]]: {
          ...prevFormData[nestedProperties[0]],
          [nestedProperties[1]]: value,
        },
      }));
    }
    // Add more cases as needed for deeper nesting
  };

  const handleRadioChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value === "true", // Convert "true" to true, "false" to false
    }));
  };

  const handleTagChange = (tags: any, type: any) => {
    setFormData({
      ...formData,
      [type]: tags,
    });
  };
  const handleWebPresenceChange = (index: any, field: any, value: any) => {
    const updatedWebPresences = [...formData.webPresences];
    updatedWebPresences[index] = {
      ...updatedWebPresences[index],
      [field]: value
    };

    setFormData({
      ...formData,
      webPresences: updatedWebPresences
    });
  };

  const isStepValid = (step: number) => {
    if (step === 0) {
      return formData.name.trim() !== "" && formData.addresses.some(address => address.email.trim() !== "");
    }
    if (step === 1) {
      // You can add validation logic for working hours here if needed
      return true;
    }
    return true;
  };

  const handleNext = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === steps.length - 1) {
      // Extract address data
      const addressData = formData.addresses.map((address) => ({
        email: address.email,
        phoneNumber: address.phoneNumber,
        // Add other address properties as needed
        location: {
          city: {
            countryName: address.location.city.countryName,
            // Add other city properties as needed
          },
          // Add other location properties as needed
        },
      }));
  
      // Extract tags data
      const tagsData = formData.tags.map((tag) => ({
        description: tag.description,
        icon: tag.icon,
        tag: tag.tag,
        tagType: tag.tagType,
        // Add other tag properties as needed
      }));
      // Extract web data
      const webPresencesData = formData.webPresences.map((web) => ({
        id: web.id ,
          link: web.link,
          order: web.order,
          webSite:web.webSite
        // Add other tag properties as needed
      }));
  
      // Create export data
      const exportData = {
        name: formData.name,
        description: formData.description,
        additionalInformation: formData.additionalInformation,
        addresses: addressData,
        tags: tagsData,
        webPresences: webPresencesData,
        // Add other properties as needed
      };
  
      // Convert exportData to JSON
      const jsonData = JSON.stringify(exportData, null, 2);
  
      // Create a Blob from the JSON data
      const blob = new Blob([jsonData], { type: "application/json" });
  
      // Create a download link and trigger a click to download the JSON file
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = "formData.json";
      downloadLink.click();
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
                  name="name"
                  onChange={handleInputChange}
                />
               </div>
              <div className="col-md-6">
                <input
                  type="file"
                  className="form-control"
                  id="inputGroupFile02"
                  name="profilePicture"
                  onChange={handleInputChange}
                />
              </div>

             <div className="col-md-6">
                <span className="input-group-text">About</span>
                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  name="description"
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="col-md-6">
                <span className="input-group-text">Event + Classes</span>
                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  name="additionalInformation"
                  onChange={handleInputChange}
                ></textarea>
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
                    name="webSite"
                    onChange={(e) => handleWebPresenceChange(0, "webSite", e.target.value)}
                  />
                </div>
              </div> 
              {['Facebook', 'Instagram', 'TikTok', 'WeChat','Weibo'].map((linkIndex) => (
        <div key={linkIndex} className="col-md-6">
          <div className="input-group mb-3">
            <span className="input-group-text" id={`link${linkIndex}`}>
              {linkIndex}
            </span>
            <input
              type="text"
              className="form-control"
              aria-label={`Sizing example input ${linkIndex}`}
              aria-describedby={`inputGroup-sizing-default ${linkIndex}`}
              name="link"
              onChange={(e) => handleWebPresenceChange(linkIndex, "link", e.target.value)}
            />
          </div>
        </div>
      ))}
          
            </>
          )}
          {currentStep === 1 && (
            /* Working Hours */
            <>
              {formData.addresses.map((address, index) => (
                <div key={index} className="address-section">
                  <div className="address-section-input">
                    <div className="col-12">
                      <label
                        htmlFor={`inputStreet${index}`}
                        className="form-label"
                      >
                        Street
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id={`inputStreet${index}`}
                        placeholder="1234 Main St"
                        name="street"
                        onChange={(e) =>
                          handleAddressChange(index, "street", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor={`inputCity${index}`}
                        className="form-label"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id={`inputCity${index}`}
                        name="countryShortName"
                        onChange={(e) =>
                          handleAddressChange(index, "city", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-4">
                      <label
                        htmlFor={`inputState${index}`}
                        className="form-label"
                      >
                        State
                      </label>
                      <select
                        id={`inputState${index}`}
                        className="form-select"
                        name="state"
                        onChange={(e) =>
                          handleAddressChange(index, "state", e.target.value)
                        }
                      >
                        <option selected>Choose...</option>
                        {/* Add your state options here */}
                      </select>
                    </div>
                    <div className="col-md-2">
                      <label
                        htmlFor={`inputZip${index}`}
                        className="form-label"
                      >
                        Zip
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id={`inputZip${index}`}
                        name="zip"
                        onChange={(e) =>
                          handleAddressChange(index, "zip", e.target.value)
                        }
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
                        name="phoneNumber"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <span className="input-group-text">
                        Additional Information
                      </span>
                      <textarea
                        className="form-control"
                        aria-label="With textarea"
                        name="additionalInformation"
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                    <div className="add-rmv">
                      <div className="col-md-6">
                        <h2>
                          <BsHouseAddFill onClick={handleAddAddress} />
                        </h2>
                      </div>
                      {index > 0 && (
                        <div className="col-md-6">
                          <h2>
                            <IoIosRemoveCircle
                              onClick={() => handleRemoveAddress(index)}
                            />
                          </h2>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="map-section">
                    <img src={storeimg}></img>
                  </div>
                </div>
              ))}
            </>
          )}

          {currentStep === 2 && (
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
                    onChange={handleInputChange}
                  />
                  <label htmlFor="endTime">End Time</label>
                </div>
              </div>
            </>
          )}
          {currentStep === 3 && (
            /* Tags */
            <>
              <div className="col-md-6">
                <span className="input-group-text">Primary Tag</span>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="description"
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
                    name="hasClass"
                    id="flexRadioDefault1"
                    value="true"
                    checked={formData.hasClass== true}
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
                    name="hasClass"
                    id="flexRadioDefault2"
                    value="false"
                    checked={formData.hasClass== false}
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
