/**
 *
 * Asynchronously loads the component for LandingPage
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
