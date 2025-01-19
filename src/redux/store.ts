import { configureStore } from '@reduxjs/toolkit';
import chartDataReducer from './slices/chartDataSlice';

const store = configureStore({
  reducer: {
    chartData: chartDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;