import { useLocation, useHistory } from "react-router-dom";
import { useRef, useCallback, useEffect } from "react";

const changeQue: Array<{ shortName: string; jsonString: string }> = [];
let newSearchParam: URLSearchParams | null = null;

type TType = {} | null;
const useRouteState = <T extends TType>(
  shortName: string,
  defaultValue: T
// eslint-disable-next-line no-unused-vars
): [T, (newValue: T) => void] => {
  const currentValue = useRef<T>();

  const location = useLocation();
  const history = useHistory();

  const params = new URLSearchParams(location.search);

  const stringValue = params.get(shortName);
  const value: T = stringValue == null ? defaultValue : JSON.parse(stringValue);

  if (currentValue.current == null) {
    currentValue.current = value;
  }

  const historyRef = useRef(history);
  const locationRef = useRef(location);

  useEffect(() => {
    locationRef.current = location;
  }, [location]);

  useEffect(() => {
    historyRef.current = history;
  }, [history]);

  const setFunction = useCallback(
    async (newValue: T) => {
      if (newValue !== currentValue.current) {
        currentValue.current = newValue;
      }

      newSearchParam = new URLSearchParams(locationRef.current.search);

      const jsonString = JSON.stringify(newValue);
      changeQue.push({ shortName, jsonString });

      // break thread
      // this is to allow multiple calls to update at the same time
      // everything before this will be called, and then everything after
      await new Promise<void>((r) => r());

      // now handle que
      if (changeQue.length > 0) {
        const toApply = changeQue.pop();
        if (toApply != null) {
          newSearchParam.set(toApply.shortName, toApply.jsonString);
        }
      }

      if (changeQue.length === 0) {
        // last call changes the route
        historyRef.current.push({
          pathname: locationRef.current.pathname,
          search: newSearchParam.toString(),
        });
      }
    },
    [shortName]
  );

  return [currentValue.current, setFunction];
};

export default useRouteState;
