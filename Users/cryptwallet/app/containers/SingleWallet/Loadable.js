/**
 *
 * Asynchronously loads the component for SingleWallet
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
