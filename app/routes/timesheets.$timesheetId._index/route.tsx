import TimesheetForm from "~/Components/TimesheetForm"
import { getDB } from "~/db/getDB";
import { useLoaderData, redirect, type ActionFunction } from "react-router";


export const loader = async ({ params }) => {
  const { timesheetId } = params;
  const db = await getDB();

  // Fetch the timesheet
  const timesheet = await db.get("SELECT * FROM timesheets WHERE id = ?", [
    timesheetId,
  ]);

  // Fetch the employees for the select dropdown
  const employees = await db.all("SELECT id, full_name FROM employees");

  return { timesheet, employees };
};


export const action: ActionFunction = async ({ request, params }) => {
  const { timesheetId } = params;
  const formData = await request.formData();
  const employee_id = formData.get("employee_id");
  const start_time = formData.get("start_time");
  const end_time = formData.get("end_time");

  const db = await getDB();

  await db.run(
    "UPDATE timesheets SET employee_id=?, start_time = ?, end_time = ? WHERE id = ?",
    [employee_id, start_time, end_time, timesheetId]
  );

  return redirect("/timesheets");
};

export default function TimesheetPage() {
  const { timesheet } = useLoaderData();
  console.log("timesheet withing the TimesheetPage", timesheet);
  return (
    <div>
      <TimesheetForm timesheetData={timesheet} />
      <ul>
        <li><a href="/timesheets">Timesheets</a></li>
        <li><a href="/timesheets/new">New Timesheet</a></li>
        <li><a href="/employees/">Employees</a></li>
      </ul>
    </div>
  )
}
