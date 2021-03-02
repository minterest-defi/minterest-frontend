import { ApiPromise, WsProvider } from '@polkadot/api';
import jsonrpc from '@polkadot/types/interfaces/jsonrpc';
import queryString from 'query-string';
import config from '../config';

const parsedQuery = queryString.parse(window.location.search);
const connectedSocket = parsedQuery.rpc || config.PROVIDER_SOCKET;
console.log(`Connected socket: ${connectedSocket}`);

const provider = new WsProvider(connectedSocket);
const API = new ApiPromise({
	provider,
	types: config.CUSTOM_TYPES,
	rpc: { ...jsonrpc, ...config.RPC },
});

export default API;
