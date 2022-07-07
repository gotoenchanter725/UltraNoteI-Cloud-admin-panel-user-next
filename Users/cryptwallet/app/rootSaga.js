import { all, call } from 'redux-saga/effects';
import {authSagas} from './store/auth/auth.sagas';
import { walletSagas } from './store/wallet/wallet.sagas';


export default function* rootSaga() {
    yield all([ // array of generators that we invoke
        call(authSagas),
        call(walletSagas)
    ])
}