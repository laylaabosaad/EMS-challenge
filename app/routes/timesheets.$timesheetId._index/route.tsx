import TimesheetForm from "~/Components/TimesheetForm";
import { getDB } from "~/db/getDB";
import { useLoaderData, redirect, type ActionFunction } from "react-router";

export const loader = async ({ params }) => {
  const { timesheetId } = params;
  const db = await getDB();
  const timesheet = await db.get("SELECT * FROM timesheets WHERE id = ?", [
    timesheetId,
  ]);
  const employees = await db.all("SELECT id, full_name FROM employees");

  return { timesheet, employees };
};

export const action: ActionFunction = async ({ request, params }) => {
  const { timesheetId } = params;
  const formData = await request.formData();
  const employee_id = formData.get("employee_id");
  const start_time = formData.get("start_time");
  const end_time = formData.get("end_time");
  const summary = formData.get("summary");

  const db = await getDB();

  await db.run(
    "UPDATE timesheets SET employee_id=?, start_time = ?, end_time = ?, summary = ? WHERE id = ?",
    [employee_id, start_time, end_time, summary, timesheetId]
  );

  return redirect("/timesheets");
};

export default function TimesheetPage() {
  const { timesheet } = useLoaderData();
  return (
    <>
      <TimesheetForm timesheetData={timesheet} />
      <div className=" flex justify-center">
        <ul className="w-[80%] flex flex-col gap-[10px] px-[2%] pb-[1%]">
          <li className="text-blue-500">
            <a href="/timesheets">Timesheets</a>
          </li>
          <li className="text-blue-500">
            <a href="/timesheets/new">New Timesheet</a>
          </li>
          <li className="text-blue-500">
            <a href="/employees/">Employees</a>
          </li>
        </ul>
      </div>
    </>
  );
}
