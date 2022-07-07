/*
 * MyProfile Messages
 *
 * This contains all the text for the MyProfile container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.MyProfile';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the MyProfile container!',
  },
});
