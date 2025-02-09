// EmployeeForm.tsx
import { Form } from "react-router";
import InputFields from "~/Components/InputFields";

export default function EmployeeForm() {
  return (
    <div className="p-[2%] flex justify-center items-center flex-col">
      <h1 className="text-[2rem] w-[80%] py-[1%]">Create New Employee</h1>

      <Form method="post" className=" w-[80%] flex flex-col gap-[50px]">
        <div className="space-y-4">
          <p className="font-bold text-xl">Employee Personal Information</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputFields
              label="Full Name"
              name="full_name"
              id="full_name"
              required
              placeholder="Enter full name"
            />

            <InputFields
              label="Email"
              type="email"
              name="email"
              id="email"
              required
              placeholder="Enter email"
            />

            <InputFields
              label="Phone Number"
              type="tel"
              name="phone_number"
              id="phone_number"
              required
              placeholder="Enter phone number"
            />

            <InputFields
              label="Date of Birth"
              type="date"
              name="date_of_birth"
              id="date_of_birth"
              required
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
            />

            <InputFields
              label="Nationality"
              name="nationality"
              id="nationality"
              required
              placeholder="Enter nationality"
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
            />

            <InputFields
              label="Current Address"
              name="current_address"
              id="current_address"
              required
              placeholder="Enter current address"
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
            />

            <InputFields
              label="Job Title"
              name="job_title"
              id="job_title"
              required
              placeholder="Enter job title"
            />

            <InputFields
              label="Department"
              name="department"
              id="department"
              required
              placeholder="Enter department"
            />

            <InputFields
              label="Salary"
              type="number"
              name="salary"
              id="salary"
              required
              placeholder="Enter salary"
            />

            <InputFields
              label="Start Date"
              type="date"
              name="start-date"
              id="start-date"
              required
            />

            <InputFields
              label="End Date"
              type="date"
              name="end-date"
              id="end-date"
              required
            />
          </div>
        </div>

        <div className="text-center flex ">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Create Employee
          </button>
        </div>
      </Form>

      <hr />
      <ul>
        <li>
          <a href="/employees">Employees</a>
        </li>
        <li>
          <a href="/timesheets">Timesheets</a>
        </li>
      </ul>
    </div>
  );
}
