import InputFields from "~/Components/InputFields";
import { useLoaderData, Form, useParams } from "react-router";
import { useState, useEffect } from "react";

export default function TimesheetForm({ timesheetData }) {
  const { employees } = useLoaderData(); // Fetch employee data
  console.log("employees in the form", employees);
  console.log("timesheetData in the form", timesheetData);
  const [formData, setFormData] = useState({
    employee_id: timesheetData?.employee_id || "",
    start_time: timesheetData?.start_time || "",
    end_time: timesheetData?.end_time || "",
  });

  // Handle input change
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
        {timesheetData ? "Edit Timesheet" : "Create New Timesheet"}
      </h1>
      <Form method="post" className="w-[80%] flex flex-col gap-[50px]">
        <div className="w-[80%] flex justify-between">
          <InputFields
            label="Employee"
            type="select"
            name="employee_id"
            id="employee"
            required
            placeholder="Select Employee"
            options={employees?.map((employee: any) => ({
              key: employee.id,
              value: employee.id,
              label: employee.full_name,
            }))}
            value={formData.employee_id}
            onChange={handleInputChange}
          />
          <InputFields
            label="Start Time"
            type="datetime-local"
            name="start_time"
            id="start_time"
            value={formData.start_time}
            onChange={handleInputChange}
            required
          />
          <InputFields
            label="End Time"
            type="datetime-local"
            name="end_time"
            id="end_time"
            value={formData.end_time}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="text-center flex">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {timesheetData ? "Update Timesheet" : "Create Timesheet"}
          </button>
        </div>
      </Form>
    </div>
  );
}
