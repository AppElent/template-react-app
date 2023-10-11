import { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import {
  Box,
  Divider,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  TextField,
} from '@mui/material';
import { useUpdateEffect } from 'src/hooks/use-update-effect';
import { useFormik } from 'formik';

export const ItemListSearch = (props) => {
  const {
    onFiltersChange,
    onSortChange,
    //sortBy = 'createdAt',
    sortDir = 'asc',
    tabOptions,
    sortOptions,
    directQuery = false,
  } = props;
  const queryRef = useRef(null);
  const [currentTab, setCurrentTab] = useState('all');
  const [filters, setFilters] = useState(undefined);
  const formik = useFormik({ initialValues: { search: '' } });

  // Effect for triggering filter change on every value change
  useEffect(() => {
    if (directQuery) {
      setFilters((prevState) => ({
        ...prevState,
        search: formik.values.search,
      }));
    }
  }, [formik.values, directQuery]);

  const handleFiltersUpdate = useCallback(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

  useUpdateEffect(() => {
    handleFiltersUpdate();
  }, [filters, handleFiltersUpdate]);

  const handleTabsChange = useCallback((event, tab) => {
    setCurrentTab(tab);

    setFilters((prevState) => ({
      ...prevState,
      tab,
    }));
  }, []);

  const handleQueryChange = useCallback(
    (event) => {
      if (!directQuery) {
        event.preventDefault();
        const query = queryRef.current?.value || '';
        setFilters((prevState) => ({
          ...prevState,
          search: query,
        }));
      }
    },
    [directQuery]
  );

  const handleSortChange = useCallback(
    (event) => {
      const sortDir = event.target.value;
      onSortChange?.(sortDir);
    },
    [onSortChange]
  );

  return (
    <div>
      {tabOptions && (
        <>
          <Tabs
            indicatorColor="primary"
            onChange={handleTabsChange}
            scrollButtons="auto"
            sx={{ px: 3 }}
            textColor="primary"
            value={currentTab}
            variant="scrollable"
          >
            {tabOptions.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
          <Divider />
        </>
      )}
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        gap={3}
        sx={{ p: 3 }}
      >
        <Box
          component="form"
          onSubmit={handleQueryChange}
          sx={{ flexGrow: 1 }}
        >
          <OutlinedInput
            fullWidth
            inputProps={{ ref: queryRef }}
            name="search"
            placeholder="Search"
            onChange={formik.handleChange}
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            }
            value={formik.values.search}
          />
        </Box>
        {sortOptions && sortOptions.length > 0 && (
          <TextField
            label="Sort By"
            name="sort"
            onChange={handleSortChange}
            select
            SelectProps={{ native: true }}
            value={sortDir}
          >
            {sortOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </TextField>
        )}
      </Stack>
    </div>
  );
};

ItemListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
  onSortChange: PropTypes.func,
  sortBy: PropTypes.string,
  sortDir: PropTypes.oneOf(['asc', 'desc']),
  tabOptions: PropTypes.array,
  sortOptions: PropTypes.array,
  directQuery: PropTypes.bool,
};
