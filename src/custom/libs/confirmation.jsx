import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useCallback, createContext, useContext } from 'react';

const DEFAULT_OPTIONS = {
  title: 'Are you sure?',
  description: '',
  content: null,
  confirmationText: 'Ok',
  cancellationText: 'Cancel',
  dialogProps: {},
  confirmationButtonProps: {},
  cancellationButtonProps: {},
};

export const ConfirmContext = createContext();

export const useConfirm = () => {
  const confirm = useContext(ConfirmContext);
  return confirm;
};

const buildOptions = (defaultOptions, options) => {
  const dialogProps = {
    ...(defaultOptions.dialogProps || DEFAULT_OPTIONS.dialogProps),
    ...(options.dialogProps || {}),
  };
  const confirmationButtonProps = {
    ...(defaultOptions.confirmationButtonProps || DEFAULT_OPTIONS.confirmationButtonProps),
    ...(options.confirmationButtonProps || {}),
  };
  const cancellationButtonProps = {
    ...(defaultOptions.cancellationButtonProps || DEFAULT_OPTIONS.cancellationButtonProps),
    ...(options.cancellationButtonProps || {}),
  };

  return {
    ...DEFAULT_OPTIONS,
    ...defaultOptions,
    ...options,
    dialogProps,
    confirmationButtonProps,
    cancellationButtonProps,
  };
};

export const ConfirmProvider = ({ children, defaultOptions = {} }) => {
  const [options, setOptions] = useState({
    ...DEFAULT_OPTIONS,
    ...defaultOptions,
  });

  const [open, setOpen] = useState(false);

  const confirm = useCallback(async (localOptions) => {
    setOptions(buildOptions(options, localOptions));
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, [handleClose]);

  const handleConfirm = useCallback(async () => {
    if (options?.process) {
      await options.process();
      handleClose();
    } else {
      if (options?.throw) {
        throw 'User cancelled';
      }
    }
  }, [options, handleClose]);

  return (
    <>
      <ConfirmContext.Provider value={confirm}>{children}</ConfirmContext.Provider>
      <ConfirmationDialog
        open={open}
        options={options}
        onClose={handleClose}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </>
  );
};

ConfirmProvider.propTypes = {
  children: PropTypes.any,
  defaultOptions: PropTypes.object,
};

export const ConfirmationDialog = ({ open, options, onCancel, onConfirm, onClose }) => {
  const {
    title,
    description,
    content,
    confirmationText,
    cancellationText,
    dialogProps,
    confirmationButtonProps,
    cancellationButtonProps,
  } = options || {};

  return (
    <Dialog
      fullWidth
      {...dialogProps}
      open={open}
      onClose={onClose}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      {content ? (
        <DialogContent>{content}</DialogContent>
      ) : (
        description && (
          <DialogContent>
            <DialogContentText>{description}</DialogContentText>
          </DialogContent>
        )
      )}
      <DialogActions>
        <Button
          {...cancellationButtonProps}
          onClick={onCancel}
        >
          {cancellationText}
        </Button>
        <Button
          color="primary"
          {...confirmationButtonProps}
          onClick={onConfirm}
        >
          {confirmationText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmationDialog.propTypes = {
  onCancel: PropTypes.any,
  onClose: PropTypes.any,
  onConfirm: PropTypes.any,
  open: PropTypes.any,
  options: PropTypes.object,
};
