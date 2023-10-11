import PropTypes from 'prop-types';
import { useMediaQuery } from '@mui/material';
import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';

export const PropertyListTemplate = ({ alignItems, items }) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const align = alignItems ? alignItems : lgUp ? 'horizontal' : 'vertical';
  return (
    <PropertyList>
      {items.map((item) => {
        return (
          <PropertyListItem
            align={align}
            disableGutters={item.disableGutters != undefined ? item.disableGutters : true}
            divider={item.divider != undefined ? item.divider : true}
            key={item.label}
            label={item.label}
          >
            {item.value}
          </PropertyListItem>
        );
      })}
    </PropertyList>
  );
};

PropertyListTemplate.propTypes = {
  alignItems: PropTypes.string,
  items: PropTypes.array.isRequired,
};
