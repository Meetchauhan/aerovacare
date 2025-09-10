import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { videoApi, DEFAULT_PAGINATION } from '../services/videoApi';

// Async thunk for uploading a video
export const uploadVideoAsync = createAsyncThunk(
  'video/uploadVideo',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await videoApi.uploadVideo(formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for getting videos list
export const getVideosAsync = createAsyncThunk(
  'video/getVideos',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await videoApi.getVideos(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for deleting a video
export const deleteVideoAsync = createAsyncThunk(
  'video/deleteVideo',
  async (videoId, { rejectWithValue }) => {
    try {
      const response = await videoApi.deleteVideo(videoId);
      return { videoId, response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for getting video by ID
export const getVideoByIdAsync = createAsyncThunk(
  'video/getVideoById',
  async (videoId, { rejectWithValue }) => {
    try {
      const response = await videoApi.getVideoById(videoId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating a video
export const updateVideoAsync = createAsyncThunk(
  'video/updateVideo',
  async ({ videoId, updateData }, { rejectWithValue }) => {
    try {
      const response = await videoApi.updateVideo(videoId, updateData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  videos: [],
  currentVideo: null,
  loading: false,
  uploadLoading: false,
  error: null,
  pagination: {
    currentPage: DEFAULT_PAGINATION.page,
    totalPages: 1,
    totalVideos: 0,
    limit: DEFAULT_PAGINATION.limit,
  },
  filters: {
    category: '',
    search: '',
  },
  uploadProgress: 0,
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentVideo: (state) => {
      state.currentVideo = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
    resetUploadState: (state) => {
      state.uploadLoading = false;
      state.uploadProgress = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Upload Video
      .addCase(uploadVideoAsync.pending, (state) => {
        state.uploadLoading = true;
        state.uploadProgress = 0;
        state.error = null;
      })
      .addCase(uploadVideoAsync.fulfilled, (state, action) => {
        state.uploadLoading = false;
        state.uploadProgress = 100;
        state.error = null;
        // Add the new video to the beginning of the list
        if (action.payload.data && action.payload.data.video) {
          state.videos.unshift(action.payload.data.video);
          state.pagination.totalVideos += 1;
        }
      })
      .addCase(uploadVideoAsync.rejected, (state, action) => {
        state.uploadLoading = false;
        state.uploadProgress = 0;
        state.error = action.payload;
      })

      // Get Videos
      .addCase(getVideosAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVideosAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        
        if (action.payload.data) {
          state.videos = action.payload.data.videos || [];
          state.pagination = {
            currentPage: action.payload.data.pagination?.currentPage || 1,
            totalPages: action.payload.data.pagination?.totalPages || 1,
            totalVideos: action.payload.data.pagination?.totalVideos || 0,
            limit: action.payload.data.pagination?.limit || DEFAULT_PAGINATION.limit,
          };
        }
      })
      .addCase(getVideosAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Video
      .addCase(deleteVideoAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVideoAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Remove the deleted video from the list
        state.videos = state.videos.filter(video => video._id !== action.payload.videoId);
        state.pagination.totalVideos = Math.max(0, state.pagination.totalVideos - 1);
      })
      .addCase(deleteVideoAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Video by ID
      .addCase(getVideoByIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVideoByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.currentVideo = action.payload.data?.video || null;
      })
      .addCase(getVideoByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Video
      .addCase(updateVideoAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVideoAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        
        if (action.payload.data && action.payload.data.video) {
          const updatedVideo = action.payload.data.video;
          // Update the video in the list
          const index = state.videos.findIndex(video => video._id === updatedVideo._id);
          if (index !== -1) {
            state.videos[index] = updatedVideo;
          }
          // Update current video if it's the same
          if (state.currentVideo && state.currentVideo._id === updatedVideo._id) {
            state.currentVideo = updatedVideo;
          }
        }
      })
      .addCase(updateVideoAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearCurrentVideo,
  setFilters,
  setPagination,
  setUploadProgress,
  resetUploadState,
} = videoSlice.actions;

export default videoSlice.reducer;
