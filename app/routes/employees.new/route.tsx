import { Form, redirect, type ActionFunction } from "react-router";
import { getDB } from "~/db/getDB";
import EmployeeForm from "~/Components/EmployeeForm";
export const action: ActionFunction = async ({ request }) => {
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
  const department = formData.get("department");
  const job_title = formData.get("job_title");
  const salary = formData.get("salary");
  const start_date = formData.get("start-date");
  const end_date = formData.get("end-date");

  const db = await getDB();

  await db.run(
    "INSERT INTO employees (full_name, email, phone_number, date_of_birth, gender, nationality, marital_status, current_address, company, department, job_title, salary, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
      department,
      job_title,
      salary,
      start_date,
      end_date,
    ]
  );
console.log("it went to the addition not edittt")
  return redirect("/employees");
};

export default function NewEmployeePage() {
  return (
    <>
      <EmployeeForm />
      <ul>
        <li>
          <a href="/employees">Employees</a>
        </li>
        <li>
          <a href="/timesheets">Timesheets</a>
        </li>
      </ul>
    </>
  );
}
