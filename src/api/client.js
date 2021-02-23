import axios from "axios";

// export async function getItems() {
//   let data;
//   try {
//     const response = await axios.get("https://localhost:5001/item", {
//       headers: {
//         Authorization:
//           "Bearer " + JSON.parse(localStorage.getItem("login")).store,
//       },
//     });
//     data = response;
//     if (response.status) {
//       return data;
//     }
//     throw new Error(response.statusText);
//   } catch (err) {
//     return Promise.reject(err.message ? err.message : data);
//   }
// }


export async function client(endpoint, method, { body, ...customConfig } = {}) {
  const headers = { 'Content-Type': 'application/json',  'Authorization': "Bearer " + JSON.parse(localStorage.getItem("login")).store}

  const config = {
    method: method,
    url: endpoint,
      ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  // if (body) {
  //   config.body = JSON.stringify(body)
  // } //for fetch
  if (body) {
    config.data = body
  }//for axios

  let data
  try {
    //const response = await window.fetch(endpoint, config)
    const response = await axios(config)
    data = response
    console.log(config)
    if (response.status<=200) {
      return data
    }
    throw new Error(response.statusText)
  } catch (err) {
    return Promise.reject(err.message ? err.message : data)
  }
}

client.getItems = function (endpoint, customConfig = {}) {
  return client(endpoint, 'GET', { ...customConfig })
}

client.deleteItem = function (endpoint, customConfig = {}) {
  return client(endpoint, 'DELETE', { ...customConfig })
}

client.addItem = function (endpoint, body, customConfig = {}) {
  return client(endpoint, 'POST', { ...customConfig, body })
}

client.editItem = function (endpoint, customConfig = {}) {
  return client(endpoint, 'PUT', { ...customConfig })
}


  //     const { items } = this.state;
  //     await axios
  //       .delete(`https://localhost:5001/item/${id}`, {
  //         headers: {
  //           Authorization: this.state.token,
  //         },
  //       })
  //       .then((_) => {
  //         const dataById = items.find((item) => item.id === id);
  //         this.setState({
  //           addedData: dataById,
  //           deletedItem: true,
  //           alertVisibilityDeleted: true,
  //         });
  //         console.log(_);
  //         this.getItems();
  //       });
  //   };


client.postItem = function (endpoint, body, customConfig = {}) {
  return client(endpoint, 'POST', { ...customConfig, body })
}
