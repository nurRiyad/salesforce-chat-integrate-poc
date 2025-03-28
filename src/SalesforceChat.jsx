import { useEffect, useState } from 'react';

const SalesforceChat = ({ isOpen }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initESW = (gslbBaseURL) => {
      window.embedded_svc.settings.displayHelpButton = false;
      window.embedded_svc.settings.language = '';
      
      window.embedded_svc.settings.enabledFeatures = ['LiveAgent'];
      window.embedded_svc.settings.entryFeature = 'LiveAgent';

      window.embedded_svc.init(
        'https://fieldnation--deathstar.sandbox.my.salesforce.com',
        'https://fieldnation--deathstar.sandbox.my.site.com/',
        gslbBaseURL,
        '00D790000004d7r',
        'Chat_Agent_For_Web_Support',
        {
          baseLiveAgentContentURL: 'https://c.la12s-core2.sfdc-lywfpd.salesforceliveagent.com/content',
          deploymentId: '572Su000000j7QP',
          buttonId: '573Su000000SzyD',
          baseLiveAgentURL: 'https://d.la12s-core2.sfdc-lywfpd.salesforceliveagent.com/chat',
          eswLiveAgentDevName: 'Chat_Agent_For_Web_Support',
          isOfflineSupportEnabled: false
        }
      );

      setIsLoaded(true);
    };

    if (!window.embedded_svc) {
      const script = document.createElement('script');
      script.src = 'https://fieldnation--deathstar.sandbox.my.salesforce.com/embeddedservice/5.0/esw.min.js';
      script.async = true;
      
      script.onload = () => initESW(null);
      script.onerror = () => console.error('Failed to load Salesforce chat script');
      
      document.body.appendChild(script);
      
      return () => {
        document.body.removeChild(script);
      };
    } else {
      initESW('https://service.force.com');
    }
  }, []);

  useEffect(() => {
    if (isLoaded && isOpen && window.embedded_svc) {
      setIsLoading(true);
      window.embedded_svc.bootstrapEmbeddedService();
      // Assuming the chat is fully loaded after bootstrap, we can set a timeout or listen for an event
      setTimeout(() => setIsLoading(false), 6000); // Adjust timeout based on observed delay
    }
  }, [isLoaded, isOpen]);

  return (
    <>
      <style>
        {`
          .embeddedServiceHelpButton .helpButton .uiButton {
            background-color: #005290;
            font-family: "Arial", sans-serif;
          }
          .embeddedServiceHelpButton .helpButton .uiButton:focus {
            outline: 1px solid #005290;
          }
        `}
      </style>
      {isLoading && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '10px',
          borderRadius: '4px',
          zIndex: 1000
        }}>
          Loading Chat...
        </div>
      )}
    </>
  );
};

export default SalesforceChat;