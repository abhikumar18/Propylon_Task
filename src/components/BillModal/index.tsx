// components/BillModal.tsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Box,
  Button,
  DialogActions,
} from "@mui/material";
import { BillInfo } from "../../redux/reducers/billInfoReducer";

interface BillModalProps {
  bill: BillInfo;
  onClose: () => void;
}

const BillModal: React.FC<BillModalProps> = ({ bill, onClose }) => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Bill Number: {bill.billNo}</DialogTitle>
      <DialogContent>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="English" />
          <Tab label="Gaeilge" />
        </Tabs>
        <Box p={3}>
          {tabValue === 0 && (
            <Box dangerouslySetInnerHTML={{ __html: bill.longTitleEn }} />
          )}
          {tabValue === 1 && (
            <Box dangerouslySetInnerHTML={{ __html: bill.longTitleGa }} />
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BillModal;
