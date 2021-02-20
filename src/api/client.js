import axios from "axios";

export async function getItems() {
  let data;
  try {
    const response = await axios.get("https://localhost:5001/item", {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("login")).store,
      },
    });
    data = response;
    if (response.status) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
}
