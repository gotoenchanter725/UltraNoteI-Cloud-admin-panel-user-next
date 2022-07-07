/**
 *
 * Asynchronously loads the component for AddressBook
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
