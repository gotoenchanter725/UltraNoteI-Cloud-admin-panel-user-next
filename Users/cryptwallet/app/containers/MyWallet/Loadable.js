/**
 *
 * Asynchronously loads the component for MyWallet
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
