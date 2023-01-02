import { useLayoutEffect, useState } from "react";
import history from "@history";
import { Router, Route, Routes } from "react-router-dom";
import ConfirmEmail from "src/app/main/confirm-email/ConfirmEmail";
function BrowserRouter({ basename, children, window }) {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
}

export default BrowserRouter;
