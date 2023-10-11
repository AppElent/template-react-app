import PropTypes from 'prop-types';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import { Button, Stack, SvgIcon, Typography } from '@mui/material';

export const ItemDetailsContainer = (props) => {
  const { onEdit, children } = props;

  // const align = lgUp ? "horizontal" : "vertical";
  // const items = item.items || [];
  // const createdAt = format(item.createdAt, "dd/MM/yyyy HH:mm");
  // const statusColor = statusMap[item.status];
  // const totalAmount = numeral(item.totalAmount).format(
  //   `${item.currency}0,0.00`
  // );

  return (
    <Stack spacing={6}>
      <Stack spacing={3}>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Typography variant="h6">Details</Typography>
          {onEdit && (
            <Button
              color="inherit"
              onClick={onEdit}
              size="small"
              startIcon={
                <SvgIcon>
                  <Edit02Icon />
                </SvgIcon>
              }
            >
              Edit
            </Button>
          )}
        </Stack>
        {/* <PropertyList>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="ID"
            value={item.id}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Number"
            value={item.number}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Customer"
          >
            <Typography color="text.secondary" variant="body2">
              {item.customer.name}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {item.customer.address1}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {item.customer.city}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {item.customer.country}
            </Typography>
          </PropertyListItem>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Date"
            value={createdAt}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Promotion Code"
            value={item.promotionCode}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Total Amount"
            value={totalAmount}
          />
          <PropertyListItem align={align} disableGutters divider label="Status">
            <SeverityPill color={statusColor}>{item.status}</SeverityPill>
          </PropertyListItem>
        </PropertyList> */}
        {/* <Stack
          alignItems="center"
          direction="row"
          flexWrap="wrap"
          justifyContent="flex-end"
          spacing={2}
        >
          <Button onClick={onApprove} size="small" variant="contained">
            Approve
          </Button>
          <Button
            color="error"
            onClick={onReject}
            size="small"
            variant="outlined"
          >
            Reject
          </Button>
        </Stack> */}
      </Stack>
      {/* <Stack spacing={3}>
        <Typography variant="h6">Line items</Typography>
        <Scrollbar>
          <Table sx={{ minWidth: 400 }}>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Billing Cycle</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => {
                const unitAmount = numeral(item.unitAmount).format(
                  `${item.currency}0,0.00`
                );

                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.name} x {item.quantity}
                    </TableCell>
                    <TableCell>{item.billingCycle}</TableCell>
                    <TableCell>{unitAmount}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Scrollbar>
      </Stack> */}
      {children}
    </Stack>
  );
};

ItemDetailsContainer.propTypes = {
  children: PropTypes.any,
  item: PropTypes.object,
  onApprove: PropTypes.func,
  onEdit: PropTypes.func,
  onReject: PropTypes.func, // @ts-ignore
};
