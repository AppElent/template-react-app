import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';

const Page = () => {
  usePageView();

  return (
    <>
      <Seo />
      <main>
        {/* <HomeHero />
        <HomeFeatures />
        <HomeReviews />
        <HomeCta />
        <HomeFaqs /> */}
      </main>
    </>
  );
};

export default Page;
