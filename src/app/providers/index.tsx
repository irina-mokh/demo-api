import compose from 'compose-function';
// import { withQuery } from './with-query';
import { withRouter } from './withRouter';
import { withStore } from './withStore';

export const withProviders = compose(withRouter, withStore);
