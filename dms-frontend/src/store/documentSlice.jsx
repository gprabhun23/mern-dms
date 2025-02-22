import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to fetch documents
export const fetchDocuments = createAsyncThunk('documents/fetch', async () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const res = await axios.get(`${API_URL}/api/documents`);
  return res.data;
});

const documentSlice = createSlice({
  name: 'documents',
  initialState: { items: [], status: 'idle' },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      });
  }
});

export default documentSlice.reducer;
