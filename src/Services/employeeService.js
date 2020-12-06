export const getDepartmentCollection = () => [
  { id: "1", title: "Developemt" },
  { id: "2", title: "HR" },
  { id: "3", title: "Accounts" },
  { id: "4", title: "Marketing" },
];

const KEYS = { employees: "employees", employeeId: "employeeId" };

export const insertEmployees = (data) => {
  let employees = getAllEmployees();
  data["id"] = generateEmployeeId();
  employees.push(data);
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
};

export const generateEmployeeId = () => {
  if (localStorage.getItem(KEYS.employees) == null)
    localStorage.setItem(KEYS.employees, 0);
  var id = parseInt(localStorage.getItem(KEYS.employeeId));
  localStorage.setItem(KEYS.employeeId, (++id).toString());
  return id;
};

export const getAllEmployees = () => {
  if (localStorage.getItem(KEYS.employees) == null)
    localStorage.setItem(KEYS.employees, JSON.stringify([]));
  let employees = JSON.parse(localStorage.getItem(KEYS.employees));
  const departments = getDepartmentCollection();
  return employees.map((x) => ({
    ...x,
    department: departments[x.departmentId - 1].title,
  }));
};
