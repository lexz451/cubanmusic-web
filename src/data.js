const API_URL = "http://localhost:8080/api/v1/public";

export async function fetchArtists() {
  const res = await fetch(API_URL + "/artists", {
        method: "get",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        const error = new Error(res.statusText);
        error.json = res.json();
        throw error;
    }
    return await res.json();
}
