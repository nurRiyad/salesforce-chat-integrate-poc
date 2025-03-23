import { useState } from 'react';
import SalesforceChat from './SalesforceChat';

export default function Header() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatClick = () => {
    setIsChatOpen(true);
  };
  return (
    <header>
      <h1>This Text Is From Header Component</h1>
      <button onClick={handleChatClick}>Open Salesforce Chat</button>
      <SalesforceChat isOpen={isChatOpen} />
    </header>
  );
}