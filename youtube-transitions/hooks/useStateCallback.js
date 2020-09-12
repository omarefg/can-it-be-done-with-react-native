import { useState, useEffect } from 'react';

export const useStateCallback = (initilValue, callBack) => {
  const [state, setState] = useState(initilValue);
  useEffect(() => callBack(), [state]);
  return [state, setState];
};
