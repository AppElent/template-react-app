import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { siteSettings } from 'src/config';

export const Seo = (props) => {
  const { title } = props;

  const fullTitle = title ? title + ' | ' + siteSettings.title : siteSettings.title;

  return (
    <Helmet>
      <title>{fullTitle}</title>
    </Helmet>
  );
};

Seo.propTypes = {
  title: PropTypes.string,
};
