import SalesforceChat from './SalesforceChat';

export default function Header() {
  return (
    <header>
      <h1>This Text Is From Header Component</h1>
      <button>Open Salesforce Chat</button>
      <SalesforceChat />
    </header>
  );
}