import { InjectedConnector } from '@web3-react/injected-connector'
import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core'

function App() {
    const { active, account, activate, deactivate } = useWeb3React()
    const injected = new InjectedConnector({
        //chain is network blockchain
        //4 rinkeby ...
        supportedChainIds: [1, 3, 4, 5, 42],
    })

    async function connect() {
        try {
            await activate(injected)
            localStorage.setItem('isWalletConnected', true)
        } catch (ex) {
            console.log(ex)
        }
    }
    async function disconnect() {
        try {
            deactivate()
            localStorage.setItem('isWalletConnected', false)
        } catch (ex) {
            console.log(ex)
        }
    }
    useEffect(() => {
        const connectWalletOnPageLoad = async () => {
            if (localStorage.getItem('isWalletConnected') === 'true') {
                try {
                    await activate(injected)
                    localStorage.setItem('isWalletConnected', true)
                } catch (ex) {
                    console.log(ex)
                }
            }
        }
        connectWalletOnPageLoad()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <div>
            <div className="App">
            <button onClick={connect}>Connect to MetaMask</button>
            {active ? <span>Connected with <b>{account}</b></span> : <span>Not connected</span>}
            <button onClick={disconnect}>Disconnect</button>
            </div>
        </div>
    );
}

export default App;
