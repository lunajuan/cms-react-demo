import React, { ReactNode } from 'react'
import { classes } from '../lib/classes'

function Background({ children }: { children: ReactNode }) {
  return (
    <div
      className={classes(
        'bg-indigo-100',
        'bg-food-indigo-300',
        'dark:bg-food-gray-600',
        'dark:bg-gray-800',
        'p-10',
        'overflow-scrol',
        'transition-color'
      )}
    >
      {children}
    </div>
  )
}

export default Background
