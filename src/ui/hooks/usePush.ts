import { push } from "connected-react-router";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

const usePush = () => {
  const dispatch = useDispatch();
  const action = useCallback(
    (path: string, state?: any) => dispatch(push(path, state)),
    [dispatch]
  );
  const handleAction = useCallback(
    (path: string, state?: any) => () => action(path, state),
    [action]
  );

  return {
    push: action,
    handlePush: handleAction,
  };
};

export default usePush;
