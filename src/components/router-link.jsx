import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * This is an adapted for `react-router-dom/link` component.
 * We use this to help us maintain consistency between CRA and Next.js
 */
export const RouterLink = forwardRef(function RouterLink(props, ref) {
  const { href, ...other } = props;

  return (
    <Link
      ref={ref}
      to={href}
      {...other}
    />
  );
});

RouterLink.propTypes = {
  href: PropTypes.string.isRequired,
};
