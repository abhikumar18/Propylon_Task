import axios from "axios";
import { BILL_INFO_API } from "../../constants";

export const fetchBillInfo = async () => {
  try {
    const response = await axios.get(`${BILL_INFO_API}/legislation`);

    return response.data.results;
  } catch (error) {
    console.error("Error fetching legislation", error);

    throw error; // Re-throw for handling in actions/reducers
  }
};
