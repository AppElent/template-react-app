import PropTypes from 'prop-types';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { usePopover } from 'src/hooks/use-popover';

import { TenantPopover } from './tenant-popover';
import { siteSettings } from 'src/config';

const tenants = ['Test', 'Live'];

export const TenantSwitch = (props) => {
  const popover = usePopover();
  let tenant = 'Live';
  switch (window.location.hostname) {
    case siteSettings.url:
      tenant = 'Live';
      break;
    case siteSettings.stagingUrl:
      tenant = 'Test';
      break;
  }

  const handleTenantSwitch = (tenant) => {
    console.log(tenant, siteSettings);
    if (siteSettings.url && tenant === 'Live') {
      window.location = 'https://' + siteSettings.url;
    } else if (siteSettings.stagingUrl && tenant === 'Test') {
      window.location = 'https://' + siteSettings.stagingUrl;
    }
    popover.handleClose();
  };

  return (
    <>
      <Stack
        alignItems="center"
        direction="row"
        spacing={2}
        {...props}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            color="inherit"
            variant="h6"
          >
            {siteSettings.title || 'AppElent'}
          </Typography>
          <Typography
            color="neutral.400"
            variant="body2"
          >
            {tenant}
          </Typography>
        </Box>
        <IconButton
          onClick={popover.handleOpen}
          ref={popover.anchorRef}
        >
          <SvgIcon sx={{ fontSize: 16 }}>
            <ChevronDownIcon />
          </SvgIcon>
        </IconButton>
      </Stack>
      <TenantPopover
        anchorEl={popover.anchorRef.current}
        onChange={handleTenantSwitch}
        onClose={popover.handleClose}
        open={popover.open}
        tenants={tenants}
      />
    </>
  );
};

TenantSwitch.propTypes = {
  sx: PropTypes.object,
};
