import { Form, useParams } from "react-router";
import InputFields from "~/Components/InputFields";
import { useState, useEffect } from "react";

export default function EmployeeForm({ employeeData }) {
  const { employeeId } = useParams();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    date_of_birth: null,
    gender: "",
    nationality: "",
    marital_status: "",
    current_address: "",
    company: "",
    job_title: "",
    salary: "",
    start_date: null,
    end_date: null,
  });

  useEffect(() => {
    if (employeeData) {
      setFormData(employeeData);
    }
  }, [employeeData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="p-[2%] flex justify-center items-center flex-col">
      <h1 className="text-[2rem] w-[80%] py-[1%]">
        {employeeId ? "Edit Employee" : "Create New Employee"}
      </h1>
      <Form method="post" className="w-[80%] flex flex-col gap-[50px]">
        <div className="space-y-4">
          <p className="font-bold text-xl">Employee Personal Information</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputFields
              label="Full Name"
              name="full_name"
              id="full_name"
              required
              placeholder="Enter full name"
              value={formData.full_name}
              onChange={handleInputChange}
            />

            <InputFields
              label="Email"
              type="email"
              name="email"
              id="email"
              required
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <InputFields
              label="Phone Number"
              type="tel"
              name="phone_number"
              id="phone_number"
              required
              placeholder="Enter phone number"
              value={formData.phone_number}
              onChange={handleInputChange}
            />
            <InputFields
              label="Date of Birth"
              type="date"
              name="date_of_birth"
              id="date_of_birth"
              required
              value={formData.date_of_birth}
              onChange={handleInputChange}
            />

            <InputFields
              label="Gender"
              type="select"
              name="gender"
              id="gender"
              required
              placeholder="Select Gender"
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ]}
              value={formData.gender}
              onChange={handleInputChange}
            />

            <InputFields
              label="Nationality"
              name="nationality"
              id="nationality"
              required
              placeholder="Enter nationality"
              value={formData.nationality}
              onChange={handleInputChange}
            />

            <InputFields
              label="Marital Status"
              type="select"
              name="marital_status"
              id="marital_status"
              required
              placeholder="Select Marital Status"
              options={[
                { value: "single", label: "Single" },
                { value: "married", label: "Married" },
                { value: "divorced", label: "Divorced" },
              ]}
              value={formData.marital_status}
              onChange={handleInputChange}
            />

            <InputFields
              label="Current Address"
              name="current_address"
              id="current_address"
              required
              placeholder="Enter current address"
              value={formData.current_address}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="space-y-4">
          <p className="font-bold text-xl">Job Information</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputFields
              label="Company"
              name="company"
              id="company"
              required
              placeholder="Enter company"
              value={formData.company}
              onChange={handleInputChange}
            />

            <InputFields
              label="Job Title"
              name="job_title"
              id="job_title"
              required
              placeholder="Enter job title"
              value={formData.job_title}
              onChange={handleInputChange}
            />
            <InputFields
              label="Salary"
              type="number"
              name="salary"
              id="salary"
              required
              placeholder="Enter salary"
              value={formData.salary}
              onChange={handleInputChange}
            />

            <InputFields
              label="Start Date"
              type="date"
              name="start-date"
              id="start-date"
              value={formData.start_date}
              onChange={handleInputChange}
              required
            />

            <InputFields
              label="End Date"
              type="date"
              name="end-date"
              id="end-date"
              value={formData.end_date}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="text-center flex ">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {employeeId ? "Edit Employee" : "Create New Employee"}
          </button>
        </div>
      </Form>

      <hr />
    </div>
  );
}
