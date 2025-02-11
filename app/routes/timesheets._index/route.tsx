import { useLoaderData, useNavigate } from "react-router";
import { useState } from "react";
import { getDB } from "~/db/getDB";

export async function loader() {
  const db = await getDB();
  
  const timesheetsAndEmployees = await db.all(
    "SELECT timesheets.*, employees.full_name, employees.id AS employee_id FROM timesheets JOIN employees ON timesheets.employee_id = employees.id"
  );

  return { timesheetsAndEmployees };
}

export default function TimesheetsPage() {
  const { timesheetsAndEmployees } = useLoaderData();
 const navigate = useNavigate();
  return (
    <div className="p-[2%]  flex justify-center items-center flex-col">
      <h1 className="text-[2rem] w-[80%] py-[1%]">All Timesheets</h1>
      <div className=" my-[15px] w-[80%] flex justify-end gap-[20px]">
        <button className=" p-[0.5%] border-[1px] border-gray-800">
          Table View
        </button>
        <button className=" p-[0.5%] border-[1px] border-gray-800">
          Calendar View
        </button>
      </div>
      {/* Replace `true` by a variable that is changed when the view buttons are clicked */}
      {true ? (
        <div className=" w-[80%] ">
          <table className="min-w-full">
            <thead className="bg-gray-800 text-white">
              <tr className="bg-green">
                <th className="w-1/4 py-2">Timesheet #</th>
                <th className="w-1/4 py-2">Employee</th>
                <th className="w-1/4 py-2">Start Time:</th>
                <th className="w-1/4 py-2">End Time:</th>
              </tr>
            </thead>
            <tbody>
              {timesheetsAndEmployees.length === 0 && (
                <div>There are no TimeSheets</div>
              )}
              {timesheetsAndEmployees?.map((timesheet: any) => (
                <tr
                  key={timesheet.id}
                  className="text-center border-b cursor-pointer hover:bg-[#dfd9e2] "
                  onClick={() => navigate(`/timesheets/${timesheet.id}`)}
                >
                  <td className="py-2">{timesheet.id}</td>
                  <td className="py-2">
                    {timesheet.full_name} (ID: {timesheet.employee_id})
                  </td>
                  <td className="py-2">{timesheet.start_time}</td>
                  <td className="py-2">{timesheet.end_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <p>
            To implement, see{" "}
            <a href="https://schedule-x.dev/docs/frameworks/react">
              Schedule X React documentation
            </a>
            .
          </p>
        </div>
      )}
      <hr />
      <ul className=" w-[80%] flex flex-col gap-[10px] py-[1%]">
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
