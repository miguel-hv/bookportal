export async function fetchUsers() {
  // const res = await fetch('/api/users', {
  //   method: 'GET',
  //   headers: { 'Content-Type': 'application/json' },
  // });

  // if (!res.ok) {
  //   throw new Error(`Failed to fetch users: ${res.statusText}`);
  // }

  // return res.json();
  return [
    {
      id: 1,
      name: 'miguel',
      role: 'admin'
    }
  ]
}
