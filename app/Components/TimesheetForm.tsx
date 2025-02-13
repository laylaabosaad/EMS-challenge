import InputFields from "~/Components/InputFields";
import { useLoaderData, Form, useParams } from "react-router";
import { useState, useEffect } from "react";

export default function TimesheetForm({ timesheetData }) {
  const { employees } = useLoaderData();
  const [formData, setFormData] = useState({
    employee_id: timesheetData?.employee_id || "",
    start_time: timesheetData?.start_time || "",
    end_time: timesheetData?.end_time || "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);
  const validateTimes = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);

    if (startTime >= endTime) {
      setErrorMessage("Start time must be before the end time.");
      setIsFormValid(false);
    } else {
      setErrorMessage("");
      setIsFormValid(true);
    }
  };


const handleInputChange = (e) => {
  const { name, value } = e.target;

let updatedFormData = { ...formData, [name]: value };

    if (name === "start_time" || name === "end_time") {
      const formattedValue = value.replace("T", " ") + ":00";
      updatedFormData = { ...formData, [name]: formattedValue };

      // Perform validation after both start_time and end_time are updated
      if (name === "start_time") {
        validateTimes(formattedValue, formData.end_time);
      } else if (name === "end_time") {
        validateTimes(formData.start_time, formattedValue);
      }
       setFormData(updatedFormData);
    }else {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
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
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        <div className="text-center flex">
          <button
            disabled={!!errorMessage}
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
