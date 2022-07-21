import { createSlice } from "@reduxjs/toolkit";
import { selectUserStatus } from "../utils/selectors";
import { login } from "../utils/services";

const initialState = {
	data: {
		id: 0,
		firstName: "",
		lastName: "",
		accountIds: [],
	},
	// Satus can be "void", "pending", "connected";
	status: "void",
};

// FIXME Ici j'ai des soucis syncrones ! :'(

const getToken = async (email, password) => {
    return await login(email, password)
    .then((token) => {
        console.log("Happy ending ! => ", token);
        console.log("\n")
        // TODO : connect user, handle keepLegged
    })
    .catch(error => {
        console.log('error , ', error)
    });
}
export function loginUser(email, password, keepLogged) {
	return async (dispatch, getState) => {
		const status = selectUserStatus(getState()).status;
		if (status === "pending" || status === "updating") {
			return;
		}
		dispatch(actions.checkCredentials(email, password, keepLogged));
		try {
			console.log("1 - Send login !");
          const token = await getToken(email, password)
			// await login(email, password)
            // .then((token) => {
			// 	console.log("Happy ending ! => ", token);
            //     console.log("\n")
			// 	return token;
            //     // TODO : connect user, handle keepLegged
			// })
            // .catch(error => {
            //     console.log('error , ', error)
            // });
			dispatch(actions.resolved(token));
		} catch (error) {
			dispatch(actions.rejected(error));
		}
	};
}
const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		checkCredentials: {
			prepare: (userName, password, keepLogged) => ({
				payload: { userName, password, keepLogged },
			}),
			reducer: (draft, action) => {
				if (draft.status === "void") {
					draft.status = "pending";
					return;
				}
				if (draft.status === "rejected") {
					draft.error = null;
					draft.status = "pending";
					return;
				}
				if (draft.status === "resolved") {
					draft.status = "updating";
					return;
				}
			},
		},
		resolved: {
			// prepare permet de modifier le payload
			prepare: (freelanceId, data) => ({
				payload: { freelanceId, data },
			}),
			// la fonction de reducer
			reducer: (draft, action) => {
				if (draft.status === "pending" || draft.status === "updating") {
					draft.data = action.payload.data;
					draft.status = "resolved";
					return;
				}
				return;
			},
		},
		rejected: {
			prepare: (freelanceId, error) => ({
				payload: { freelanceId, error },
			}),
			reducer: (draft, action) => {
				if (draft.status === "pending" || draft.status === "updating") {
					draft.error = action.payload.error;
					draft.data = null;
					draft.status = "rejected";
					return;
				}
				return;
			},
		},
	},
});

// on extrait les actions et le reducer
const { actions, reducer } = userSlice;
// on export chaque action individuellement
export const { editNames } = actions;
// on export le reducer comme default export
export default reducer;
