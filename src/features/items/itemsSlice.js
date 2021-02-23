import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'
import { useSelector, useDispatch } from "react-redux";

const initialState = {
  items: [],
  status: 'idle',
  error: null,
}

const serverURL = `https://localhost:5001`;

export const getItems = createAsyncThunk('items/getItems', async () => {
  // const response = await getItems();
  //console.log('xdd')
  const response = await client.getItems(serverURL+"/item");
  return response.data
})

export const addItem = createAsyncThunk('items/deleteItem', async (newItemData) => {
  // const response = await getItems();
  const response = await client.addItem(serverURL+"/item", newItemData);
  return response
})

export const deleteItem = createAsyncThunk('items/deleteItem', async (id) => {
  // const response = await getItems();
  await client.deleteItem(serverURL+`/item/${id}`);
  return { id:id }
})

export const editItem = createAsyncThunk('items/editItem', async (editItemData) => {
  // const response = await getItems();
  console.log(editItemData)
  const response = await client.editItem(serverURL+`/${editItemData.idRoom}/${editItemData.id}`);
  return response
})

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
    },
    extraReducers: {
      [getItems.pending]: (state, action) => {
        state.status = 'pending'
      },
      [getItems.fulfilled]: (state, action) => {
        state.status = 'fulfilled'
        state.items = action.payload
      },
      [getItems.rejected]: (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      },
      // [deleteItem.pending]: (state, action) => {
      //   state.status = 'pending'
      // },
      [deleteItem.fulfilled]: (state, action) => {
        state.status = 'fulfilled'
        const { id } = action.payload
        const item = state.items.find((item) => item.id === id)
        state.items.pop(item)
      },
      // [deleteItem.rejected]: (state, action) => {
      //   state.status = 'failed'
      //   state.error = action.payload
      // },
    },
  })
  
  // export const { } = itemsSlice.actions
  
  export default itemsSlice.reducer
  
  export const selectAllItems = (state) => {
    return state.items.items;
  }

  