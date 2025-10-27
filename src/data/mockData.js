
const roles = ["Admin", "User", "Manager"];
const names = ["Alice", "Bob", "Charlie", "Diana", "Ethan", "Fiona", "George", "Hannah", "Ian", "Jane"];

export const tableData = {
  columns: [
    { id: "name", ordinalNo: 1, title: "Name", type: "string", width: 250 },
    { id: "age", ordinalNo: 2, title: "Age", type: "number", width: 100 },
    { id: "active", ordinalNo: 3, title: "Active", type: "boolean", width: 120 },
    {
      id: "role",
      ordinalNo: 4,
      title: "Role",
      type: "select",
      width: 150,
      options: roles,
    },
    { id: "email", ordinalNo: 5, title: "Email", type: "email", width: 400 },
  ],
  data: Array.from({ length: 500000 }, (_, i) => {
    const name = names[i % names.length] + (i + 1);
    const age = 20 + (i % 30); 
    const active = i % 2 === 0; 
    const role = roles[i % roles.length];
    const email = `${name.toLowerCase()}@example.com`;
    return { // row
      id: (i + 1).toString(),
      name,
      age,
      active,
      role,
      email,
    };
  }),
};
