/**
 *
 * Asynchronously loads the component for PrivateRoute
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
