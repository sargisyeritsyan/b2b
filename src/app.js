import express from 'express';

import {createClient, readFromTokenContract, writeToTokenContract} from './contract.js';

export const app = express();

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({extended: true}));

app.get('/symbol', async (req, res) => {
    try {
        const data = await readFromTokenContract('symbol')

        res.json({
            data
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

app.get('/name', async (req, res) => {
    try {


        const data = await readFromTokenContract('name')

        res.json({
            data,
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

app.get('/totalSupply', async (req, res) => {
    try {

        const data = await readFromTokenContract('totalSupply')

        res.json({
            data,
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

app.get('/balance/:address', async (req, res) => {
    try {
        const address = req.params.address;

        const data = await readFromTokenContract('balanceOf', [address])

        res.json({
            data: {
                address, balance: data.toString()
            }
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

app.post('/transferFrom', async (req, res) => {
    try {

        const {owner, ownerPrivateKey, spender, spenderPrivateKey, recipient, amount} = req.body;

        if (!owner || !ownerPrivateKey || !spender || !spenderPrivateKey || !recipient || !amount) {
            return res.status(400).json({error: 'Missing required fields'});
        }
        const price = BigInt(amount);

        const ownerClient = createClient(ownerPrivateKey)

        const balance = await readFromTokenContract('balanceOf', [owner])

        if (balance < price) {
            return res.status(400).json({error: 'Insufficient funds'});
        }

        await writeToTokenContract(ownerClient, 'approve', [spender, price])

        await readFromTokenContract('allowance', [owner, spender])

        const spenderClient = createClient(spenderPrivateKey)

        const txHash = await writeToTokenContract(spenderClient, 'transferFrom', [owner, recipient, price])

        res.json({
            txHash,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
});
