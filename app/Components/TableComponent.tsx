import { useState } from "react";

function TableComponent({ data, columns, onRowClick }) {
  const [sortField, setSortField] = useState("id" || "");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const fieldA = a[sortField]?.toString().toLowerCase() || "";
    const fieldB = b[sortField]?.toString().toLowerCase() || "";
    return sortOrder === "asc"
      ? fieldA.localeCompare(fieldB, undefined, { numeric: true })
      : fieldB.localeCompare(fieldA, undefined, { numeric: true });
  });

  return (
    <table className="min-w-full">
      <thead className="bg-gray-800 text-white">
        <tr>
          {columns.map((col) => (
            <th
              key={col.field}
              className="py-2 cursor-pointer"
              onClick={() => handleSort(col.field)}
            >
              {col.label}
              {sortField === col.field && (sortOrder === "asc" ? " ↑" : " ↓")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.length === 0 && (
          <tr>
            <td className="py-2 text-center" colSpan={columns.length}>
              No data found
            </td>
          </tr>
        )}
        {sortedData.map((row, idx) => (
          <tr
            key={idx}
            className="text-center border-b cursor-pointer hover:bg-[#dfd9e2]"
            onClick={() => onRowClick(row)}
          >
            {columns.map((col) => (
              <td key={col.field} className="py-2">
                {row[col.field]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableComponent;
