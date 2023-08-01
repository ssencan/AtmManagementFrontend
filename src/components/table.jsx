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
    backgroundColor: "#F3F3F3", // sabit bir gri renk değeri
  },
  "&:hover": {
    backgroundColor: theme.palette.primary.main, // varsayılan olarak tanımlanmış bir renk
  },
}));

const DeleteButton = styled(Button)({
  backgroundColor: "#ff0000", // kırmızı
  "&:hover": {
    backgroundColor: "#b30000", // üzerine gelindiğinde daha koyu bir kırmızı
  },
});

const UpdateButton = styled(Button)({
  backgroundColor: "#008000", // yeşil
  "&:hover": {
    backgroundColor: "#006400", // üzerine gelindiğinde daha koyu bir yeşil
  },
});

const AtmTable = ({
  handleOpenAdd,
  atmData,
  deleteAtm,
  handleOpenUpdate,
  hoveredAtmId,
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
              <Button variant="contained" onClick={handleOpenAdd}>
                Add ATM
              </Button>
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
