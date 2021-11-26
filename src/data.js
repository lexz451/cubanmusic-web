const API_URL = 'http://localhost:8080/api/v1/public';

export async function fetchList(path) {
  const res = await fetch(API_URL + path, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!res.ok) {
    const error = new Error(res.statusText);
    error.json = await res.json();
    throw error;
  }
  return await res.json();
}

export async function fetchById(path, id) {
  const res = await fetch(API_URL + path + '/' + id, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!res.ok) {
    const error = new Error(res.statusText);
    error.json = await res.json();
    throw error;
  }
  return await res.json();
}
