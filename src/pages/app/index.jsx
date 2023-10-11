import { Box, Container } from '@mui/material';
import { usePageView } from '../../hooks/use-page-view';
import { useSettings } from '../../hooks/use-settings';

import { Seo } from 'src/components/seo';

const Page = () => {
  const settings = useSettings();

  usePageView();

  return (
    <>
      <Seo title="Home" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}></Container>
      </Box>
    </>
  );
};

export default Page;
