import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBillInfo } from '../api/billInfoApi';

export const getBillInfo = createAsyncThunk('/legislation', async () => {
  console.log('kkk')
  const billInfo = await fetchBillInfo();

  return billInfo;
});
