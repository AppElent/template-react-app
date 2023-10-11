import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import {
  Box,
  Button,
  Divider,
  Stack,
  SvgIcon,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import numeral from 'numeral';
import { useFormik } from 'formik';
import { ordersApi } from 'src/api/orders';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { ItemDrawer } from 'src/components/app/list/item-drawer';
import { ItemListContainer } from 'src/components/app/list/item-list-container';
import { ItemListSearch } from 'src/components/app/list/item-list-search';
import { ItemListTableContainer } from 'src/components/app/list/item-list-table';
import { ItemDetailsContainer } from 'src/components/app/list/item-drawer/item-details';
import { ItemEditContainer } from 'src/components/app/list/item-drawer/item-edit';
import { SeverityPill } from 'src/components/severity-pill';

const statusMap = {
  complete: 'success',
  pending: 'info',
  canceled: 'warning',
  rejected: 'error',
};

const useSearch = () => {
  const [search, setSearch] = useState({
    filters: {
      query: undefined,
      status: undefined,
    },
    page: 0,
    rowsPerPage: 5,
    sortBy: 'createdAt',
    sortDir: 'desc',
  });

  return {
    search,
    updateSearch: setSearch,
  };
};

const useItems = (search, queryFn) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    items: [],
    itemsCount: 0,
  });

  const getItems = useCallback(async () => {
    try {
      const response = await queryFn(search);

      if (isMounted()) {
        setState({
          items: response.data,
          itemsCount: response.count,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [search, isMounted]);

  useEffect(
    () => {
      getItems();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search]
  );

  return state;
};

const tabOptions = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Canceled',
    value: 'canceled',
  },
  {
    label: 'Completed',
    value: 'complete',
  },
  {
    label: 'Pending',
    value: 'pending',
  },
  {
    label: 'Rejected',
    value: 'rejected',
  },
];

const sortOptions = [
  {
    label: 'Newest',
    value: 'desc',
  },
  {
    label: 'Oldest',
    value: 'asc',
  },
];

const Page = () => {
  const rootRef = useRef(null);
  const { search, updateSearch } = useSearch();

  const { items, itemsCount } = useItems(search, ordersApi.getOrders);
  const [drawer, setDrawer] = useState({
    isOpen: false,
    data: undefined,
  });
  const currentItem = useMemo(() => {
    if (!drawer.data) {
      return undefined;
    }

    return items.find((item) => item.id === drawer.data);
  }, [drawer, items]);

  const formik = useFormik({
    initialValues: currentItem,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  usePageView();

  const [isEditing, setIsEditing] = useState(false);

  const handleEditOpen = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleEditCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleFiltersChange = useCallback(
    (filters) => {
      updateSearch((prevState) => ({
        ...prevState,
        filters,
      }));
    },
    [updateSearch]
  );

  const handleSortChange = useCallback(
    (sortDir) => {
      updateSearch((prevState) => ({
        ...prevState,
        sortDir,
      }));
    },
    [updateSearch]
  );

  const handlePageChange = useCallback(
    (event, page) => {
      updateSearch((prevState) => ({
        ...prevState,
        page,
      }));
    },
    [updateSearch]
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      updateSearch((prevState) => ({
        ...prevState,
        rowsPerPage: parseInt(event.target.value, 10),
      }));
    },
    [updateSearch]
  );

  const handleItemOpen = useCallback(
    (orderId) => {
      // Close drawer if is the same order

      if (drawer.isOpen && drawer.data === orderId) {
        setDrawer({
          isOpen: false,
          data: undefined,
        });
        return;
      }

      setDrawer({
        isOpen: true,
        data: orderId,
      });
    },
    [drawer]
  );

  const handleItemClose = useCallback(() => {
    setDrawer({
      isOpen: false,
      data: undefined,
    });
  }, []);

  return (
    <>
      <Divider />
      <Box
        component="main"
        ref={rootRef}
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box
          ref={rootRef}
          sx={{
            bottom: 0,
            display: 'flex',
            left: 0,
            position: 'absolute',
            right: 0,
            top: 0,
          }}
        >
          <ItemListContainer open={drawer.isOpen}>
            <Box sx={{ p: 3 }}>
              <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <div>
                  <Typography variant="h4">Items</Typography>
                </div>
                <div>
                  <Button
                    startIcon={
                      <SvgIcon>
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    Add
                  </Button>
                </div>
              </Stack>
            </Box>
            <Divider />
            <ItemListSearch
              onFiltersChange={handleFiltersChange}
              onSortChange={handleSortChange}
              sortBy={search.sortBy}
              sortDir={search.sortDir}
              tabOptions={tabOptions}
              sortOptions={sortOptions}
              directQuery={true}
            />
            <Divider />
            <ItemListTableContainer
              onItemSelect={handleItemOpen}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              items={items}
              itemsCount={itemsCount}
              page={search.page}
              rowsPerPage={search.rowsPerPage}
            >
              {items.map((item) => {
                const createdAtMonth = format(item.createdAt, 'LLL').toUpperCase();
                const createdAtDay = format(item.createdAt, 'd');
                const totalAmount = numeral(item.totalAmount).format(`${item.currency}0,0.00`);
                const statusColor = statusMap[item.status] || 'warning';

                return (
                  <TableRow
                    hover
                    key={item.id}
                    onClick={() => handleItemOpen?.(item.id)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.200',
                          bitemRadius: 2,
                          maxWidth: 'fit-content',
                          ml: 3,
                          p: 1,
                        }}
                      >
                        <Typography
                          align="center"
                          variant="subtitle2"
                        >
                          {createdAtMonth}
                        </Typography>
                        <Typography
                          align="center"
                          variant="h6"
                        >
                          {createdAtDay}
                        </Typography>
                      </Box>
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="subtitle2">{item.number}</Typography>
                        <Typography
                          color="text.secondary"
                          variant="body2"
                        >
                          Total of {totalAmount}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <SeverityPill color={statusColor}>{item.status}</SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </ItemListTableContainer>
          </ItemListContainer>
          <ItemDrawer
            container={rootRef.current}
            onClose={handleItemClose}
            open={drawer.isOpen}
            item={currentItem}
            title={currentItem?.number}
          >
            {!isEditing ? (
              <ItemDetailsContainer onEdit={handleEditOpen}>Content details</ItemDetailsContainer>
            ) : (
              <ItemEditContainer
                onCancel={handleEditCancel}
                onSave={formik.handleSubmit}
                item={currentItem}
              >
                Content edit
              </ItemEditContainer>
            )}
          </ItemDrawer>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
