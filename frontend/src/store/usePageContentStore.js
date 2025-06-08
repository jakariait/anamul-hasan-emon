// store/usePageContentStore.js
import { create } from 'zustand';
import axios from 'axios';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

const usePageContentStore = create((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchPageContent: async () => {
    try {
      set({ loading: true, error: null });

      const response = await axios.get(`${apiURL}/pagecontent`);
      set({ data: response.data, loading: false });
    } catch (err) {
      set({ error: err.message || 'Failed to fetch', loading: false });
    }
  },
}));

export default usePageContentStore;
