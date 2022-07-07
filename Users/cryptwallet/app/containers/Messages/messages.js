/*
 * Messages Messages
 *
 * This contains all the text for the Messages container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Messages';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Messages container!',
  },
});
