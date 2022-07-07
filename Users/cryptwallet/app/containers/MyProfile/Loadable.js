/**
 *
 * Asynchronously loads the component for MyProfile
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
