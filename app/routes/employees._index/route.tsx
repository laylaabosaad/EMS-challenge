import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import TableComponent from "~/Components/TableComponent";
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
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;

  const filteredEmployees = employees.filter((employee) => {
    const searchValue = search.toLowerCase();
    const matchesSearch =
      employee.full_name.toLowerCase().includes(searchValue) ||
      employee.id.toString().includes(searchValue);
    const matchesDepartment =
      department === "" || employee.department === department;
    return matchesSearch && matchesDepartment;
  });

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    const fieldA = a["id"]?.toString().toLowerCase() || "";
    const fieldB = b["asc"]?.toString().toLowerCase() || "";
    return fieldA.localeCompare(fieldB, undefined, { numeric: true });
  });

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const paginatedEmployees = sortedEmployees.slice(
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

  const columns = [
    { label: "Employee #", field: "id" },
    { label: "Name", field: "full_name" },
    { label: "Department", field: "department" },
    { label: "Phone Number", field: "phone_number" },
  ];

  const handleRowClick = (employee) => {
    navigate(`/employees/${employee.id}`);
  };

  return (
    <div className="p-[2%] flex justify-center items-center flex-col">
      <h1 className="text-[2rem] w-[80%] py-[1%]">All Employees</h1>

      <div className="w-[80%] flex justify-between">
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
        <TableComponent
          data={paginatedEmployees}
          columns={columns}
          onRowClick={handleRowClick}
        />
      </div>

      {/* Pagination Controls */}
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
          <a href="/employees/new" className="text-blue-500">
            New Employee
          </a>
        </li>
        <li>
          <a href="/timesheets/" className="text-blue-500">
            Timesheets
          </a>
        </li>
      </ul>
    </div>
  );
}
