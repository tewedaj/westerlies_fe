import { useState } from "react";
import "./StoreForm.css";
import { StoreForm } from "./prop.StoreForm";
import Multiselect from "multiselect-react-dropdown";
import { IoIosRemoveCircle } from "react-icons/io";
import { BsHouseAddFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import {
  StoreData,
  addStore,
  uploadImage,
} from "../../pages/Admin/controller.admin";
import GoogleMapPicker from "./MapComponentPicker";
const EditStoreForm = (StoreForm: StoreForm) => {
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<StoreData>({
    defaultValues: {
      additionalInformation: "",

      description: "",

      name: "",
      products: [
        {
          description: "",
          label: "",
          value: 0,
        },
      ],
      profilePicture: "",
      profileVideo: "",
      rating: 0,
      storeType: "CRAFT_STORE",
      story: "",
      tags: [
        {
          description: "",
          icon: "",
          id: 0,
          tag: "",
          tagType: "PRODUCT",
        },
      ],
      webPresences: [
        {
          id: 0,
          link: "",
          order: 0,
          webSite: "Website",
        },
        {
          id: 0,
          link: "",
          order: 0,
          webSite: "Facebook",
        },
        {
          id: 0,
          link: "",
          order: 0,
          webSite: "Instagram",
        },
        {
          id: 0,
          link: "",
          order: 0,
          webSite: "WeChat",
        },
        {
          id: 0,
          link: "",
          order: 0,
          webSite: "Weibo",
        },
        {
          id: 0,
          link: "",
          order: 0,
          webSite: "TikTok",
        },
      ],
    },
  });
  const { handleSubmit, register, watch, setValue } = form;
  const watchAddresses = watch("addresses", []);
  const addAddress = () => {
    // Clone the current array of addresses
    const updatedAddresses = [...watchAddresses];

    // Add a new address object to the array
    updatedAddresses.push({
      businessHours: [
        {
          day: "Monday",
          endTime: "",
          id: 0,
          open: true,
          startTime: "",
        },
        {
          day: "Tuesday",
          endTime: "",
          id: 0,
          open: true,
          startTime: "",
        },
        {
          day: "Wednesday",
          endTime: "",
          id: 0,
          open: true,
          startTime: "",
        },
        {
          day: "Thursday",
          endTime: "",
          id: 0,
          open: true,
          startTime: "",
        },
        {
          day: "Friday",
          endTime: "",
          id: 0,
          open: true,
          startTime: "",
        },
        {
          day: "Saturday",
          endTime: "",
          id: 0,
          open: true,
          startTime: "",
        },
        {
          day: "Sunday",
          endTime: "",
          id: 0,
          open: true,
          startTime: "",
        },
      ],
      email: "",
      id: 0,
      location: {
        city: {
          countryName: "",
          countryShortName: "",
          id: 0,
          mapAttribute: {
            id: 0,
            latitude: 0,
            longitude: 0,
            name: "",
            shortName: "",
            zoom: 0,
          },
        },
        id: 0,
        latitude: 0,
        longitude: 0,
        route: "",
        secondStreet: "",
        state: "",
        street: "",
        tip: "",
        zip: "",
      },
      phoneNumber: "",
    });

    // Update the form state with the new addresses array
    setValue("addresses", updatedAddresses);
  };

  const removeAddress = (index: number) => {
    // Clone the current array of addresses
    const updatedAddresses = [...watchAddresses];

    // Remove the address object at the specified index
    updatedAddresses.splice(index, 1);

    // Update the form state with the updated addresses array
    setValue("addresses", updatedAddresses);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
  };

  const uploadAndSetProfilePicture = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (file && authToken) {
        // Call the API function to upload the image and get the response
        const response = await uploadImage(file, authToken);

        // Return the URL after uploading the image
        return response;
      } else {
        console.warn(
          "File or authToken is missing. Cannot upload and set profile picture."
        );
        return null; // or handle the case where file or authToken is missing
      }
    } catch (error) {
      console.error(
        "An error occurred while uploading and setting profile picture:",
        error
      );
      // Handle the error, e.g., display an error message to the user
      return null;
    }
  };
  const [currentStep, setCurrentStep] = useState(0);
  const watchStoreInfoFields = watch([
    "name",
    "description",
    "profilePicture",
    "profileVideo",
  ]);

  const handleNext = () => {
    // Add validation logic here if needed
    // For example, check if all required fields are filled for the current step

    // Move to the next step or perform other actions
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const isNextButtonDisabled = () => {
    // Check if all required fields for the "Store Info" section are filled
    return !watchStoreInfoFields.every((field) => field !== "");
  };

  const onSubmit = async () => {
    try {
      // Call the function to upload the image and get the profilePicture URL
      const profilePictureUrl = await uploadAndSetProfilePicture();

      // If the profilePictureUrl is available, set it in the form data
      if (profilePictureUrl) {
        // Update the profilePicture field in the form data
        setValue("profilePicture", profilePictureUrl);

        // Log the updated form data to the console
        console.log("Updated form data:", form.getValues());

        // Call the API function to add store data
        const authToken = localStorage.getItem("authToken");

        // Call the API function to add store data
        const response = await addStore(form.getValues(), authToken);
        // Log the API response
        console.log("API response:", response);

        // Download the form data in JSON format
        const jsonData = JSON.stringify(form.getValues(), null, 2);
        const blob = new Blob([jsonData], { type: "application/json" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "form_data.json";
        link.click();
      }

      // Additional actions, if any
    } catch (error) {
      console.error("An error occurred while handling form submission:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      // Handle the error, e.g., display an error message to the user
    }
  };

  const steps = ["Store Info", "Address", "Working Hours", "Tags"];
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
        <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
          <h1>{steps[currentStep]}</h1>
          {currentStep === 0 && (
            /* Store Info */
            <>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Store Name"
                  id="name"
                  {...register("name")}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="file"
                  className="form-control"
                  id="profilePicture"
                  {...register("profilePicture")}
                  onChange={handleFileChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <span className="input-group-text">About</span>
                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  {...register("description")}
                ></textarea>
              </div>
              <div className="col-md-6">
                <span className="input-group-text">Additional Information</span>
                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  {...register("additionalInformation")}
                ></textarea>
              </div>
              <div className="address-section-input">
                <div className="col">
                  <div className="input-group-text">
                    <span className="input-group-text" id="link">
                      Website
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="link"
                      {...register(`webPresences.0.link`)}
                    />
                  </div>
                </div>
              </div>
              <div className="address-section-input">
                <div className="col">
                  <div className="input-group-text">
                    <span className="input-group-text" id="link">
                      Facebook
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="link"
                      {...register(`webPresences.1.link`)}
                    />
                  </div>
                </div>
              </div>
              <div className="address-section-input">
                <div className="col">
                  <div className="input-group-text">
                    <span className="input-group-text" id="link">
                      Instagram
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="link"
                      {...register(`webPresences.2.link`)}
                    />
                  </div>
                </div>
              </div>
              <div className="address-section-input">
                <div className="col">
                  <div className="input-group-text">
                    <span className="input-group-text" id="link">
                      WeChat
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="link"
                      {...register(`webPresences.3.link`)}
                    />
                  </div>
                </div>
              </div>
              <div className="address-section-input">
                <div className="col">
                  <div className="input-group-text">
                    <span className="input-group-text" id="link">
                      Weibo
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="link"
                      {...register(`webPresences.4.link`)}
                    />
                  </div>
                </div>
              </div>
              <div className="address-section-input">
                <div className="col">
                  <div className="input-group-text">
                    <span className="input-group-text" id="link">
                      TikTok
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="link"
                      {...register(`webPresences.5.link`)}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          {currentStep === 1 && (
            /* Working Hours */
            <>
              {watchAddresses.map((address, index) => (
                <div className="address-section">
                  <div key={index} className="address-section-input">
                    <div className="col-12">
                      <label htmlFor="" className="form-label">
                        Street
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id=""
                        placeholder="1234 Main St"
                        {...register(`addresses.${index}.location.street`)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="" className="form-label">
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id=""
                        {...register(
                          `addresses.${index}.location.city.mapAttribute.name`
                        )}
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="form-label">
                        State
                      </label>
                      <select
                        id=""
                        className="form-select"
                        {...register(`addresses.${index}.location.state`)}
                      >
                        <option selected>Choose...</option>
                        {/* Add your state options here */}
                      </select>
                    </div>
                    <div className="col-md-2">
                      <label htmlFor="" className="form-label">
                        Zip
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id=""
                        {...register(`addresses.${index}.location.zip`)}
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
                        {...register(`addresses.${index}.email`)}
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
                        {...register(`addresses.${index}.phoneNumber`)}
                      />
                    </div>

                    <div className="add-rmv">
                      <div className="col-md-6">
                        <h2>
                          <BsHouseAddFill onClick={() => addAddress()} />
                        </h2>
                      </div>

                      <div className="col-md-6">
                        {index > 0 && (
                          <h2>
                            <IoIosRemoveCircle
                              onClick={() => removeAddress(index)}
                            />
                          </h2>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="map-section">
                    <GoogleMapPicker callBack={(lat: any, lng: any) => {}} />
                  </div>
                </div>
              ))}
            </>
          )}

          {currentStep === 2 && (
            /* Working Hours */

            <>
              {watchAddresses.map((address, index) => (
                <div key={index} className="businessHours">
                  <div className="workingHours">
                    <input
                      type="hidden"
                      {...register(`addresses.${index}.businessHours.0.id`)}
                    />
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexRadioDefault1"
                        {...register(`addresses.${index}.businessHours.0.open`)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Monday
                      </label>
                    </div>
                    <div className="startTime">
                      <div className="col-md">
                        <div className="form-floating">
                          <input
                            type="time"
                            className="form-control"
                            id="startTime"
                            placeholder="8:00 AM"
                            {...register(
                              `addresses.${index}.businessHours.0.startTime`
                            )}
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
                            {...register(
                              `addresses.${index}.businessHours.0.endTime`
                            )}
                          />
                          <label htmlFor="endTime">End Time</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="workingHours">
                    <input
                      type="hidden"
                      {...register(`addresses.${index}.businessHours.0.id`)}
                    />
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexRadioDefault1"
                        {...register(`addresses.${index}.businessHours.1.open`)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Tuesday
                      </label>
                    </div>
                    <div className="startTime">
                      <div className="col-md">
                        <div className="form-floating">
                          <input
                            type="time"
                            className="form-control"
                            id="startTime"
                            placeholder="8:00 AM"
                            {...register(
                              `addresses.${index}.businessHours.1.startTime`
                            )}
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
                            {...register(
                              `addresses.${index}.businessHours.1.endTime`
                            )}
                          />
                          <label htmlFor="endTime">End Time</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="workingHours">
                    <input
                      type="hidden"
                      {...register(`addresses.${index}.businessHours.0.id`)}
                    />
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexRadioDefault1"
                        {...register(`addresses.${index}.businessHours.2.open`)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Wednesday
                      </label>
                    </div>
                    <div className="startTime">
                      <div className="col-md">
                        <div className="form-floating">
                          <input
                            type="time"
                            className="form-control"
                            id="startTime"
                            placeholder="8:00 AM"
                            {...register(
                              `addresses.${index}.businessHours.2.startTime`
                            )}
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
                            {...register(
                              `addresses.${index}.businessHours.2.endTime`
                            )}
                          />
                          <label htmlFor="endTime">End Time</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="workingHours">
                    <input
                      type="hidden"
                      {...register(`addresses.${index}.businessHours.0.id`)}
                    />
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexRadioDefault1"
                        {...register(`addresses.${index}.businessHours.3.open`)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Thursday
                      </label>
                    </div>
                    <div className="startTime">
                      <div className="col-md">
                        <div className="form-floating">
                          <input
                            type="time"
                            className="form-control"
                            id="startTime"
                            placeholder="8:00 AM"
                            {...register(
                              `addresses.${index}.businessHours.3.startTime`
                            )}
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
                            {...register(
                              `addresses.${index}.businessHours.3.endTime`
                            )}
                          />
                          <label htmlFor="endTime">End Time</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="workingHours">
                    <input
                      type="hidden"
                      {...register(`addresses.${index}.businessHours.0.id`)}
                    />
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexRadioDefault1"
                        {...register(`addresses.${index}.businessHours.4.open`)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Friday
                      </label>
                    </div>
                    <div className="startTime">
                      <div className="col-md">
                        <div className="form-floating">
                          <input
                            type="time"
                            className="form-control"
                            id="startTime"
                            placeholder="8:00 AM"
                            {...register(
                              `addresses.${index}.businessHours.4.startTime`
                            )}
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
                            {...register(
                              `addresses.${index}.businessHours.4.endTime`
                            )}
                          />
                          <label htmlFor="endTime">End Time</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="workingHours">
                    <input
                      type="hidden"
                      {...register(`addresses.${index}.businessHours.0.id`)}
                    />
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexRadioDefault1"
                        {...register(`addresses.${index}.businessHours.5.open`)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Saturday
                      </label>
                    </div>
                    <div className="startTime">
                      <div className="col-md">
                        <div className="form-floating">
                          <input
                            type="time"
                            className="form-control"
                            id="startTime"
                            placeholder="8:00 AM"
                            {...register(
                              `addresses.${index}.businessHours.5.startTime`
                            )}
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
                            {...register(
                              `addresses.${index}.businessHours.5.endTime`
                            )}
                          />
                          <label htmlFor="endTime">End Time</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="workingHours">
                    <input
                      type="hidden"
                      {...register(`addresses.${index}.businessHours.0.id`)}
                    />
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexRadioDefault1"
                        {...register(`addresses.${index}.businessHours.6.open`)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Sunday
                      </label>
                    </div>
                    <div className="startTime">
                      <div className="col-md">
                        <div className="form-floating">
                          <input
                            type="time"
                            className="form-control"
                            id="startTime"
                            placeholder="8:00 AM"
                            {...register(
                              `addresses.${index}.businessHours.6.startTime`
                            )}
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
                            {...register(
                              `addresses.${index}.businessHours.6.endTime`
                            )}
                          />
                          <label htmlFor="endTime">End Time</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
                  {...register("tags.0.tag")}
                  {...register("tags.0.description")}
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
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    No
                  </label>
                </div>
                <div className="col-md-6">
                  <span className="input-group-text">Event + Classes</span>
                  <textarea
                    className="form-control"
                    aria-label="With textarea"
                    {...register("additionalInformation")}
                  ></textarea>
                </div>
              </div>
            </>
          )}
          <div className="form-btn">
            {currentStep > 0 && (
              <div className="prev">
                <button
                  type="button"
                  onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
                  className="btn btn-secondary"
                >
                  Previous
                </button>
              </div>
            )}
            {currentStep < steps.length - 1 && (
              <div className="nxt">
                <button
                  type="button"
                  className={`btn btn-primary ${
                    isNextButtonDisabled() ? "disabled" : ""
                  }`}
                  disabled={isNextButtonDisabled()}
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            )}
            {currentStep === steps.length - 1 && (
              <div className="submit">
                <button type="submit" className="btn btn-primary">
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

export default EditStoreForm;
