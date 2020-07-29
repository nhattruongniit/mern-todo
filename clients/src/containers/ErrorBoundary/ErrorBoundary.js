import React, { useState, useEffect } from "react";

// libs
import { ErrorBoundary } from "react-error-boundary";

// service
import { forageErrorLog } from "services/localforage";

const logsOffline = [];
const DefaultPage = ({ children }) => {
  const [boundaryKey, setBoundaryKey] = useState(0);

  const sendLog = async (message, componentStack) => {
    if (window.navigator.onLine) {
      forageErrorLog.removeItem("errorLog");
    } else {
      logsOffline.push({
        error: JSON.stringify(message),
        componentStack: JSON.stringify(componentStack),
      });
      forageErrorLog.setItem("errorLog", JSON.stringify(logsOffline));
    }
  };

  useEffect(() => {
    async function sendLogWhenOnlineAgain() {
      const hasLogOffline = await forageErrorLog.getItem("errorLog");
      console.log("getLogOffline", JSON.parse(hasLogOffline));
      if (window.navigator.onLine && hasLogOffline) {
        sendLog();
      }
    }
    sendLogWhenOnlineAgain();

    window.onerror = async (message, _, __, ___, errorObj) => {
      sendLog(message, errorObj.stack);
    };

    return () => {
      window.onerror = null;
    };
  });

  function ErrorFallbackUI({ resetErrorBoundary }) {
    return (
      <div onClick={resetErrorBoundary}>
        <div>Something went wrong</div>
        <input
          type="button"
          value="Back To Home"
          className="btn btn-info btn-sm"
          onClick={resetErrorBoundary}
        />
      </div>
    );
  }

  console.log(boundaryKey);

  return (
    <ErrorBoundary
      resetKeys={[boundaryKey]}
      FallbackComponent={ErrorFallbackUI}
      onReset={() => setBoundaryKey((prev) => prev + 1)}
    >
      {children}
    </ErrorBoundary>
  );
};

export default DefaultPage;
