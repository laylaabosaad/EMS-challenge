import { useLoaderData, useNavigate } from "react-router"
import { getDB } from "~/db/getDB"


export async function loader() {
  const db = await getDB()
  const employees = await db.all("SELECT * FROM employees;")

  return { employees }
}

export default function EmployeesPage() {
  const { employees } = useLoaderData()
  const navigate=useNavigate()
  return (
    <div className="p-[2%] flex justify-center items-center flex-col">
      <h1 className="text-[2rem] w-[80%] py-[1%]">All Employees</h1>
      <div className=" w-[80%] ">
        <table className="min-w-full">
          <thead className="bg-gray-800 text-white">
            <tr className="bg-green">
              <th className="w-1/4 py-2">Employee #</th>
              <th className="w-1/4 py-2">Name</th>
              <th className="w-1/4 py-2">Email</th>
              <th className="w-1/4 py-2">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee: any) => (
              <tr
                key={employee.id}
                className="text-center border-b cursor-pointer hover:bg-[#dfd9e2] "
                onClick={() => navigate(`/employees/${employee.id}`)}
              >
                <td className="py-2">{employee.id}</td>
                <td className="py-2">{employee.full_name}</td>
                <td className="py-2">{employee.email}</td>
                <td className="py-2">{employee.phone_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul>
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
