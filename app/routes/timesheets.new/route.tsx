import { useLoaderData, Form, redirect } from "react-router";
import { getDB } from "~/db/getDB";

export async function loader() {
  try {
    const db = await getDB();
    const employees = await db.all("SELECT id, full_name FROM employees");
    return { employees };
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    throw new Response("Failed to load employees", { status: 500 });
  }
}

import type { ActionFunction } from "react-router";
import TimesheetForm from "~/Components/TimesheetForm";

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
  return (
    <>
      <TimesheetForm />

      <ul>
        <li>
          <a href="/timesheets">Timesheets</a>
        </li>
        <li>
          <a href="/employees">Employees</a>
        </li>
      </ul>
    </>
  );
}
