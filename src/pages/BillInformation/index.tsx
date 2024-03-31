import { Box, Stack, Tab, Tabs } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { usePagination } from "../../hooks/usePagination";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { getBillInfo } from "../../redux/actions/billInfoActions";
import ReactTable from "../../components/Table";
import { tableColumn } from "./constants";
import PageLoader from "../../components/PageLoader";
import Select from "../../components/Select";
import {
  BillInfo,
  filterBillInfo,
  toggleFavorite,
} from "../../redux/reducers/billInfoReducer";
import BillModal from "../../components/BillModal";

const getFilterOptions = (data: BillInfo[]) => {
  const filters = new Set<string>(["All"]);
  data.forEach((info) => {
    filters.add(info.status);
  });

  const filterArray = Array.from(filters);

  return filterArray.map((value) => {
    return { value, label: value };
  });
};

const BillInformation = () => {
  const dispatch = useAppDispatch();
  const [selectedBill, setSelectedBill] = useState<any>(null);
  const [filterValue, setFilterValue] = useState("");
  const [currentTab, setCurrentTab] = useState<number>(0);
  const isMount = useRef(false);

  const {
    pageNumber,
    setPaginationIndex,
    paginationIndex,
    pageSize,
    changePageNumber,
  } = usePagination();

  const { loading, error, billInfo, filteredBillInfo } = useSelector(
    (state: RootState) => state.billInfo
  );

  const allFavoritedBills = filteredBillInfo.filter(
    (bill: BillInfo) => bill.favorite
  );

  const setPaginationValue = (page: number) => {
    const stIdx = 0 + pageSize * (page - 1);
    const edIdx = stIdx + (pageSize - 1);

    setPaginationIndex({ start: stIdx, end: edIdx });
  };

  useEffect(() => {
    if (!isMount.current) {
      isMount.current = true;
      dispatch(getBillInfo());
    }
  }, [dispatch]);

  const handleFavoriteToggle = (id: string) => {
    dispatch(toggleFavorite(id)); // Dispatch action to toggle favorite status
    console.log(`Request to favorite bill ${id} dispatched to the server.`);
  };

  return (
    <Stack spacing={4} px="30px" py="40px">
      <Tabs
        value={currentTab}
        onChange={(_event, newValue) => setCurrentTab(newValue)}
      >
        <Tab label="All Bills" />
        <Tab label="Favorited Bills" />
      </Tabs>

      {currentTab === 0 && (
        <Box>
          <Select
            label="Filter bill status"
            value={filterValue}
            options={getFilterOptions(billInfo)}
            onChange={(value) => {
              changePageNumber(1);
              setPaginationValue(1);
              setFilterValue(value);
              dispatch(filterBillInfo(value));
            }}
            sx={{ height: "50px", width: "400px", marginBottom: "40px" }}
          />

          <PageLoader isLoading={loading} error={error ?? ""}>
            <ReactTable
              data={filteredBillInfo.slice(
                paginationIndex.start,
                paginationIndex.end
              )}
              columns={tableColumn}
              pageNumber={pageNumber}
              rowClick={(data) => {
                const bill = billInfo?.find(
                  (bill) => bill?.billNo === data?.billNo
                );
                bill && setSelectedBill(bill);
              }}
              onPageChange={(page) => {
                changePageNumber(page);
                setPaginationValue(page);
              }}
              handleFavoriteToggle={handleFavoriteToggle}
              totalRows={filteredBillInfo.length}
            />
          </PageLoader>
        </Box>
      )}

      {currentTab === 1 && (
        <PageLoader isLoading={loading} error={error ?? ""}>
          <ReactTable
            data={allFavoritedBills.slice(
              paginationIndex.start,
              paginationIndex.end
            )}
            columns={tableColumn}
            pageNumber={pageNumber}
            onPageChange={(page) => {
              changePageNumber(page);
              setPaginationValue(page);
            }}
            totalRows={allFavoritedBills.length}
            noFoundTitle="No favorited bills found"
          />
        </PageLoader>
      )}

      {selectedBill && (
        <BillModal bill={selectedBill} onClose={() => setSelectedBill(null)} />
      )}
    </Stack>
  );
};

export default BillInformation;
