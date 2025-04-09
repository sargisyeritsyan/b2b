import {createPublicClient, createWalletClient, http, parseAbi} from 'viem';
import {privateKeyToAccount} from 'viem/accounts';


const {TOKEN_ADDRESS, URL} = process.env;


const erc20Abi = parseAbi([
    'function balanceOf(address) view returns (uint256)',
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function totalSupply() view returns (uint256)',
    'function transferFrom(address from, address to, uint256 value) returns (bool)',
    'function approve(address spender, uint256 amount) returns (bool)',
    'function allowance(address owner, address spender) view returns (uint256)'
]);

const client = createPublicClient({
    transport: http(URL)
});

export const readFromTokenContract = (functionName, args = []) => client.readContract({
    address: TOKEN_ADDRESS, abi: erc20Abi, functionName, args
})

export const writeToTokenContract = (walletClient, functionName, args = []) => walletClient.writeContract({
    address: TOKEN_ADDRESS, abi: erc20Abi, functionName, args,
})

export const createClient = (privateKey) =>
    createWalletClient({
        account: privateKeyToAccount(privateKey),
        transport: http(URL),
    });