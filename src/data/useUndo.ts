/**
 * Basic undo primarily used for undoing a adding and removing from a list of
 * things in csm. NOT for undoing in text editor.
 */
import React, { useState, useCallback } from 'react'

type Entry<T> = { id: string } & T

function useUndo<T>(initialHistory?: Entry<T>[]) {
  const [undoHistory, setUndoHistory] = useState(initialHistory || [])
  const [undoPosition, setUndoPosition] = useState(
    initialHistory?.length ? initialHistory.length - 1 : 0
  )
  // can only go back once at a time for now
  const [canUndo, setCanUndo] = useState(false)

  const undo = useCallback(() => {
    if (!undoHistory.length || !canUndo) return
    setUndoPosition(undoPosition - 1)
    setCanUndo(false)
  }, [canUndo, undoHistory.length, undoPosition])

  const addEntry = useCallback(
    (newEntry: Entry<T>) => {
      // shallow copy and remove any entries after current position
      const newUndoHistory = undoHistory.slice(0, undoPosition + 1)
      // add new entry
      newUndoHistory.push(newEntry)

      setUndoHistory(newUndoHistory)
      setUndoPosition(newUndoHistory.length - 1)
      setCanUndo(true)
    },
    [undoHistory, undoPosition]
  )

  // @TODO: add ability to undo entry removal
  const removeEntry = useCallback(
    (entry: Entry<T>) => {
      setUndoHistory(
        undoHistory.filter((currentEntry) => currentEntry.id === entry.id)
      )
    },
    [undoHistory]
  )

  // @TODO: add ability to undo entry update
  const updateEntry = useCallback(
    (entry: Entry<T>) => {
      setUndoHistory(
        undoHistory.map((currentEntry) => {
          if (currentEntry.id === entry.id) return entry
          return currentEntry
        })
      )
    },
    [undoHistory]
  )

  return { undoHistory, undo, addEntry, removeEntry, updateEntry }
}

export default useUndo
