import { useLoaderData, useNavigate } from "react-router";
import { useState } from "react";
import { getDB } from "~/db/getDB";
import CalendarApp from "~/Components/Calendar";
import TableComponent from "~/Components/TableComponent";

export async function loader() {
  const db = await getDB();

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
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const calendarEvents = timesheetsAndEmployees.map((timesheet: any) => ({
    id: timesheet.id,
    title: `Timesheet for ${timesheet.full_name}`,
    start: timesheet.start_time,
    end: timesheet.end_time,
    description: timesheet.summary,
  }));

  const filteredTimesheets = timesheetsAndEmployees.filter((timesheet) => {
    const searchValue = search.toLowerCase();
    const matchesSearch =
      timesheet.full_name.toLowerCase().includes(searchValue) ||
      timesheet.id.toString().includes(searchValue);

    const matchesEmployee =
      selectedEmployee === "" ||
      timesheet.employee_id.toString() === selectedEmployee;

    return matchesSearch && matchesEmployee;
  });

  const columns = [
    { label: "Timesheet #", field: "id" },
    { label: "Employee", field: "full_name" },
    { label: "Start Time", field: "start_time" },
    { label: "End Time", field: "end_time" },
    { label: "Summary", field: "summary" },
  ];

  const handleRowClick = (timesheet) => {
    navigate(`/timesheets/${timesheet.id}`);
  };

  return (
    <div className="p-[2%] flex justify-center items-center flex-col">
      <h1 className="text-[2rem] w-[80%] py-[1%]">All Timesheets</h1>

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
        <>
          <div className=" w-[80%] flex justify-between gap-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Employee name or Timesheet #"
              className="p-2 mb-4 border rounded"
            />

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
          <div className="w-[80%]">
            <TableComponent
              data={filteredTimesheets}
              columns={columns}
              onRowClick={handleRowClick}
            />
          </div>
        </>
      ) : (
        <div className="w-[80%]">
          <CalendarApp events={calendarEvents} />
        </div>
      )}

      <ul className="w-[80%] flex flex-col gap-[10px] py-[1%]">
        <li className="text-blue-500">
          <a href="/timesheets/new">New Timesheet</a>
        </li>
        <li className="text-blue-500">
          <a href="/employees">Employees</a>
        </li>
      </ul>
    </div>
  );
}
