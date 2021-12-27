import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import books from "../../fakeData/books.json";

// fetchTodoById is the "thunk action creator"
export const fetchBooks = createAsyncThunk(
  'book/fetchBooks',
  async () => {
    const response = await fetch(
      "../../fakeData/books.json"
    ).then(res => res.json())
    console.log(response.data);
    return response.data;
  }
)

export const bookSlice = createSlice({
  name: "book",
  initialState: {
    discover: books,
    readingList: [],
    finishedList: [],
  },
  reducers: {
    addToReadingList: (state, { payload }) => {
      state.readingList.push(payload);
    },
    removeFromReadingList: (state, { payload }) => {
      state.readingList = state.readingList.filter(
        (book) => book.id !== payload.id
      );
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.discover.push(action.payload);
    });
  },
});

export const { addToReadingList, removeFromReadingList } = bookSlice.actions;

export default bookSlice.reducer;