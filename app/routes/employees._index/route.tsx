import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { getDB } from "~/db/getDB";

export async function loader() {
  const db = await getDB();
  const employees = await db.all("SELECT * FROM employees;");
  return { employees };
}

export default function EmployeesPage() {
  const { employees } = useLoaderData();
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState(""); 
  const [sortField, setSortField] = useState(""); 
  const [sortOrder, setSortOrder] = useState("asc"); 
  const [currentPage, setCurrentPage] = useState(1); 
  const employeesPerPage = 5; 

  const handleSort = (field: any) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredEmployees = employees.filter((employee: any) => {
    const searchValue = search.toLowerCase();
    const matchesSearch =
      employee.full_name.toLowerCase().includes(searchValue) ||
      employee.id.toString().includes(searchValue);
    const matchesDepartment =
      department === "" || employee.department === department;
    return matchesSearch && matchesDepartment
  });

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    const fieldA = a[sortField]?.toString().toLowerCase() || "";
    const fieldB = b[sortField]?.toString().toLowerCase() || "";
    return sortOrder === "asc"
      ? fieldA.localeCompare(fieldB, undefined, { numeric: true })
      : fieldB.localeCompare(fieldA, undefined, { numeric: true });
  });

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = sortedEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  const navigate = useNavigate();
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="p-[2%] flex justify-center items-center flex-col">
      <h1 className="text-[2rem] w-[80%] py-[1%]">All Employees</h1>

      <div className=" w-[80%] flex justify-between">
        <input
          type="text"
          placeholder="Search employees by name or id"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 mb-4 border rounded"
        />

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="p-2 mb-4 border rounded"
        >
          <option value="">All Departments</option>
          <option value="finance">Finance</option>
          <option value="sales">Sales</option>
          <option value="marketing">Marketing</option>
          <option value="informationTechnology">
            Information Technology (IT)
          </option>
          <option value="others">Others</option>
        </select>
      </div>
      <div className="w-[80%]">
        <table className="min-w-full">
          <thead className="bg-gray-800 text-white">
            <tr className="bg-green">
              <th
                className="w-1/4 py-2 cursor-pointer"
                onClick={() => handleSort("id")}
              >
                Employee #
                {sortField === "id" && (sortOrder === "asc" ? " ↑" : " ↓")}
              </th>
              <th
                className="w-1/4 py-2 cursor-pointer"
                onClick={() => handleSort("full_name")}
              >
                Name
                {sortField === "full_name" &&
                  (sortOrder === "asc" ? " ↑" : " ↓")}
              </th>
              <th
                className="w-1/4 py-2 cursor-pointer"
                onClick={() => handleSort("department")}
              >
                Department
                {sortField === "department" &&
                  (sortOrder === "asc" ? " ↑" : " ↓")}
              </th>
              <th
                className="w-1/4 py-2 cursor-pointer"
                onClick={() => handleSort("phone_number")}
              >
                Phone Number
                {sortField === "phone_number" &&
                  (sortOrder === "asc" ? " ↑" : " ↓")}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.length === 0 && (
              <tr>
                <td className="text-center py-4" colSpan={4}>
                  No employees found
                </td>
              </tr>
            )}
            {currentEmployees.map((employee: any) => (
              <tr
                key={employee.id}
                className="text-center border-b cursor-pointer hover:bg-[#dfd9e2]"
                onClick={() => navigate(`/employees/${employee.id}`)}
              >
                <td className="py-2">{employee.id}</td>
                <td className="py-2">{employee.full_name}</td>
                <td className="py-2">{employee.department}</td>
                <td className="py-2">{employee.phone_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-[80%] flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded ${
            currentPage === 1 ? "opacity-50" : ""
          }`}
        >
          Previous
        </button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border rounded ${
            currentPage === totalPages ? "opacity-50" : ""
          }`}
        >
          Next
        </button>
      </div>

      <ul className="w-[80%] flex flex-col gap-[10px] py-[1%]">
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
