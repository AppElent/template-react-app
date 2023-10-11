import { useState } from 'react';
import PropTypes from 'prop-types';
import Camera01Icon from '@untitled-ui/icons-react/build/esm/Camera01';
import User01Icon from '@untitled-ui/icons-react/build/esm/User01';
import {
  Avatar,
  Box,
  Button,
  Stack,
  SvgIcon,
  TextField,
  Typography,
  MenuItem,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useFormik } from 'formik';

import { CardDefault } from 'src/components/app/card-default';
import { getAuth, updateProfile } from 'firebase/auth';
import { generateName } from 'src/custom/libs/random-name-generator';
import { useMounted } from 'src/hooks/use-mounted';

import { LogLevelOptions, logger } from 'src/custom/libs/logging';

export const AccountGeneralSettings = (props) => {
  const isMounted = useMounted();
  const auth = getAuth();

  const { updatesettings, ...rest } = props;
  const { avatar, email, name, settings } = rest;
  const initialValues = { ...settings };
  const [loglevel, setLoglevel] = useState(logger.level);
  const formik = useFormik({
    initialValues: { name: name, backend: settings?.backend },
    //validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        console.log(values);
        return await updateProfile(auth.currentUser, { displayName: values.name }); //user.update({ displayName: values.name });
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  const formikSettings = useFormik({
    initialValues,
    //validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await updatesettings(values.backend);
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });
  const [isEditing] = useState(false);

  const generateRandomName = () => {
    const generatedName = generateName();
    formik.setFieldValue('name', generatedName);
  };

  return (
    <Stack
      spacing={4}
      {...rest}
    >
      <CardDefault title="Basic details">
        <Stack spacing={3}>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Box
              sx={{
                borderColor: 'neutral.300',
                borderRadius: '50%',
                borderStyle: 'dashed',
                borderWidth: 1,
                p: '4px',
              }}
            >
              <Box
                sx={{
                  borderRadius: '50%',
                  height: '100%',
                  width: '100%',
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    alignItems: 'center',
                    backgroundColor: (theme) => alpha(theme.palette.neutral[700], 0.5),
                    borderRadius: '50%',
                    color: 'common.white',
                    cursor: 'pointer',
                    display: 'flex',
                    height: '100%',
                    justifyContent: 'center',
                    left: 0,
                    opacity: 0,
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    zIndex: 1,
                    '&:hover': {
                      opacity: 1,
                    },
                  }}
                >
                  <Stack
                    alignItems="center"
                    direction="row"
                    spacing={1}
                  >
                    <SvgIcon color="inherit">
                      <Camera01Icon />
                    </SvgIcon>
                    <Typography
                      color="inherit"
                      variant="subtitle2"
                      sx={{ fontWeight: 700 }}
                    >
                      Select
                    </Typography>
                  </Stack>
                </Box>
                <Avatar
                  src={avatar}
                  sx={{
                    height: 100,
                    width: 100,
                  }}
                >
                  <SvgIcon>
                    <User01Icon />
                  </SvgIcon>
                </Avatar>
              </Box>
            </Box>
            <Button
              color="inherit"
              size="small"
            >
              Change
            </Button>
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <TextField
              defaultValue={getAuth().currentUser?.uid}
              disabled={true}
              label="User ID"
              sx={{
                flexGrow: 1,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderStyle: 'dashed',
                },
              }}
            />
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <TextField
              label="Displayname"
              sx={{ flexGrow: 1 }}
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <Button
              color="inherit"
              size="small"
              onClick={generateRandomName}
            >
              Generate
            </Button>
            <Button
              color="inherit"
              size="small"
              onClick={formik.handleSubmit}
            >
              Save
            </Button>
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <TextField
              defaultValue={email}
              disabled={!isEditing}
              label="Email Address"
              required
              sx={{
                flexGrow: 1,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderStyle: 'dashed',
                },
              }}
            />
          </Stack>
        </Stack>
      </CardDefault>
      <CardDefault title="Settings">
        <Stack
          alignItems="center"
          direction="row"
          spacing={2}
        >
          <TextField
            label="Backend"
            sx={{ flexGrow: 1 }}
            name="backend"
            onChange={formikSettings.handleChange}
            value={formikSettings.values.backend || ''}
          />
          <Button
            color="inherit"
            disabled={!formikSettings.dirty}
            size="small"
            onClick={formikSettings.handleSubmit}
          >
            Save
          </Button>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={2}
        >
          <TextField
            label="Log level"
            sx={{ flexGrow: 1 }}
            name="loglevel"
            onChange={(e) => {
              setLoglevel(e.target.value);
            }}
            select
            value={loglevel}
          >
            {LogLevelOptions.map((option) => (
              <MenuItem
                key={option.key}
                value={option.key}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            color="inherit"
            disabled={logger.level === loglevel}
            size="small"
            onClick={() => {
              logger.setLogLevel(loglevel);
            }}
          >
            Save
          </Button>
        </Stack>
      </CardDefault>
      {/* <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <Typography variant="h6">Public profile</Typography>
            </Grid>
            <Grid xs={12} sm={12} md={8}>
              <Stack divider={<Divider />} spacing={3}>
                <Stack
                  alignItems="flex-start"
                  direction="row"
                  justifyContent="space-between"
                  spacing={3}
                >
                  <Stack spacing={1}>
                    <Typography variant="subtitle1">
                      Make Contact Info Public
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      Means that anyone viewing your profile will be able to see
                      your contacts details.
                    </Typography>
                  </Stack>
                  <Switch />
                </Stack>
                <Stack
                  alignItems="flex-start"
                  direction="row"
                  justifyContent="space-between"
                  spacing={3}
                >
                  <Stack spacing={1}>
                    <Typography variant="subtitle1">
                      Available to hire
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      Toggling this will let your teammates know that you are
                      available for acquiring new projects.
                    </Typography>
                  </Stack>
                  <Switch defaultChecked />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card> */}
      <CardDefault title="Delete account">
        <Stack
          alignItems="flex-start"
          spacing={3}
        >
          <Typography variant="subtitle1">
            Delete your account and all of your source data. This is irreversible.
          </Typography>
          <Button
            color="error"
            variant="outlined"
          >
            Delete account
          </Button>
        </Stack>
      </CardDefault>
    </Stack>
  );
};

AccountGeneralSettings.propTypes = {
  avatar: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  settings: PropTypes.object,
  updatesettings: PropTypes.func.isRequired,
};
