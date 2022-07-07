/**
 *
 * Asynchronously loads the component for Messages
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
