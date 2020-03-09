import { useState, useCallback, useContext, useEffect } from 'react';
import FlashContext from '../components/FlashContext';

const useHistory = initialHistory => {
  const initialHistoryState = initialHistory || [];
  const initialHistoryPosition = initialHistoryState.length ? initialHistoryState.length - 1 : 0;
  const { setFlash } = useContext(FlashContext);

  const [history, setHistory] = useState(initialHistoryState || []);
  const [historyPosition, setHistoryProsition] = useState(initialHistoryPosition);
  const [canUndo, setCanUndo] = useState(false);
  const [message, setMessage] = useState(null);

  const getCurrentHistory = useCallback(
    currentHistoryDefault => history[historyPosition] || currentHistoryDefault,
    [history, historyPosition]
  );

  const undo = useCallback(() => {
    if (!history.length || !canUndo) return;
    setHistoryProsition(historyPosition - 1);
    setCanUndo(false);
  }, [canUndo, history.length, historyPosition]);

  const updateHistory = useCallback(
    ({ updatedProducts, enableUndo = true, flashMessage }) => {
      const newHistory = history.slice(0, historyPosition + 1);
      newHistory.push(updatedProducts);

      setHistory(newHistory);
      setHistoryProsition(newHistory.length - 1);
      if (enableUndo) setCanUndo(true);
      setMessage(flashMessage || 'Success');
    },
    [history, historyPosition]
  );

  useEffect(() => {
    if (!message) return;

    setFlash(message, canUndo ? undo : null);
    setMessage(null);
  }, [canUndo, message, setFlash, undo]);

  return { getCurrentHistory, updateHistory };
};

export default useHistory;
