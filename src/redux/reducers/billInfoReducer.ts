import { createSlice } from "@reduxjs/toolkit";
import { getBillInfo } from "../actions/billInfoActions";

export type BillInfoResponse = {
  bill: {
    sponsors: Array<{
      sponsor: { as: { showAs: string }; by: { showAs: string } };
    }>;
    billNo: string;
    billType: string;
    status: string;
    longTitleEn: string;
    longTitleGa: string;
  };
};

export type BillInfo = {
  sponsor: string;
  billNo: string;
  billType: string;
  status: string;
  longTitleEn: string;
  longTitleGa: string;
  favorite: boolean;
};

interface BillInfoState {
  billInfo: BillInfo[];
  loading: boolean;
  error: string | null;
  filteredBillInfo: BillInfo[];
}

const initialState: BillInfoState = {
  billInfo: [],
  filteredBillInfo: [],
  loading: false,
  error: null,
};

const billInfoSlice = createSlice({
  name: "billInfo",
  initialState,
  reducers: {
    filterBillInfo: (state, action) => {
      console.log("running");
      if (action.payload === "All") {
        state.filteredBillInfo = state.billInfo;
        return;
      }

      state.filteredBillInfo = state.billInfo.filter(
        (info) => info.status === action.payload
      );
    },
    toggleFavorite: (state, action) => {
      console.log("running");
      const index = state.filteredBillInfo.findIndex(
        (bill) => bill.billNo === action.payload
      );
      if (index !== -1) {
        state.filteredBillInfo[index].favorite =
          !state.filteredBillInfo[index].favorite;

        state.billInfo[index].favorite = !state.billInfo[index].favorite;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBillInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBillInfo.fulfilled, (state, action) => {
        const data = getBillInfoData(action.payload);
        state.loading = false;
        state.billInfo = data;
        state.filteredBillInfo = data;
      })
      .addCase(getBillInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch billInfo";
      });
  },
});

const getBillInfoData = (data: BillInfoResponse[]) => {
  return data.map((billInfo) => {
    const sponsors = billInfo.bill.sponsors;

    const sponsorsArr = sponsors
      .map((sponsor) => {
        return sponsor?.sponsor?.as?.showAs ?? sponsor?.sponsor?.by?.showAs;
      })
      .filter((sp) => sp);

    return {
      billNo: billInfo.bill.billNo,
      status: billInfo.bill.status,
      billType: billInfo.bill.billType,
      sponsor: sponsorsArr.join(", "),
      longTitleEn: billInfo.bill.longTitleEn,
      longTitleGa: billInfo.bill.longTitleGa,
      favorite: false,
    };
  });
};

export const { filterBillInfo, toggleFavorite } = billInfoSlice.actions;

export default billInfoSlice.reducer;
