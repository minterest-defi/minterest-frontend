import { Dispatch as DispatchType } from 'redux';

// REDUX
interface AccountReducerType {
	currentAccount?: string | null;
	isAdmin: boolean;
	isAdminRequestRunning: boolean;
	keyringState?: string | null;
	keyring?: any | null;
}

interface State {
	form: any;
	account: AccountReducerType;
	substrate: any;
	economicUpdates: any;
	admin: any;
	usersFinancicalTransactions: any;
	dashboardData: any;
}
// TODO refactoring types func return type
interface Store {
	form: any;
	account: any;
	substrate: any;
	economicUpdates: any;
	admin: any;
	usersFinancicalTransactions: any;
	dashboardData: any;
}

interface Action {
	type: string;
	payload?: any;
}
interface ThunkAction {}

type Dispatch = DispatchType<Action>;

// OTHER

export { State, Action, ThunkAction, Dispatch, AccountReducerType, Store };
