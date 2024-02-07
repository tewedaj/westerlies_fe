import { useCallback, useEffect, useState } from "react";
import "./StoreForm.css";
import { EditStoreForm } from "./prop.StoreForm";
import Multiselect from "multiselect-react-dropdown";
import { IoIosRemoveCircle } from "react-icons/io";
import { BsHouseAddFill } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";
import {
  Address,
  editStoreParts,
  getStoreById,
  StoreData,
  StoreEditData,
  Tag,
  WebPresence,
  uploadImage,
  AddressEdit,
  editAddressParts,
  LocationEdit,
  editAddressLocationParts,
  BusinessHour,
  editAddressBusinessHourParts,
  deleteWebpresenceParts,
  addTagParts,
  removeTagParts,
  WebPresenceEdit,
  editWebpresenceParts,
  addAddressParts,
  deleteAddressParts,
} from "../../pages/Admin/controller.admin";
import { useForm } from "react-hook-form";
import GoogleMapPicker from "./MapComponentPicker";
import TagFetcher from "./TagFetcher";
const EditStoreForm = ({ isOpen, id }: EditStoreForm) => {
  const [formValues, setFormValues] = useState<StoreData | null>(null); // Initialize with null
  const { register, handleSubmit, setValue } = useForm();
  const [watchAddresses, setWatchAddresses] = useState<Address[]>([]);
  const [watchWebPresence, setWebPresence] = useState<WebPresence[]>([]);
  const [WebPresenceID, setWebPresenceId] = useState(0);
  const [watchTags, setTags] = useState<Tag[]>([]);
  const [watchTagsTag, setWatchTagsTag] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      if (
        isAuthenticated !== null &&
        isAuthenticated !== "false" &&
        id !== undefined
      ) {
        try {
          const response: any = await getStoreById(id);
          setFormValues(response.data); // Set formValues after response is received
        } catch (error) {
          console.error("Error finding store:", error);
        }
      }
    };

    fetchData();
  }, [id]);

  // Log formValues when it changes
  useEffect(() => {
    console.log(formValues, "this is form values");
    console.log(formValues?.profilePicture, "this is url");
  }, [formValues]);
  useEffect(() => {
    if (formValues) {
      const addresses: Address[] = formValues.addresses.map(
        (address, index) => {
          setValue(
            `addresses[${index}].location.street`,
            address.location.street
          );
          setValue(
            `addresses[${index}].location.city.countryName`,
            address.location.city.countryName
          );
          setValue(
            `addresses[${index}].location.city.mapAttribute.name`,
            address.location.city.mapAttribute.name
          );
          setValue(
            `addresses[${index}].location.longitude`,
            address.location.longitude
          );
          setValue(
            `addresses[${index}].location.latitude`,
            address.location.latitude
          );
          setValue(
            `addresses[${index}].location.state`,
            address.location.state
          );
          setValue(`addresses[${index}].location.zip`, address.location.zip);
          setValue(`addresses[${index}].location.id`, address.location.id);
          setValue(`addresses[${index}].email`, address.email);
          setValue(`addresses[${index}].phoneNumber`, address.phoneNumber);
          setValue(`addresses[${index}].id`, address.id);
          const updatedBusinessHours: BusinessHour[] =
            address.businessHours.map((businessHour, index2) => {
              setValue(
                `addresses[${index}].businessHours[${index2}.id]`,
                businessHour.id
              );
              setValue(
                `addresses[${index}].businessHours[${index2}.startTime]`,
                businessHour.startTime
              );
              setValue(
                `addresses[${index}].businessHours[${index2}.endTime]`,
                businessHour.endTime
              );
              setValue(
                `addresses[${index}].businessHours[${index2}.day]`,
                businessHour.day
              );
              setValue(
                `addresses[${index}].businessHours[${index2}.open]`,
                businessHour.open
              );
              return {
                id: businessHour.id,
                startTime: businessHour.startTime,
                endTime: businessHour.endTime,
                day: businessHour.day,
                open: businessHour.open,
              };
            });

          return {
            email: address.email,
            location: {
              city: {
                countryName: address.location.city.countryName,
                countryShortName: "", // You may need to provide a default or extract this from somewhere
                mapAttribute: {
                  latitude: address.location.latitude,
                  longitude: address.location.longitude,
                  name: address.location.city.mapAttribute.name,
                  shortName: "", // You may need to provide a default or extract this from somewhere
                  zoom: 0, // You may need to provide a default or extract this from somewhere
                },
              },
              latitude: address.location.latitude,
              longitude: address.location.longitude,
              route: "", // You may need to provide a default or extract this from somewhere
              secondStreet: "", // You may need to provide a default or extract this from somewhere
              state: address.location.state,
              street: address.location.street, // Street value directly from the address object
              tip: "", // You may need to provide a default or extract this from somewhere
              zip: address.location.zip,
            },
            phoneNumber: address.phoneNumber,
            businessHours: updatedBusinessHours, // Assuming businessHours is defined elsewhere
          };
        }
      );
      const webPresences: WebPresence[] = formValues.webPresences.map(
        (webPresences, index) => {
          setValue(`webPresences[${index}].link`, webPresences.link);
          setValue(`webPresences[${index}].webSite`, webPresences.webSite);
          setValue(`webPresences[${index}].id`, webPresences.id);
          if (webPresences.id) {
            setWebPresenceId(webPresences.id);
          }
          return {
            link: webPresences.link,
            webSite: webPresences.webSite,
          };
        }
      );
      const tags: Tag[] = formValues.tags.map((tags, index) => {
        setValue(`tags[${index}].tag`, tags.tag);
        setValue(`tags[${index}].description`, tags.description);
        setValue(`tags[${index}].icon`, tags.icon);
        setValue(`tags[${index}].id`, tags.id);
        setValue(`tags[${index}].tagType`, tags.tagType);
        return {
          id: tags.id,
          tag: tags.tag,
          tagType: tags.tagType,
          icon: tags.icon,
          description: tags.description,
        };
      });
      // Set watchAddresses with updated addresses array
      setWatchAddresses([...addresses]);
      setWebPresence([...webPresences]);
      setTags([...tags]);
      setWatchTagsTag(tags.map((tag) => tag.tag));
      setValue("name", formValues.name);
      setValue("description", formValues.description);
      setValue("additionalInformation", formValues.additionalInformation);
      setValue("googleReviewUrl", formValues.googleReviewUrl);
      setValue("hasClass", formValues.hasClass);
      setValue("learnWithUs", formValues.learnWithUs);

      // Set other form values here
    }
    console.log(watchAddresses, "dwebduw");
  }, [formValues, setValue]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
  };
  const [coordinates, setCoordinates] = useState<
    { latitude: number; longitude: number }[]
  >(
    Array.from({ length: watchAddresses.length }, () => ({
      latitude: 0.0,
      longitude: 0.0,
    }))
  );
  const [mapClicked, setMapClicked] = useState(false);

  const handleLatitudeChange = (lat: number, index: number) => {
    setCoordinates((prevCoordinates) => {
      const updatedCoordinates = [...prevCoordinates];
      updatedCoordinates[index] = {
        ...updatedCoordinates[index],
        latitude: lat,
      };
      return updatedCoordinates;
    });
    setMapClicked(true); // Set mapClicked to true when latitude changes
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
    setMapClicked(true); // Set mapClicked to true when longitude changes
  };

  const handleAddressChange = useCallback(
    (newAddress: string, index: number) => {
      if (!mapClicked) {
        // Return early if address change is not due to map click
        return;
      }

      const parsedAddress = parseAddress(newAddress);

      setWatchAddresses((prevAddresses) => {
        const updatedAddresses = [...prevAddresses];
        const updatedAddress = { ...updatedAddresses[index] };

        updatedAddress.location = {
          ...updatedAddress.location,
          city: {
            ...updatedAddress.location.city,
            countryName: parsedAddress.country,
            countryShortName: parsedAddress.city,
            mapAttribute: {
              ...updatedAddress.location.city.mapAttribute,
              latitude: coordinates[index]?.latitude || 0,
              longitude: coordinates[index]?.longitude || 0,
              name: parsedAddress.city,
            },
          },
          latitude: coordinates[index]?.latitude || 0,
          longitude: coordinates[index]?.longitude || 0,
          state: parsedAddress.state,
          street: parsedAddress.street,
          zip: parsedAddress.zip,
        };

        updatedAddresses[index] = updatedAddress;

        return updatedAddresses;
      });

      // Reset mapClicked to false after handling address change
      setMapClicked(false);

      // Manually update form control values with the new address data
      setValue(`addresses.${index}.location.street`, parsedAddress.street);
      setValue(`addresses.${index}.location.state`, parsedAddress.state);
      setValue(`addresses.${index}.location.zip`, parsedAddress.zip);
      setValue(
        `addresses.${index}.location.latitude`,
        coordinates[index]?.latitude
      );
      setValue(
        `addresses.${index}.location.longitude`,
        coordinates[index]?.longitude
      );

      setValue(
        `addresses.${index}.location.city.countryName`,
        parsedAddress.country
      );
      setValue(
        `addresses.${index}.location.city.countryShortName`,
        parsedAddress.city
      );
      setValue(
        `addresses.${index}.location.city.mapAttribute.name`,
        parsedAddress.city
      );
      setValue(
        `addresses.${index}.location.city.mapAttribute.latitude`,
        coordinates[index]?.latitude
      );
      setValue(
        `addresses.${index}.location.city.mapAttribute.longitude`,
        coordinates[index]?.longitude
      );

      // Update other form control values as needed
    },
    [coordinates, setWatchAddresses, setValue, mapClicked]
  );

  const parseAddress = (addressString: string) => {
    const [street, city, stateZip, country] = addressString.split(", ");
    const [state, zip] = stateZip.split(" ");
    console.log("Street:", street);
    console.log("City:", city);
    console.log("StateZip:", stateZip);
    console.log("Country:", country);
    console.log("State:", state);
    console.log("Zip:", zip);

    return { street, city, state, zip, country };
  };
  const addAddress = () => {
    // Create a new address object with default values
    const newAddress = {
      businessHours: [
        { day: "Monday", endTime: "", open: false, startTime: "" },
        { day: "Tuesday", endTime: "", open: false, startTime: "" },
        { day: "Wednesday", endTime: "", open: false, startTime: "" },
        { day: "Thursday", endTime: "", open: false, startTime: "" },
        { day: "Friday", endTime: "", open: false, startTime: "" },
        { day: "Saturday", endTime: "", open: false, startTime: "" },
        { day: "Sunday", endTime: "", open: false, startTime: "" },
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
    };

    // Update the addresses state by adding the new address object
    setWatchAddresses([...watchAddresses, newAddress]);
  };

  const removeAddress = (index: number) => {
    console.log("Before removal:", watchAddresses);

    const updatedAddresses = watchAddresses.filter((_, i) => i !== index);
    console.log("After removal:", updatedAddresses);

    setValue("addresses", updatedAddresses);
    setWatchAddresses([...updatedAddresses]);
  };
  const deleteWebPresence = async (id: number) => {
    try {
      await deleteWebpresenceParts(id.toString());
      console.log(`Web presence with ID ${id} deleted successfully.`);
      setWebPresence((prevWebPresence) =>
        prevWebPresence.filter((webPresence) => webPresence.id !== id)
      );
    } catch (error) {
      console.error("Error deleting web presence:", error);
    }
  };
  const addTag = async (tagId: number) => {
    try {
      // Call the addTagParts API function to add the tag
      const response = await addTagParts(id.toString(), tagId.toString());
      console.log(`Tag ${tagId} added successfully.`, response);
    } catch (error) {
      console.error("Error adding tag:", error);
    }
  };
  const removeTag = async (tagId: number) => {
    try {
      // Call the removeTagParts API function to remove the tag
      const response = await removeTagParts(id.toString(), tagId.toString());
      console.log(`Tag ${tagId} removed successfully.`, response);
    } catch (error) {
      console.error("Error removing tag:", error);
    }
  };
  const [currentStep, setCurrentStep] = useState(0);
  const handleNext = () => {
    // Add validation logic here if needed
    // For example, check if all required fields are filled for the current step

    // Move to the next step or perform other actions
    setCurrentStep((prevStep) => prevStep + 1);
  };
  const onSubmit = async (data: any) => {
    try {
      if (formValues) {
        let updatedProfilePictureUrl = formValues.profilePicture; // Initialize with the existing profile picture URL

        if (file !== null) {
          const newProfilePictureUrl = await uploadImage(file);
          updatedProfilePictureUrl = newProfilePictureUrl;
        }
        const storeData: StoreEditData = {
          additionalInformation: data.additionalInformation,
          description: data.description,
          hasClass: data.hasClass,
          learnWithUs: data.learnWithUs,
          name: data.name,
          profilePicture: updatedProfilePictureUrl, // Use the updated profile picture URL
        };
        //console.log(storeData, "this is store data");
        //await editStoreParts(id.toString(), storeData);
      }
      for (let i = 0; i < data.webPresences.length; i++) {
        const webPresenceId = data.webPresences[i].id;
        const webPresenceData: WebPresenceEdit = {
          link: data.webPresences[i].link,
        };
        //await editWebpresenceParts(webPresenceId.toString(), webPresenceData);
        console.log("webpresenceId", webPresenceId);
        //console.log("webpresenceData", webPresenceData);
      }

      for (let i = 0; i < data.addresses.length; i++) {
        const address = data.addresses[i];
        const addressId = data.addresses[i]?.id;
        const addressData: AddressEdit = {
          phoneNumber: data.addresses[i]?.phoneNumber,
          email: data.addresses[i]?.email,
        };
        const locationId = data.addresses[i]?.location.id;
        const locationData: LocationEdit = {
          city: {
            countryName: data.addresses[i]?.location.city.countryName,
            countryShortName: data.addresses[i]?.location.city.countryShortName,
            mapAttribute: {
              latitude: data.addresses[i]?.location.city.mapAttribute.latitude,
              longitude:
                data.addresses[i]?.location.city.mapAttribute.longitude,
              name: data.addresses[i]?.location.city.mapAttribute.name,
              shortName:
                data.addresses[i]?.location.city.mapAttribute.shortName,
              zoom: data.addresses[i]?.location.city.mapAttribute.zoom,
            },
          },
          latitude: data.addresses[i]?.location.latitude,
          longitude: data.addresses[i]?.location.longitude,
          route: data.addresses[i]?.location.route,
          secondStreet: data.addresses[i]?.location.secondStreet,
          state: data.addresses[i]?.location.state,
          street: data.addresses[i]?.location.street,
          tip: data.addresses[i]?.location.tip,
          zip: data.addresses[i]?.location.zip,
        };
        if (addressId && addressData) {
          //await editAddressParts(addressId.toString(), addressData);
        }
        if (locationId && locationData) {
          //await editAddressLocationParts(locationId.toString(), locationData);
        }
        console.log(addressId, "this is addressId");
        //console.log(addressData, "this is addressData");

        console.log(locationId, "this is location id");
        // console.log(locationData, "this is locationData");
        for (let j = 0; j < address.businessHours.length; j++) {
          const businessHour = address.businessHours[j];
          console.log("Business Hour ID:", businessHour.id);
          const businessHourId = businessHour.id;
          const businessHourData: BusinessHour = {
            day: businessHour.day,
            open: businessHour.open,
            startTime: businessHour.startTime,
            endTime: businessHour.endTime,
          };
          if (businessHourId && businessHourData) {
            // await editAddressBusinessHourParts(
            //   businessHourId.toString(),
            //   businessHourData
            // );
          }
        }
      }

      console.log("Store data updated successfully!");
    } catch (error) {
      console.error("Error updating store data:", error);
    }
  };

  const steps = ["Store Info", "Address", "Working Hours", "Tags"];
  return (
    <>
      <div className={isOpen ? "storeForm" : "storeForm-disabled"}>
        <div className="plussign">
          <h1>
            <IoIosCloseCircleOutline />
          </h1>
        </div>
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
                <img
                  src={`${formValues?.profilePicture}`}
                  className="img-fluid"
                  alt="..."
                />
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
              {watchWebPresence.map((_address, index) => (
                <div>
                  <div className="address-section-input">
                    <div className="col">
                      <div className="input-group-text">
                        <input
                          className="input-group-text"
                          id="link"
                          {...register(`webPresences.${index}.webSite`)}
                          readOnly
                        />
                        <input
                          type="text"
                          className="form-control"
                          aria-label="link"
                          {...register(`webPresences.${index}.link`)}
                        />
                        <h6>
                          <IoIosCloseCircleOutline
                            onClick={() => deleteWebPresence(WebPresenceID)}
                          />
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
          {currentStep === 1 && (
            /* Working Hours */
            <>
              {watchAddresses.map((_address, index) => (
                <div className="address-section">
                  <div key={index} className="address-section-input">
                    <input
                      type="number"
                      className="form-control"
                      id=""
                      placeholder="1234 Main St"
                      {...register(`addresses.${index}.id`)}
                    />
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
              {/* Map through the watchAddresses array and render address fields */}
              {watchAddresses.map((address, index) => (
                <div key={index} className="businessHours">
                  {/* Map through businessHours array for each address */}
                  {address.businessHours.map((businessHour, index2) => (
                    <div key={index2} className="workingHours">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`flexRadioDefault${index2}`}
                          {...register(
                            `addresses.${index}.businessHours.${index2}.open`
                          )}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`flexRadioDefault${index2}`}
                        >
                          {businessHour.day}
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
                                `addresses.${index}.businessHours.${index2}.startTime`
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
                                `addresses.${index}.businessHours.${index2}.endTime`
                              )}
                            />
                            <label htmlFor="endTime">End Time</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </>
          )}
          {currentStep === 3 && (
            /* Tags */
            <>
              <TagFetcher
                render={(tags) => (
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
                        selectedValues={watchTagsTag}
                        onSelect={(selectedList, selectedItem) => {
                          if (selectedItem) {
                            const selectedTag = tags.find(
                              (tag) => tag.tag === selectedItem
                            );
                            if (
                              selectedTag &&
                              typeof selectedTag.id === "number"
                            ) {
                              // Type check for id
                              addTag(selectedTag.id);
                            }
                          }
                        }}
                        onRemove={(selectedList, removedItem) => {
                          if (removedItem) {
                            const removedTag = tags.find(
                              (tag) => tag.tag === removedItem
                            );
                            if (
                              removedTag &&
                              typeof removedTag.id === "number"
                            ) {
                              // Type check for id
                              removeTag(removedTag.id);
                            }
                          }
                        }}
                      />
                    </div>
                  </>
                )}
              />

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

export default EditStoreForm;
