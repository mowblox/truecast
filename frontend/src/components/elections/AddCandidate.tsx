"use client";
import Image from "next/image";
import { useCallback, useState } from "react";

export default function AddCandidate() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openFormPanelIndex, setOpenFormPanelIndex] = useState<number | null>(
    0
  );
  const [formData, setFormData] = useState<{ [key: number]: any }>({}); // To store form data

  const [forms, setForms] = useState<number[]>([1, 2, 3, 4]);
  const tabs = ["Election", "Candidates", "Voters", "Summary", "Link"];

  const addForm = useCallback(() => {
    setForms((prevForms) => [...prevForms, prevForms.length + 1]); // Add new form index
  }, []);

  // Remove the form at the specified index
  const removeForm = (index: number) => {
    setForms((prevForms) => prevForms.filter((_, i) => i !== index));
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData };
      delete newFormData[index];
      return newFormData;
    });
  };

  // Handle input change event
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [index]: {
        ...prevFormData[index],
        [name]: value,
      },
    }));
  };

  // Handle file/image change event
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, files } = event.target;
    const file = files?.[0] || null;
    const imageUrl = file ? URL.createObjectURL(file) : null;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [index]: {
        ...prevFormData[index],
        [name]: file,
        preview: imageUrl
      },
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allFormData = forms.map((_, index) => formData[index] || {});
    console.log(allFormData);
  };

  // FormComponent definition
  const FormComponent = ({ index }: { index: number }) => {
    const isOpen = openFormPanelIndex === index;
    const formImagePreview = formData[index]?.preview;

    const togglePanel = () => {
      setOpenFormPanelIndex(isOpen ? null : index);
    };

    return (
      <div
        className={`w-full flex flex-col gap-4 ${isOpen ? "bg-dark-alt rounded-[10px]" : "gradient-bg rounded-lg"
          }`}
      >
        <div
          onClick={togglePanel}
          className="w-full h-12 flex items-center justify-between px-4 rounded-md bg-gradient-to-r from-primary to-secondary cursor-pointer"
        >
          <span className="text-white text-lg font-space-grotesk">
            Candidate {index + 1}
          </span>
          <Image
            src="/images/add-candidate-icon.svg"
            width={24}
            height={24}
            alt="Add Candidate"
          />
        </div>
        <form
          className={`grid transition-all duration-[0.4s] ${isOpen ? "grid-rows-[1fr] pt-10 pb-20" : "grid-rows-[0fr]"
            }`}
        >
          <div className="overflow-hidden flex flex-col gap-10">
            <div className="flex flex-col">
              <label
                htmlFor={`fullname-${index}`}
                className="text-sm md:text-base font-space-grotesk"
              >
                Full Name
              </label>
              <input
                type="text"
                id={`fullname-${index}`}
                name="fullname"
                value={formData[index]?.fullname || ""}
                onChange={(e) => handleInputChange(e, index)}
                className="w-full h-10 border-b-2 border-opacity-10 border-b-subtle-text bg-[#09090B] focus:outline-none"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor={`team-${index}`}
                className="text-sm md:text-base font-space-grotesk"
              >
                Team
              </label>
              <input
                type="text"
                id={`team-${index}`}
                name="team"
                value={formData[index]?.team || ""}
                onChange={(e) => handleInputChange(e, index)}
                className="w-full h-10 border-b-2 border-opacity-10 border-b-subtle-text bg-[#09090B] focus:outline-none"
                required
              />
            </div>
            <div className="flex flex-col gap-4">
              <label
                htmlFor={`upload-image-${index}`}
                className="text-sm md:text-base font-space-grotesk"
              >
                Upload image
              </label>
              <div className="w-full h-44 flex justify-center items-center relative border border-subtle-text border-dotted rounded-lg p-6 cursor-pointer">
                <input
                  type="file"
                  id={`upload-image-${index}`}
                  name="image"
                  onChange={(e) => handleFileChange(e, index)}
                  className="absolute inset-0 w-full h-full opacity-0 z-50"
                />
                {formImagePreview ? (
                  <Image
                    src={formImagePreview}
                    alt={`Preview of Candidate ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <Image
                      className="mx-auto h-12 w-12"
                      src="/images/add-candidate-image-icon.svg"
                      alt="Upload Image"
                      width={48}
                      height={48}
                    />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      <label className="relative cursor-pointer">
                        <div className="flex flex-col">
                          <span className="text-base font-roboto-flex font-normal">
                            Drag your image here or browse
                          </span>
                          <span className="text-subtle-text text-xs">
                            Support JPG, PNG, SVG
                          </span>
                        </div>
                      </label>
                    </h3>
                  </div>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeForm(index)}
              className="flex self-end border-b-2 border-b-secondary focus:outline-none"
            >
              - remove
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="w-full mb-28">
      <div className="w-full flex flex-col gap-4  px-2">
        <div>{forms.map((_, k) => (
          <div key={k}>
            {FormComponent({ index: k })}
          </div>
        ))}</div>
        <button
          type="button"
          onClick={addForm}
          className="text-sm md:text-base self-end border-b-4 border-b-secondary focus:outline-none"
        >
          Add more
        </button>
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="md:mr-0 mr-2 text-sm md:text-base w-24 md:w-48 py-2 md:py-4 self-end border border-subtle-text rounded-full"
      >
        Save
      </button>
    </div>
  );
}
