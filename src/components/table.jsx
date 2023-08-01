import { styled } from "@mui/system";
import {
  Button,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
  TableCell,
  TableRow,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    backgroundColor: "#007A3D",
    color: theme.palette.common.white,
  },
  "&.MuiTableCell-body": {
    fontSize: 14,
  },
  padding: "5px 6px",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#F3F3F3",
  },
  "&:hover": {
    backgroundColor: "#B5FF7D",
  },
}));

const AddButton = styled(Button)({
  backgroundColor: "#007A3D",
  "&:hover": {
    backgroundColor: "#7DB900",
  },
  boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .8)",
});

const DeleteButton = styled(Button)({
  backgroundColor: "#ff0000",
  "&:hover": {
    backgroundColor: "#6f0000",
  },
  boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .8)",
});

const UpdateButton = styled(Button)({
  backgroundColor: "primary",
  "&:hover": {
    backgroundColor: "	#010048",
  },
  boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .8)",
});

const AtmTable = ({
  handleOpenAdd,
  atmData,
  deleteAtm,
  handleOpenUpdate,
  // hoveredAtmId,
  setHoveredAtmId,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>ATM Name</StyledTableCell>
            <StyledTableCell>Latitude</StyledTableCell>
            <StyledTableCell>Longitude</StyledTableCell>
            <StyledTableCell>City Name</StyledTableCell>
            <StyledTableCell>District Name</StyledTableCell>
            <StyledTableCell colSpan={6}>
              <AddButton variant="contained" onClick={handleOpenAdd}>
                Add ATM
              </AddButton>
            </StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {atmData.map((item, index) => (
            <StyledTableRow
              key={index}
              onMouseEnter={() => setHoveredAtmId(item.id)}
              onMouseLeave={() => setHoveredAtmId(null)}
            >
              <StyledTableCell>{item.atmName}</StyledTableCell>
              <StyledTableCell>{item.latitude}</StyledTableCell>
              <StyledTableCell>{item.longitude}</StyledTableCell>
              <StyledTableCell>{item.cityName}</StyledTableCell>
              <StyledTableCell>{item.districtName}</StyledTableCell>
              <StyledTableCell>
                <DeleteButton
                  variant="contained"
                  onClick={() => deleteAtm(item.id)}
                >
                  Delete
                </DeleteButton>
              </StyledTableCell>
              <StyledTableCell>
                <UpdateButton
                  variant="contained"
                  onClick={() => handleOpenUpdate(item)}
                >
                  Update
                </UpdateButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default AtmTable;
