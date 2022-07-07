/*
 * ActivityLog Messages
 *
 * This contains all the text for the ActivityLog container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ActivityLog';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ActivityLog container!',
  },
});
