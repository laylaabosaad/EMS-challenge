import EmployeeForm from "~/Components/EmployeeForm"

export async function loader() {
  return {}
}

export default function EmployeePage() {
  return (
    <div>
      <div>
       <EmployeeForm/>
      </div>
      <ul>
        <li><a href="/employees">Employees</a></li>
        <li><a href="/employees/new">New Employee</a></li>
        <li><a href="/timesheets/">Timesheets</a></li>
      </ul>
    </div>
  )
}
