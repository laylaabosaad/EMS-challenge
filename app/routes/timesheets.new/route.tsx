import { useLoaderData, Form, redirect } from "react-router";
import { getDB } from "~/db/getDB";
import InputFields from "~/Components/InputFields";
import { useState, useEffect } from "react";

export async function loader() {
  const db = await getDB();
  const employees = await db.all("SELECT id, full_name FROM employees");
  return { employees };
}

import type { ActionFunction } from "react-router";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const employee_id = formData.get("employee_id");
  const start_time = formData.get("start_time");
  const end_time = formData.get("end_time");

  const db = await getDB();
  await db.run(
    "INSERT INTO timesheets (employee_id, start_time, end_time) VALUES (?, ?, ?)",
    [employee_id, start_time, end_time]
  );

  return redirect("/timesheets");
};

export default function NewTimesheetPage() {
  const { employees } = useLoaderData(); // Used to create a select input
  return (
    <div className="p-[2%] flex justify-center items-center flex-col">
      <h1 className="text-[2rem] w-[80%] py-[1%]">Create New Timesheet</h1>
      <Form method="post" className="w-[80%]">
        <div className="w-[80%] flex justify-between">
          {/* Employee Select Input */}
          <InputFields
            label="Employee"
            type="select"
            name="employee_id" // Updated name to match action handler
            id="employee"
            required
            placeholder="Select Employee"
            options={employees.map((employee) => ({
              value: employee.id,
              label: employee.full_name,
            }))} // Dynamically generate options from employees data
          />
          {/* Start Time Input */}
          <InputFields
            label="Start Time"
            type="datetime-local"
            name="start_time"
            id="start_time"
            required
          />
          {/* End Time Input */}
          <InputFields
            label="End Time"
            type="datetime-local"
            name="end_time"
            id="end_time"
            required
          />
        </div>
        <button type="submit">Create Timesheet</button>
      </Form>
      <hr />
      <ul>
        <li>
          <a href="/timesheets">Timesheets</a>
        </li>
        <li>
          <a href="/employees">Employees</a>
        </li>
      </ul>
    </div>
  );
}
