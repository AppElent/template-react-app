import PropTypes from 'prop-types';
import { Button, Stack, Typography } from '@mui/material';

export const ItemEditContainer = (props) => {
  const { onCancel, onSave, children } = props;

  return (
    <Stack spacing={6}>
      <Stack spacing={3}>
        <Typography variant="h6">Details</Typography>
        {/* <Stack spacing={3}>
          <TextField disabled fullWidth label="ID" name="id" value={item.id} />
          <TextField
            disabled
            fullWidth
            label="Number"
            name="number"
            value={item.number}
          />
          <TextField
            disabled
            fullWidth
            label="Customer name"
            name="customer_name"
            value={item.customer.name}
          />
          <TextField
            disabled
            fullWidth
            label="Date"
            name="date"
            value={createdAt}
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={item.customer.address1}
          />
          <TextField
            fullWidth
            label="Country"
            name="country"
            value={item.customer.country}
          />
          <TextField
            fullWidth
            label="State/Region"
            name="state_region"
            value={item.customer.city}
          />
          <TextField
            fullWidth
            label="Total Amount"
            name="amount"
            value={item.totalAmount}
          />
          <TextField
            fullWidth
            label="Status"
            name="status"
            select
            SelectProps={{ native: true }}
            value={item.status}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Stack> */}
        {children}
        <Stack
          alignItems="center"
          direction="row"
          flexWrap="wrap"
          spacing={2}
        >
          <Button
            color="primary"
            onClick={onSave}
            size="small"
            variant="contained"
          >
            Save changes
          </Button>
          <Button
            color="inherit"
            onClick={onCancel}
            size="small"
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

ItemEditContainer.propTypes = {
  children: PropTypes.any,
  item: PropTypes.object,
  onCancel: PropTypes.func,
  onSave: PropTypes.func, // @ts-ignore
};
