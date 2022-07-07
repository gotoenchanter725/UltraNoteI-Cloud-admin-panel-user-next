import { toast } from "react-toastify";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { addWalletSuccess, updateWalletSuccess, sendMsgSuccess, getTransactionsByWalletAddressSuccess, getWalletSuccess, getMessageSuccess, walletResetSuccess, withdrawWalletSuccess, throwError, downloadAttachmentSuccess, optimizeWalletSuccess } from "./wallet.actions";
import { getUserSuccess } from '../auth/auth.actions';
import WalletTypes from "./wallet.types";
import { clientHttp } from '../../utils/services/httpClient';


export function* addNewWalletAsync({payload}) {
    
    try {
        const result = yield clientHttp.post(`/wallets/`, payload);
        if (result && result.data) {
            toast.success('Wallet added successfully !!');
            yield put(addWalletSuccess(result.data.data[0]));
            yield put(getUserSuccess(result.data.data[1]));
        }
    }
    catch(error) {
        console.log(error);
        yield put(throwError(error));
    }
}


export function* onAddNewWallet() {
    yield takeLatest(WalletTypes.ADD_WALLET_START, addNewWalletAsync);
}

export function* updateWalletAsync({payload}) {

    try {
        const result = yield clientHttp.post(`/wallets/update_wallet`, payload);
        if (result && result.data) {
            toast.success('Wallet updated successfully !!');
            yield put(updateWalletSuccess(result.data.wallet));
        }
    }
    catch(error) {
        console.log(error);
        yield put(throwError(error));
    }
}


export function* onUpdateWallet() {
    yield takeLatest(WalletTypes.UPDATE_WALLET_START, updateWalletAsync);
}

export function* onOptimizeWallet() {
    yield takeLatest(WalletTypes.OPTIMIZE_WALLET_START, optimizeWallet);
}
export function* optimizeWallet(payload) {
    try{
    const result = yield clientHttp.put('/wallets/optimize', payload);
    if(result && result.data) {
        toast.success('Wallet optimization requested.');
        yield put(optimizeWalletSuccess(result.data));
    }   
    }
    catch(error) {
        console.log(error);
        yield put(throwError(error));
    }
}

export function* withdrawWalletAsync({payload}) {
    
    try {
        const result = yield clientHttp.post(`/wallets/transactions`, payload);
        if (result && result.data) {
            toast.success("Successfully send your request!");
            yield put(withdrawWalletSuccess(result.data.newTransaction));
        }
    }
    catch(error) {
        console.log(error);
        yield put(throwError(error));
    }
}


export function* onWithdrawWallet() {
    yield takeLatest(WalletTypes.WITHDRAW_WALLET_START, withdrawWalletAsync);
}


export function* getWalletsAsync({payload}) {
    
    try {
        const result = yield clientHttp.post(`/wallets/my-wallet`, {id: payload});
        if (result && result.data) {
            yield put(getWalletSuccess(result.data));
        }
    }
    catch(error) {
        yield put(throwError(error));
    }
}


export function* onGetWallets() {
    yield takeLatest(WalletTypes.GET_ALL_WALLETS, getWalletsAsync);
}

export function* getMessagesAsync({payload}) {
    
    try {
        const result = yield clientHttp.post(`/wallets/messages`, {id: payload});
        if (result && result.data) {
            yield put(getMessageSuccess(result.data));
        }
    }
    catch(error) {
        yield put(throwError(error));
    }
}


export function* onGetMessages() {
    yield takeLatest(WalletTypes.GET_ALL_MESSAGES, getMessagesAsync);
}

export function* downloadAttachmentAsync({payload}) {
    
    try {
        const result = yield clientHttp.post(`/wallets/attachment`, payload, {
            responseType: 'blob'
        });
        let url = window.URL.createObjectURL(result.data);
        let link = document.createElement('a');
        link.href = url;
        link.download = payload.transactionId + '.zip';
        link.click();
        link.remove();
    }
    catch(error) {
        yield put(throwError(error));
    }
}


export function* onDownloadAttachment() {
    yield takeLatest(WalletTypes.DOWNLOAD_ATTACHMENT_START, downloadAttachmentAsync);
}

export function* SendMsgAsync({payload}) {
    try {
        const result = yield clientHttp.post('/wallets/sendmsg', payload);
        if ( result && result.data ) {
            toast.success('Message has been successfully sent.');
            yield put(sendMsgSuccess(result.data));
        }
    }
    catch(error) {
        console.log(error);
        yield put(throwError(error));
    }
}

export function* onSendMsgStart() {
    yield takeLatest(WalletTypes.SEND_MSG_START, SendMsgAsync);
}




export function* onGetTransactionsByWalletAddress() {
    yield takeLatest(WalletTypes.GET_TRANSACTIONS_BY_WALLET, getTransactionsByWalletAddressAsync);
}


export function* getTransactionsByWalletAddressAsync({payload}) {
    try {
        const result = yield clientHttp.get(`/wallets/transactions/${payload}`);
        if (result && result.data) {
            yield put(getTransactionsByWalletAddressSuccess(result.data));
        }
    }
    catch(error) {
        yield put(throwError(error));
    }
}

export function* walletResetAsync() {
    try {
        console.log('Reset Wallet States');
        yield put(walletResetSuccess());
        }
    catch(error) {
        yield put(throwError(error));
    }
}

export function* onWalletReset() {
    yield takeLatest(WalletTypes.WALLET_RESET, walletResetAsync);
}


export function* walletSagas() {
    yield all([
        call(onAddNewWallet),
        call(onUpdateWallet),
        call(onGetWallets),
        call(onWithdrawWallet),
        call(onGetTransactionsByWalletAddress),
        call(onWalletReset),
        call(onGetMessages),
        call(onDownloadAttachment),
        call(onSendMsgStart),
        call(onOptimizeWallet),
    ]);
};