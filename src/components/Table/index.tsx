import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Stack,
  IconButton,
  Box,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import React from "react";

interface TableProps<T> {
  columns: { key: string; header: string }[];
  data: T[];
  handleFavoriteToggle?: (id: string) => void;
  rowClick?: (rowData: T) => void;
  pageNumber?: number;
  totalRows?: number;
  onPageChange?: (page: number) => void;
  noFoundTitle?: string;
}

const ReactTable: React.FC<TableProps<any>> = ({
  columns,
  data,
  rowClick,
  totalRows,
  onPageChange,
  handleFavoriteToggle,
  pageNumber,
  noFoundTitle,
}) => {
  const numberOfPages = totalRows ? Math.floor(totalRows / 10) : 0;

  if (!data || !data?.length) {
    return <Box>{noFoundTitle || "No data found"}</Box>;
  }

  return (
    <Stack spacing={2}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.key}>{column.header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((rowData) => (
              <TableRow key={rowData.id || Math.random()}>
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    sx={{ cursor: rowClick ? "pointer" : "auto" }}
                    onClick={() => rowClick && rowClick(rowData)}
                  >
                    {rowData[column.key]}
                  </TableCell>
                ))}

                {handleFavoriteToggle && (
                  <TableCell>
                    <IconButton
                      onClick={() =>
                        handleFavoriteToggle(rowData?.billNo ?? "")
                      }
                    >
                      {rowData?.favorite ? (
                        <Favorite color="secondary" />
                      ) : (
                        <FavoriteBorder />
                      )}
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={numberOfPages}
        variant="outlined"
        shape="rounded"
        page={pageNumber}
        onChange={(_, page) => {
          if (onPageChange) {
            onPageChange(page);
          }
        }}
      />
    </Stack>
  );
};

export default ReactTable;
