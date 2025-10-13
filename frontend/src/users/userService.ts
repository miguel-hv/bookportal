import { User } from "./UserModel"

export async function fetchUsers() {
  // const res = await fetch('/api/users', {
  //   method: 'GET',
  //   headers: { 'Content-Type': 'application/json' },
  // });

  // if (!res.ok) {
  //   throw new Error(`Failed to fetch users: ${res.statusText}`);
  // }

  // return res.json();
  const user: User = {
      id: 1,
      username: 'miguel',
      role: 'ADMIN'
    }

  return [
    user
  ]
}
