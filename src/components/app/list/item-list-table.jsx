import PropTypes from 'prop-types';
import { Table, TableBody, TablePagination } from '@mui/material';

export const ItemListTableContainer = (props) => {
  const {
    children,
    onPageChange,
    onRowsPerPageChange,
    //items,
    itemsCount,
    page,
    rowsPerPage,
    ...other
  } = props;

  return (
    <div {...other}>
      <Table>
        <TableBody>
          {/* {items.map((item) => {
            const createdAtMonth = format(item.createdAt, "LLL").toUpperCase();
            const createdAtDay = format(item.createdAt, "d");
            const totalAmount = numeral(item.totalAmount).format(
              `${item.currency}0,0.00`
            );
            const statusColor = statusMap[item.status] || "warning";

            return (
              <TableRow
                hover
                key={item.id}
                onClick={() => onItemSelect?.(item.id)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell
                  sx={{
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === "dark"
                          ? "neutral.800"
                          : "neutral.200",
                      bitemRadius: 2,
                      maxWidth: "fit-content",
                      ml: 3,
                      p: 1,
                    }}
                  >
                    <Typography align="center" variant="subtitle2">
                      {createdAtMonth}
                    </Typography>
                    <Typography align="center" variant="h6">
                      {createdAtDay}
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="subtitle2">{item.number}</Typography>
                    <Typography color="text.secondary" variant="body2">
                      Total of {totalAmount}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <SeverityPill color={statusColor}>{item.status}</SeverityPill>
                </TableCell>
              </TableRow>
            );
          })} */}
          {children}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={itemsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

ItemListTableContainer.propTypes = {
  children: PropTypes.any,
  items: PropTypes.array.isRequired,
  itemsCount: PropTypes.number.isRequired,
  onItemSelect: PropTypes.func,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
