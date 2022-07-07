/**
 *
 * Asynchronously loads the component for App
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
