import { useLoaderData, redirect, type ActionFunction } from "react-router";
import { getDB } from "~/db/getDB";
import EmployeeForm from "~/Components/EmployeeForm";

export const loader = async ({ params }) => {
  const { employeeId } = params;

  const db = await getDB();
  const employee = await db.get("SELECT * FROM employees WHERE id = ?", [
    employeeId,
  ]);
  return { employee };
};
export const action: ActionFunction = async ({ request, params }) => {
  const { employeeId } = params;
  const formData = await request.formData();
  const full_name = formData.get("full_name");
  const email = formData.get("email");
  const phone_number = formData.get("phone_number");
  const date_of_birth = formData.get("date_of_birth");
  const gender = formData.get("gender");
  const nationality = formData.get("nationality");
  const marital_status = formData.get("marital_status");
  const current_address = formData.get("current_address");
  const company = formData.get("company");
  const job_title = formData.get("job_title");
  const salary = formData.get("salary");
  const start_date = formData.get("start-date");
  const end_date = formData.get("end-date");

  const db = await getDB();

  await db.run(
    "UPDATE employees SET full_name = ?, email = ?, phone_number = ?, date_of_birth = ?, gender = ?, nationality = ?, marital_status = ?, current_address = ?, company = ?, job_title = ?, salary = ?, start_date = ?, end_date = ? WHERE id = ?",
    [
      full_name,
      email,
      phone_number,
      date_of_birth,
      gender,
      nationality,
      marital_status,
      current_address,
      company,
      job_title,
      salary,
      start_date,
      end_date,
      employeeId,
    ]
  );

  return redirect("/");
};
export default function EmployeePage() {
  const { employee } = useLoaderData();

  return (
    <div>
      <EmployeeForm employeeData={employee} />
      <ul>
        <li>
          <a href="/employees">Employees</a>
        </li>
        <li>
          <a href="/employees/new">New Employee</a>
        </li>
        <li>
          <a href="/timesheets/">Timesheets</a>
        </li>
      </ul>
    </div>
  );
}
