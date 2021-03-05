interface State {}
interface Action {
	type: string;
	payload?: any;
}
interface ThunkAction {}

export { State, Action, ThunkAction };
