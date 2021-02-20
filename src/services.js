// getSoldiers = async () => {
//     await axios
//       .get("https://localhost:5001/soldier", {
//         headers: {
//           Authorization: this.state.token,
//         },
//       })
//       .then((response) => {
//         this.setState({
//           soldiers: response.data,
//         });
//       });
//   };

//   getItems = async () => {
//     await axios
//       .get("https://localhost:5001/item", {
//         headers: {
//           Authorization: this.state.token,
//         },
//       })
//       .then((response) => {
//         this.setState({
//           items: response.data,
//         });
//       });
//   };

//   getRoomItems = async (roomId) => {
//     // const { roomItems, selectedRoomId } = this.state;
//     await axios
//       .get("https://localhost:5001/room/" + parseInt(roomId), {
//         headers: {
//           Authorization: this.state.token,
//         },
//       })
//       .then((response) => {
//         this.setState({
//           selectedRoomData: {
//             roomItems: response.data.items,
//             roomSoldiers: response.data.soldiers,
//             roomId: roomId,
//           },
//         });
//       });
//   };


//   addItem = async (newItemData) => {
//     const { items } = this.state;
//     let params2 = {
//       itemName: newItemData.itemName,
//       idRoom: parseInt(newItemData.idRoom),
//     };

//     axios
//       .post("https://localhost:5001/item", params2, {
//         headers: {
//           Authorization: this.state.token,
//         },
//       })
//       .then((_) => {
//         this.getItems();
//         this.setState({
//           newItemModal: false,
//           items,
//           newItemData: {
//             id: "",
//             idRoom: "",
//             itemName: "",
//           },
//           addedData: {
//             id: "",
//             idRoom: newItemData.idRoom,
//             itemName: newItemData.itemName,
//           },
//           alertVisibility: true,
//           addedItem: true,
//         });
//       });
//   };

//   addSoldier = async ( newSoldierData ) => {
//     const { soldiers } = this.state;
//     let params2 = {
//       idSoldier: newSoldierData.idSoldier,
//       name: newSoldierData.name,
//       lastName: newSoldierData.lastName,
//       rank: newSoldierData.rank,
//       idRoom: parseInt(newSoldierData.idRoom),
//     };

//     axios
//       .post("https://localhost:5001/soldier", params2, {
//         headers: {
//           Authorization: this.state.token,
//         },
//       })
//       .then((_) => {
//         this.getSoldiers();
//         this.setState({
//           newSoldiersModal: false,
//           soldiers,
//           newSoldierData: {
//             name: newSoldierData.name,
//             lastName: newSoldierData.lastName,
//             rank: newSoldierData.rank,
//             idRoom: parseInt(newSoldierData.idRoom),
//           },
//           // addedSoldierData: {
//           //   id: "",
//           //   idRoom: newSoldierData.idRoom,
//           //   itemName: newSoldierData.itemName,
//           // },
//           // alertSoldierVisibility: true,
//           // addedSoldier: true,
//         });
//       });
//   };


//   editItem = async (editItemData) => {
//     const {  items } = this.state;
//     await this.setState({
//         editItemModal: false,
//         items,
//         editItemData: {
//           id: "",
//           idRoom: "",
//           itemName: "",
//         },
//       });
//   };

//   editSoldier = async(editSoldierData) => {
//   //  const { editSoldierData, soldiers } = this.state;

//   let params2 = {
//    // idSoldier: editSoldierData.idSoldier,
//    // name: editSoldierData.name,
//     lastName: editSoldierData.lastName,
//     rank: editSoldierData.rank,
//     idRoom: parseInt( editSoldierData.idRoom) ,
//   };

//   await axios.put("https://localhost:5001/soldier", params2, {
//     headers: {
//       Authorization: this.state.token,
//     },
//   })
//   .then((_) => {
//     this.setState({
//       editSoldierModal: false,
//       editSoldierData: {
//         idSoldier: "",
//         name: "",
//         lastName: "",
//         rank: "",
//         idRoom: "",
//       },
//     });
//     this.getSoldiers();
//   });
//   };

//   deleteItem = async (id) => {
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