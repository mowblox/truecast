// app/components/ConnectButton.tsx


import { useMetaMask } from 'metamask-react';

const ConnectButton = () => {
  const { status, connect, account } = useMetaMask();

  const handleConnect = () => {
    if (status === 'notConnected') {
      connect();
    }
  };

  return (
    <div className='flex' onClick={handleConnect}>
      {status === 'connected' ? `Connected: ${account}` : 'Connect MetaMask'}
                <svg className="sm:ml-2" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 20 20" height="20px" viewBox="0 0 20 20" width="20px" ><g><rect fill="none" height="20" width="20" /></g><g><path d="M15,4H5C3.34,4,2,5.34,2,7v6c0,1.66,1.34,3,3,3h10c1.66,0,3-1.34,3-3V7C18,5.34,16.66,4,15,4z M13.3,11.33 c-0.18,0.15-0.43,0.21-0.66,0.15L3.69,9.29C3.94,8.82,4.43,8.5,5,8.5h10c0.43,0,0.82,0.19,1.1,0.49L13.3,11.33z M16.5,7.42 C16.06,7.16,15.55,7,15,7H5C4.45,7,3.94,7.16,3.5,7.42V7c0-0.83,0.67-1.5,1.5-1.5h10c0.83,0,1.5,0.67,1.5,1.5V7.42z" /></g></svg>
      </div>
  );
};

export default ConnectButton;