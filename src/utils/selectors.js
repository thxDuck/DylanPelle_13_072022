export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;
export const selectUserIsConnected = (state) => state.user.connected;
export const userLoginStatus = (state) => state.user.status;
export const selectUserData = (state) => state.user.data;
export const selectUserId = (state) => state.accounts.data.id;
export const selectMode = (state) => state.user.mode;

export const selectAccountStatus = (state) => state.accounts.status;
export const selectAccountsData = (state) => state.accounts.data;
export const selectAccountIds = (state) => {
    if (!state.accounts.data && state.accounts.data.length === 0) return []  
    else return state.accounts.data.map(a => a.id)
};
