import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbConfigPath = path.join(__dirname, '../database.yaml');
const dbConfig = yaml.load(fs.readFileSync(dbConfigPath, 'utf8'));

const {
  'sqlite_path': sqlitePath,
} = dbConfig;

const db = new sqlite3.Database(sqlitePath);

const employees = [
  {
    full_name: "John Doe",
    email: "john.doe@example.com",
    phone_number: 1234567890,
    date_of_birth: "1990-01-01",
    gender: "Male",
    nationality: "American",
    marital_status: "Single",
    current_address: "123 Main St, City, Country",
    company: "Company A",
    department: "marketing",
    job_title: "Manager",
    salary: 50000,
    start_date: "2023-01-01",
    end_date: "2025-12-31",
  },
  {
    full_name: "Jane Smith",
    email: "jane.smith@example.com",
    phone_number: 9876543210,
    date_of_birth: "1985-05-15",
    gender: "Female",
    nationality: "Canadian",
    marital_status: "Married",
    current_address: "456 Another St, City, Country",
    company: "Company B",
    department: "finance",
    job_title: "Accountant",
    salary: 60000,
    start_date: "2024-02-01",
    end_date: "2025-12-31",
  },
  {
    full_name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone_number: 1231231234,
    date_of_birth: "1992-07-10",
    gender: "Female",
    nationality: "British",
    marital_status: "Single",
    current_address: "789 Different St, City, Country",
    company: "Company C",
    department: "informationTechnology",
    job_title: "Developer",
    salary: 70000,
    start_date: "2025-01-01",
    end_date: "2025-12-31",
  },
];


const timesheets = [
  {
    employee_id: 1,
    start_time: "2025-02-10 08:00",
    end_time: "2025-02-10 17:00",
    summary: "John Doe worked from 08:00 to 17:00 on February 10, 2025.",
  },
  {
    employee_id: 2,
    start_time: "2025-02-11 12:00",
    end_time: "2025-02-11 17:00",
    summary: "Jane Smith worked from 12:00 to 17:00 on February 11, 2025.",
  },
  {
    employee_id: 3,
    start_time: "2025-02-12 07:00",
    end_time: "2025-02-12 16:00",
    summary: "Alice Johnson worked from 07:00 to 16:00 on February 12, 2025.",
  },
];



const insertData = (table, data) => {
  const columns = Object.keys(data[0]).join(', ');
  const placeholders = Object.keys(data[0]).map(() => '?').join(', ');

  const insertStmt = db.prepare(`INSERT INTO ${table} (${columns}) VALUES (${placeholders})`);

  data.forEach(row => {
    insertStmt.run(Object.values(row));
  });

  insertStmt.finalize();
};

db.serialize(() => {
  insertData('employees', employees);
  insertData('timesheets', timesheets);
});

db.close(err => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Database seeded successfully.');
  }
});

