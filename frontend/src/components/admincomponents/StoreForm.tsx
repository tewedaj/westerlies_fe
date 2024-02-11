import { useEffect, useState } from "react";
import "./StoreForm.css";
import { StoreForm } from "./prop.StoreForm";
import Multiselect from "multiselect-react-dropdown";
import { IoIosRemoveCircle } from "react-icons/io";
import { BsHouseAddFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import {
  StoreData,
  Tag,
  addStore,
  getTag,
  uploadImage,
} from "../../pages/Admin/controller.admin";
import GoogleMapPicker from "./MapComponentPicker";
const StoreForm = (StoreForm: StoreForm) => {
  const form = useForm<StoreData>({
    defaultValues: {
      additionalInformation: "",
      primaryTag: {
        id: 41,
        tag: "",
        description: "",
        icon: "",
        tagType: "PRODUCT",
      },
      googleReviewUrl: "",
      addresses: [
        {
          businessHours: [
            {
              day: "Monday",
              endTime: "",
              open: false,
              startTime: "",
            },
            {
              day: "Tuesday",
              endTime: "",
              open: false,
              startTime: "",
            },
            {
              day: "Wednesday",
              endTime: "",
              open: false,
              startTime: "",
            },
            {
              day: "Thursday",
              endTime: "",
              open: false,
              startTime: "",
            },
            {
              day: "Friday",
              endTime: "",
              open: false,
              startTime: "",
            },
            {
              day: "Saturday",
              endTime: "",
              open: false,
              startTime: "",
            },
            {
              day: "Sunday",
              endTime: "",
              open: false,
              startTime: "",
            },
          ],
          email: "",
          location: {
            city: {
              countryName: "",
              countryShortName: "",
              mapAttribute: {
                latitude: 0,
                longitude: 0,
                name: "",
                shortName: "",
                zoom: 0,
              },
            },
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
        },
      ],
      claimed: true,
      currentAddress: null,
      description: "",
      hasClass: false,
      learnWithUs: "",
      meetUs: "",
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
      storeType: "CRAFT_STORE",
      story: "",
      tags: [
        {
          id: 41,
          description: "",
          icon: "",
          tag: "",
          tagType: "PRODUCT",
        },
      ],
      webPresences: [
        {
          link: "",
          webSite: "Website",
        },
        {
          link: "",
          webSite: "Facebook",
        },
        {
          link: "",
          webSite: "Instagram",
        },
        {
          link: "",
          webSite: "WeChat",
        },
        {
          link: "",
          webSite: "Weibo",
        },
        {
          link: "",
          webSite: "TikTok",
        },
      ],
    },
  });
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const watchAddresses = watch("addresses", []);
  const [tags, setTags] = useState<Tag[]>([]);
  useEffect(() => {
    // Fetch tags from API and update state
    async function fetchTags() {
      try {
        const response: any = await getTag();
        setTags(response.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    }
    fetchTags();
  }, []);

  const [file, setFile] = useState<File | null>(null);
  const [coordinates, setCoordinates] = useState(
    Array.from({ length: watchAddresses.length }, () => ({
      latitude: 0.0,
      longitude: 0.0,
    }))
  );

  const handleLatitudeChange = (lat: number, index: number) => {
    setCoordinates((prevCoordinates) => {
      const updatedCoordinates = [...prevCoordinates];
      updatedCoordinates[index] = {
        ...updatedCoordinates[index],
        latitude: lat,
      };
      return updatedCoordinates;
    });
  };

  const handleLongitudeChange = (lng: number, index: number) => {
    setCoordinates((prevCoordinates) => {
      const updatedCoordinates = [...prevCoordinates];
      updatedCoordinates[index] = {
        ...updatedCoordinates[index],
        longitude: lng,
      };
      return updatedCoordinates;
    });
  };

  const handleAddressChange = (newAddress: string, index: number) => {
    const parsedAddress = parseAddress(newAddress);
    const updatedAddresses = [...watchAddresses];
    updatedAddresses[index] = {
      ...updatedAddresses[index],
      location: {
        city: {
          countryName: parsedAddress.country,
          countryShortName: parsedAddress.city,
          mapAttribute: {
            latitude: coordinates[index].latitude,
            longitude: coordinates[index].longitude,
            name: parsedAddress.city,
            shortName: "",
            zoom: 0,
          },
        },
        latitude: coordinates[index].latitude,
        longitude: coordinates[index].longitude,
        route: "",
        secondStreet: "",
        state: parsedAddress.state,
        street: parsedAddress.street,
        tip: "",
        zip: parsedAddress.zip,
      },
    };
    setValue("addresses", updatedAddresses);
  };

  const parseAddress = (addressString: string) => {
    const [street, city, stateZip, country] = addressString.split(", ");
    const [state, zip] = stateZip.split(" ");

    return { street, city, state, zip, country };
  };

  const addAddress = () => {
    setValue("addresses", [
      ...watchAddresses,
      {
        businessHours: [
          {
            day: "Monday",
            endTime: "",
            open: false,
            startTime: "",
          },
          {
            day: "Tuesday",
            endTime: "",
            open: false,
            startTime: "",
          },
          {
            day: "Wednesday",
            endTime: "",
            open: false,
            startTime: "",
          },
          {
            day: "Thursday",
            endTime: "",
            open: false,
            startTime: "",
          },
          {
            day: "Friday",
            endTime: "",
            open: false,
            startTime: "",
          },
          {
            day: "Saturday",
            endTime: "",
            open: false,
            startTime: "",
          },
          {
            day: "Sunday",
            endTime: "",
            open: false,
            startTime: "",
          },
        ],
        email: "",
        location: {
          city: {
            countryName: "",
            countryShortName: "",
            mapAttribute: {
              latitude: 0,
              longitude: 0,
              name: "",
              shortName: "",
              zoom: 0,
            },
          },
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
      },
    ]);
  };

  const removeAddress = (index: number) => {
    const updatedAddresses = watchAddresses.filter((_, i) => i !== index);
    setValue("addresses", updatedAddresses);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
  };

  const uploadAndSetProfilePicture = async () => {
    try {
      if (file) {
        // Call the API function to upload the image and get the response
        const response = await uploadImage(file);

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
  const handleMultiselectChange = (selectedList: any[]) => {
    const selectedTags: any = selectedList.map((tagName) => {
      return tags.find((tag) => tag.tag === tagName);
    });

    // Set the form value for the "tags" field
    setValue("tags", selectedTags);
  };
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };
  const [profilePictureUrl, setProfilepicture] = useState("");

  const onSubmit = async () => {
    try {
      // Call the function to upload the image and get the profilePicture URL
      if (file !== null) {
        const profilePicture = await uploadImage(file);
        setProfilepicture(profilePicture);
      }
      const selectedTagId = watch("primaryTag.id"); // Watch for changes in the primaryTag.id field
      const selectedtags = watch("tags");
      console.log("Selected Tag:", selectedtags);

      // Convert selectedTagId to a numberconst selected
      const TagIdNumber = parseInt(String(selectedTagId), 10);

      const selectedTag = tags.find((tag) => tag.id === TagIdNumber); // Find the corresponding tag object

      console.log("Selected Tag:", selectedTag);

      if (selectedTag) {
        console.log("Selected Tag:", selectedTag);
        // Update the primaryTag field in the form data with the selected tag object
        setValue("primaryTag", selectedTag);
      } else {
        console.warn("Selected tag not found");
      }

      //If the profilePictureUrl is available, set it in the form data
      if (profilePictureUrl) {
        // Update the profilePicture field in the form data
        setValue("profilePicture", profilePictureUrl);

        // Log the updated form data to the console
        console.log("Updated form data:", form.getValues());

        // Call the API function to add store data
        const response = await addStore(form.getValues());
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
              {watchAddresses.map((_address, index) => (
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
                    <div className="col-12">
                      <label htmlFor="" className="form-label">
                        Country
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id=""
                        placeholder="1234 Main St"
                        {...register(
                          `addresses.${index}.location.city.countryName`
                        )}
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
                    <div className="col-md-6">
                      <label htmlFor="" className="form-label">
                        longitude
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id=""
                        {...register(`addresses.${index}.location.longitude`)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="" className="form-label">
                        latitude
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id=""
                        {...register(`addresses.${index}.location.latitude`)}
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="" className="form-label">
                        State
                      </label>
                      <input
                        id=""
                        className="form-select"
                        {...register(`addresses.${index}.location.state`)}
                      />
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
                    <GoogleMapPicker
                      index={index}
                      callBack={(lat: any, lng: any) => {
                        handleLatitudeChange(lat, index);
                        handleLongitudeChange(lng, index);
                      }}
                      onAddressChange={(newAddress: string) =>
                        handleAddressChange(newAddress, index)
                      }
                    />
                  </div>
                </div>
              ))}
            </>
          )}

          {currentStep === 2 && (
            /* Working Hours */

            <>
              {watchAddresses.map((_address, index) => (
                <div key={index} className="businessHours">
                  <div className="workingHours">
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
                  aria-label="Primary Tag select"
                  {...register("primaryTag.id")}
                >
                  {tags.map((tag, index) => (
                    <option key={index} value={tag.id}>
                      {tag.tag}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <span className="input-group-text">Secondary Tag</span>

                <Multiselect
                  isObject={false}
                  options={tags.map((tag) => tag.tag)}
                  onSelect={handleMultiselectChange}
                  onRemove={handleMultiselectChange}
                />
              </div>

              <div className="col">
                <div className="input-group-text">
                  <span className="input-group-text" id="link">
                    Google Review
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="link"
                    {...register("googleReviewUrl")}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexRadioDefault1"
                    {...register("hasClass")}
                  />

                  <label className="form-check-label">
                    Does store offer classes?
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <span className="input-group-text">Event + Classes</span>
                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  {...register("learnWithUs")}
                ></textarea>
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
                  className="btn btn-primary"
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

export default StoreForm;
