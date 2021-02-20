import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getItems } from '../../api/client'
import { useSelector, useDispatch } from "react-redux";

const initialState = {
  items: [],
  status: 'idle',
  error: null,
}

export const getItems2 = createAsyncThunk('items/getItems2', async () => {
//   const dispatch = useDispatch();
//  // dispatch(itemsLoading());
//   this.state.status = 'pending'
  const response = await getItems();
  // dispatch(itemsReceived(response.items));
  return response.data
})


const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
      // itemsLoading(state, action) {
      //   // Use a "state machine" approach for loading state instead of booleans
      //   if(state.status === 'idle') {
      //       state.status = 'pending'
      //   } },
      //   itemsReceived(state, action) {
      //     if(state.status === 'pending') {
      //         state.status = 'fulfilled'
      //         state.items = action.payload
      //     }
      // }
   
    },
    extraReducers: {
      [getItems2.pending]: (state, action) => {
        state.status = 'pending'
      },
      [getItems2.fulfilled]: (state, action) => {
        state.status = 'fulfilled'
        // Add any fetched posts to the array
        //state.items = state.items.concat(action.payload)
        state.items = action.payload
        //console.log(state.items.items)
      },
      [getItems2.rejected]: (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      },
    },
  })
  
  // export const { pitemsLoading, itemsReceived } = itemsSlice.actions
  
  export default itemsSlice.reducer
  
  export const selectAllItems = (state) => {
    //console.log('dupaaaaaaaaaaaaaaaaa?????');
    //console.log(state.items.items);
    return state.items.items;
  }
  
//   export const selectPostById = (state, postId) =>
//     state.posts.posts.find((post) => post.id === postId)
  