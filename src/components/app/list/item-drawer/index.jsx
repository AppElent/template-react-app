import PropTypes from 'prop-types';
import XIcon from '@untitled-ui/icons-react/build/esm/X';
import { Box, Drawer, IconButton, Stack, SvgIcon, Typography, useMediaQuery } from '@mui/material';
// import { ItemDetailsContainer } from "./item-details";
// import { ItemEditContainer } from "./item-edit";

export const ItemDrawer = (props) => {
  const { container, onClose, open, item, children, title } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  // const handleEditOpen = useCallback(() => {
  //   setIsEditing(true);
  // }, []);

  // const handleEditCancel = useCallback(() => {
  //   setIsEditing(false);
  // }, []);

  let content = null;

  if (item) {
    content = (
      <div>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          sx={{
            px: 3,
            py: 2,
          }}
        >
          <Typography
            color="inherit"
            variant="h6"
          >
            {title}
          </Typography>
          <IconButton
            color="inherit"
            onClick={onClose}
          >
            <SvgIcon>
              <XIcon />
            </SvgIcon>
          </IconButton>
        </Stack>
        <Box
          sx={{
            px: 3,
            py: 4,
          }}
        >
          {/* {!isEditing ? (
            <ItemDetailsContainer
              onApprove={onClose}
              onEdit={handleEditOpen}
              onReject={onClose}
              item={item}
            >
              Content details
            </ItemDetailsContainer>
          ) : (
            <ItemEditContainer
              onCancel={handleEditCancel}
              onSave={handleEditCancel}
              item={item}
            >
              Content edit
            </ItemEditContainer>
          )} */}
          {children}
        </Box>
      </div>
    );
  }

  if (lgUp) {
    return (
      <Drawer
        anchor="right"
        open={open}
        PaperProps={{
          sx: {
            position: 'relative',
            width: 750,
          },
        }}
        SlideProps={{ container }}
        variant="persistent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      hideBackdrop
      ModalProps={{
        container,
        sx: {
          pointerEvents: 'none',
          position: 'absolute',
        },
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          maxWidth: '100%',
          width: 400,
          pointerEvents: 'auto',
          position: 'absolute',
        },
      }}
      SlideProps={{ container }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

ItemDrawer.propTypes = {
  children: PropTypes.any,
  container: PropTypes.any,
  item: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool, // @ts-ignore
  title: PropTypes.any,
};
