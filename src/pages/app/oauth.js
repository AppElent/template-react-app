import { Box, Stack, Typography } from '@mui/material';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
//import { useSearch, useItems } from "components/app/list/utils";
import { useOauthClient } from 'src/custom/hooks/use-oauth-client';
import { useData } from 'src/custom/libs/data-framework';

const oauthConfigurations = {};

const Page = () => {
  usePageView();
  const oauth = useOauthClient(oauthConfigurations.enelogic);
  const oauth2 = useOauthClient(oauthConfigurations.enelogic2);
  const data = useData();
  //console.log(data, data.firestore.collections.tokens.data.enelogic);
  return (
    <>
      <Box sx={{ p: 3 }}>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={4}
        >
          <div>
            <Typography variant="h4">Oauth</Typography>
          </div>
          {/* <div>
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
          </div> */}
        </Stack>
        <>
          <br />
          <button onClick={() => oauth.redirect()}>Redirect enelogic</button>
          <button
            onClick={async () => {
              const newtoken = await oauth.refreshToken(
                data.firestore.collections.tokens.data.enelogic
              );
              await oauth.saveToken('enelogic_new', newtoken);
            }}
          >
            Refresh enelogic
          </button>
          <button
            onClick={async () => {
              const token = await oauth.getToken();
              alert(JSON.stringify(token));
            }}
          >
            Get enelogic token
          </button>
          <button onClick={() => oauth2.redirect()}>Redirect enelogic2</button>
        </>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
