import React, { createContext, ReactNode, useState, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { classes } from '../lib/classes'
import { SecondaryButton } from './NewButton'

const NOTIFICATION_TIMEOUT_TIME = 5000

export type Notification = {
  id: string
  title: string
  action?: () => void
}

type NotificationValue = {
  addNotification: (notification: Notification) => void
}

const NotificationContext = createContext<NotificationValue>({
  addNotification: () => undefined,
})
NotificationContext.displayName = 'NotificationContext'

function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const remove = (notification: Notification) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((n) => n.id !== notification.id)
    )
  }

  const add = (newNotification: Notification) => {
    setNotifications([...notifications, newNotification])
    setTimeout(() => {
      remove(newNotification)
    }, NOTIFICATION_TIMEOUT_TIME)
  }

  return (
    <NotificationContext.Provider value={{ addNotification: add }}>
      <OverlayContainer>
        <ul>
          <AnimatePresence initial={false}>
            {notifications.map((notification) => (
              <motion.li
                key={notification.id}
                initial={{ opacity: 0, y: 50, scale: 0.3 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  scale: 0.5,
                  transition: { duration: 0.2 },
                }}
              >
                <NotificationCard
                  notification={notification}
                  close={() => remove(notification)}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </OverlayContainer>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationProvider

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context)
    throw new Error('useNotifications must be within <NotificationsProvider />')
  return context
}

function OverlayContainer({ children }: { children: ReactNode }) {
  return (
    <div
      className={classes(
        'absolute',
        'inset-y-0',
        'right-0',
        'h-screen',
        'w-full',
        'max-w-lg',
        'pr-4',
        'overflow-scroll'
      )}
    >
      {children}
    </div>
  )
}

type CardProps = {
  notification: Notification
  close: () => void
}

function NotificationCard({ notification, close }: CardProps) {
  return (
    <div
      className={classes(
        'border',
        'rounded-lg',
        'w-full',
        'flex',
        'px-6',
        'py-4',
        'mt-8'
      )}
    >
      <div className="flex-1">
        <p>{notification.title}</p>
      </div>
      <SecondaryButton onClick={close}>X</SecondaryButton>
    </div>
  )
}
