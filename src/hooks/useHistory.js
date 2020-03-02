import React, { useState, useCallback } from 'react';

const useHistory = initialHistory => {
  const initialHistoryState = initialHistory || [];
  const initialHistoryPosition = initialHistoryState.length ? initialHistoryState.length - 1 : 0;

  const [history, setHistory] = useState(initialHistoryState || []);
  const [historyPosition, setHistoryProsition] = useState(initialHistoryPosition);
  const [canUndo, setCanUndo] = useState(false);

  const getCurrentHistory = useCallback(
    currentHistoryDefault => history[historyPosition] || currentHistoryDefault,
    [history, historyPosition]
  );

  const updateHistory = useCallback(
    (updatedCurrentHistory, undo = true) => {
      const newHistory = history.slice(0, historyPosition + 1);
      newHistory.push(updatedCurrentHistory);

      setHistory(newHistory);
      setHistoryProsition(newHistory.length - 1);
      setCanUndo(undo);
    },
    [history, historyPosition]
  );

  const undo = useCallback(() => {
    if (!history.length || !canUndo) return;
    setHistoryProsition(historyPosition - 1);
    setCanUndo(false);
  }, [canUndo, history, historyPosition]);

  return { getCurrentHistory, updateHistory, canUndo, undo };
};

export default useHistory;
