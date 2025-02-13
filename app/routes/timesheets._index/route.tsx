import { useLoaderData, useNavigate } from "react-router";
import { useState } from "react";
import { getDB } from "~/db/getDB";
import CalendarApp from "~/Components/Calendar";

export async function loader() {
  const db = await getDB();

  // Fetch timesheets and employees data
  const timesheetsAndEmployees = await db.all(
    "SELECT timesheets.*, employees.full_name, employees.id AS employee_id FROM timesheets JOIN employees ON timesheets.employee_id = employees.id"
  );
  const employees = await db.all("SELECT id, full_name FROM employees");

  timesheetsAndEmployees.forEach((timesheet) => {
    timesheet.start_time = timesheet.start_time.replace("T", " ");
    timesheet.end_time = timesheet.end_time.replace("T", " ");
  });

  return { timesheetsAndEmployees, employees };
}

export default function TimesheetsPage() {
  const { timesheetsAndEmployees, employees } = useLoaderData();
  const navigate = useNavigate();
  const [view, setView] = useState("table");
  const [search, setSearch] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(""); // Add state for employee filter

  const calendarEvents = timesheetsAndEmployees.map((timesheet: any) => ({
    id: timesheet.id,
    title: `Timesheet for ${timesheet.full_name}`,
    start: timesheet.start_time,
    end: timesheet.end_time,
    description: timesheet.summary,
  }));

  // Filter timesheets based on search value and selected employee
  const filteredTimesheets = timesheetsAndEmployees.filter((timesheet) => {
    const searchValue = search.toLowerCase();
    const matchesSearch =
      timesheet.full_name.toLowerCase().includes(searchValue) || // Search by employee name
      timesheet.id.toString().includes(searchValue);

    const matchesEmployee =
      selectedEmployee === "" ||
      timesheet.employee_id.toString() === selectedEmployee;

    return matchesSearch && matchesEmployee;
  });

  return (
    <div className="p-[2%] flex justify-center items-center flex-col">
      <h1 className="text-[2rem] w-[80%] py-[1%]">All Timesheets</h1>

      {/* Search and employee filter */}
      <div className=" w-[80%] flex justify-between gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Employee name or Timesheet #"
          className="p-2 mb-4 border rounded"
        />

        {/* Employee filter dropdown */}
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          className="p-2 mb-4 border rounded"
        >
          <option value="">All Employees</option>
          {employees.map((employee: any) => (
            <option key={employee.id} value={employee.id}>
              {employee.full_name}
            </option>
          ))}
        </select>
      </div>

      <div className="my-[15px] w-[80%] flex justify-end gap-[20px]">
        <button
          className={`p-[0.5%] border-[1px] ${
            view === "table" ? "bg-gray-300" : "border-gray-800"
          }`}
          onClick={() => setView("table")}
        >
          Table View
        </button>
        <button
          className={`p-[0.5%] border-[1px] ${
            view === "calendar" ? "bg-gray-300" : "border-gray-800"
          }`}
          onClick={() => setView("calendar")}
        >
          Calendar View
        </button>
      </div>

      {view === "table" ? (
        <div className="w-[80%]">
          <table className="min-w-full">
            <thead className="bg-gray-800 text-white">
              <tr className="bg-green">
                <th className="w-1/5 py-2">Timesheet #</th>
                <th className="w-1/5 py-2">Employee</th>
                <th className="w-1/5 py-2">Start Time</th>
                <th className="w-1/5 py-2">End Time</th>
                <th className="w-1/5 py-2">Summary</th>
              </tr>
            </thead>
            <tbody>
              {filteredTimesheets.length === 0 && (
                <tr>
                  <td className="py-2 text-center" colSpan={5}>
                    No matching timesheets found.
                  </td>
                </tr>
              )}
              {filteredTimesheets.map((timesheet: any) => (
                <tr
                  key={timesheet.id}
                  className="text-center border-b cursor-pointer hover:bg-[#dfd9e2]"
                  onClick={() => navigate(`/timesheets/${timesheet.id}`)}
                >
                  <td className="py-2">{timesheet.id}</td>
                  <td className="py-2">
                    {timesheet.full_name} (ID: {timesheet.employee_id})
                  </td>
                  <td className="py-2">{timesheet.start_time}</td>
                  <td className="py-2">{timesheet.end_time}</td>
                  <td className="py-2">{timesheet.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="w-[80%]">
          <CalendarApp events={calendarEvents} />
        </div>
      )}

      <ul className="w-[80%] flex flex-col gap-[10px] py-[1%]">
        <li>
          <a href="/timesheets/new">New Timesheet</a>
        </li>
        <li>
          <a href="/employees">Employees</a>
        </li>
      </ul>
    </div>
  );
}
