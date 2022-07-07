/**
 *
 * Asynchronously loads the component for BuyCoin
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
