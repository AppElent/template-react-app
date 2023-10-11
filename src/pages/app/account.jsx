import { useCallback, useState } from 'react';
import { subDays, subHours, subMinutes } from 'date-fns';
import { Box, Container, Divider, Stack, Tab, Tabs, Typography } from '@mui/material';
import { usePageView } from '../../hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { AccountGeneralSettings } from 'src/sections/app/account/account-general-settings';
import { AccountSecuritySettings } from 'src/sections/app/account/account-security-settings';
import { useAuth } from 'src/hooks/use-auth';
import { useData } from 'src/custom/libs/data-framework';
import { useUpdatePassword } from '@refinedev/core';
import { toast } from 'react-hot-toast';

import { EmailAuthProvider, getAuth, reauthenticateWithCredential } from 'firebase/auth';
import { useSettings } from 'src/hooks/use-settings';
import { Seo } from 'src/components/seo';
import useLogger from 'src/custom/hooks/use-logger';

const now = new Date();

const tabs = [
  { label: 'General', value: 'general' },
  // { label: "Billing", value: "billing" },
  // { label: "Team", value: "team" },
  // { label: "Notifications", value: "notifications" },
  { label: 'Security', value: 'security' },
];

const Page = () => {
  const { user } = useAuth();
  const { mutate: updatePassword } = useUpdatePassword();
  const [currentTab, setCurrentTab] = useState('general');
  const { data, dispatch } = useData();
  const logger = useLogger();
  const settings = useSettings();

  const updatePasswordFn = useCallback(
    async (oldPassword, newPassword) => {
      // onSubmit={async (values, { setSubmitting }) => {
      //   try {
      //     const auth = getAuth();
      //     const credential = EmailAuthProvider.credential(
      //       auth.currentUser.email,
      //       values.oldpassword
      //     );
      //     await reauthenticateWithCredential(auth.currentUser, credential);
      //     await updatePassword(auth.currentUser, values.password);
      //     // Update successful.
      //     enqueueSnackbar('Successfully updated password', { variant: 'success' });
      //   } catch (error) {
      //     console.log(error);
      //     let { message } = error;
      //     if (error.code === 'auth/wrong-password') message = "Old password doesn't match";
      //     enqueueSnackbar(`Error updating password: ${message}`, { variant: 'error' });
      //   } finally {
      //     setSubmitting(false);
      //   }
      // }}

      try {
        const auth = getAuth();
        logger.log('Old and new password', oldPassword, newPassword);
        const credential = EmailAuthProvider.credential(auth.currentUser.email, oldPassword);
        await reauthenticateWithCredential(auth.currentUser, credential);
        await updatePassword({ password: newPassword });
        toast.success('Update password succesful');
      } catch (error) {
        toast.error('Password update failed: ' + error.message);
      }
    },
    [logger, updatePassword]
  );

  usePageView();

  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value);
  }, []);

  return (
    <>
      <Seo title={'Account'} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Stack
            spacing={3}
            sx={{ mb: 3 }}
          >
            <Typography variant="h4">Account</Typography>
            <div>
              <Tabs
                indicatorColor="primary"
                onChange={handleTabsChange}
                scrollButtons="auto"
                textColor="primary"
                value={currentTab}
                variant="scrollable"
              >
                {tabs.map((tab) => (
                  <Tab
                    key={tab.value}
                    label={tab.label}
                    value={tab.value}
                  />
                ))}
              </Tabs>
              <Divider />
            </div>
          </Stack>
          {currentTab === 'general' && (
            <AccountGeneralSettings
              avatar={user.avatar || ''}
              email={user.email || ''}
              name={user.name || ''}
              user={user || {}}
              settings={data?.settings}
              updatesettings={(value) =>
                dispatch({
                  type: 'SET_DATA',
                  payload: { key: 'data.settings.usersettings.backend', value },
                })
              }
            />
          )}
          {/* {currentTab === "billing" && (
            <AccountBillingSettings
              plan="standard"
              invoices={[
                {
                  id: "5547409069c59755261f5546",
                  amount: 4.99,
                  createdAt: subMonths(now, 1).getTime(),
                },
                {
                  id: "a3e17f4b551ff8766903f31f",
                  amount: 4.99,
                  createdAt: subMonths(now, 2).getTime(),
                },
                {
                  id: "28ca7c66fc360d8203644256",
                  amount: 4.99,
                  createdAt: subMonths(now, 3).getTime(),
                },
              ]}
            />
          )} */}
          {/* {currentTab === "team" && (
            <AccountTeamSettings
              members={[
                {
                  avatar: "/assets/avatars/avatar-cao-yu.png",
                  email: "cao.yu@devias.io",
                  name: "Cao Yu",
                  role: "Owner",
                },
                {
                  avatar: "/assets/avatars/avatar-siegbert-gottfried.png",
                  email: "siegbert.gottfried@devias.io",
                  name: "Siegbert Gottfried",
                  role: "Standard",
                },
              ]}
            />
          )} */}
          {/* {currentTab === "notifications" && <AccountNotificationsSettings />} */}
          {currentTab === 'security' && (
            <AccountSecuritySettings
              loginEvents={[
                {
                  id: '1bd6d44321cb78fd915462fa',
                  createdAt: subDays(subHours(subMinutes(now, 5), 7), 1).getTime(),
                  ip: '95.130.17.84',
                  type: 'Credential login',
                  userAgent: 'Chrome, Mac OS 10.15.7',
                },
                {
                  id: 'bde169c2fe9adea5d4598ea9',
                  createdAt: subDays(subHours(subMinutes(now, 25), 9), 1).getTime(),
                  ip: '95.130.17.84',
                  type: 'Credential login',
                  userAgent: 'Chrome, Mac OS 10.15.7',
                },
              ]}
              updatePassword={updatePasswordFn}
            />
          )}
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
