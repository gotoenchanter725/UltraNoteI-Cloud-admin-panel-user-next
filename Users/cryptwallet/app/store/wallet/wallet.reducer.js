const { default: WalletTypes } = require("./wallet.types");

const INITIAL_STATE = {
    wallets: [],
    availableBalance: 0,
    unconfirmedBalance: 0,
    usdAvailabeBalance: 0,
    usdUnconfirmedBalance: 0,
    selectedWallet: {},
    transactions: {deposit: [], withdraw: []},
    error: null,
    messages: []
};


const walletReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case WalletTypes.GET_ALL_WALLETS_SUCCESS:
            const fetchedWallets = action.payload[0];
            let availableBalance = 0;
            let unconfirmedBalance = 0;
            let usdAvailabeBalance = 0;
            let usdUnconfirmedBalance = 0;
            if (fetchedWallets && fetchedWallets.length) {
                fetchedWallets.forEach(wallet => {
                availableBalance += wallet.balance;
            });
            availableBalance = availableBalance.toFixed(6) || 0;
            unconfirmedBalance = action.payload[1].toFixed(6) || 0;
            usdAvailabeBalance = action.payload[2].toFixed(6)  || 0;
            usdUnconfirmedBalance = action.payload[3].toFixed(6) || 0;
            }
            return {
                ...state,
                availableBalance,
                unconfirmedBalance,
                usdAvailabeBalance,
                usdUnconfirmedBalance,
                wallets: fetchedWallets
            };
        case WalletTypes.GET_ALL_MESSAGES_SUCCESS:
            return {
                ...state,
                messages: action.payload.msgList
            };
        case WalletTypes.SEND_MSG_SUCCESS:
            return {
                ...state,
            };
        case WalletTypes.GET_TRANSACTIONS_BY_WALLET_SUCCESS:
            return {
                ...state,
                transactions: action.payload
            };
        case WalletTypes.ADD_WALLET_SUCCESS:
            const walletsAfterAdd = [...state.wallets];
            walletsAfterAdd.push(action.payload);
            return {
                ...state,
                wallets: walletsAfterAdd
            };
        case WalletTypes.UPDATE_WALLET_SUCCESS:
            const walletsAfterUpdate = [...state.wallets];
            for (let i=0; i< walletsAfterUpdate.length; i++) {
                const wallet = walletsAfterUpdate[i];
                if (wallet._id == action.payload[0]._id) {
                    walletsAfterUpdate[i] = action.payload[0];
                }
            }
            return {
                ...state,
                wallets: walletsAfterUpdate
            };
        case WalletTypes.WITHDRAW_WALLET_SUCCESS:
            return {
                ...state,
            };
        case WalletTypes.WALLET_RESET_SUCCESS:
            return { ...INITIAL_STATE};
        case WalletTypes.ERROR:
        return {
            ...state,
            error: action.payload
        };
        default: {
            return state;
        }
    }
}

export default walletReducer;
