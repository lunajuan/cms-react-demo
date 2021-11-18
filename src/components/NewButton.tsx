import React from 'react'
import { classes } from '../lib/classes'

type ThemeAttributes = {
  light: string
  dark?: string
}

type StyleAttributes = {
  text: ThemeAttributes
  bg: ThemeAttributes
  'hover:bg': ThemeAttributes
  'focus:ring': ThemeAttributes
}

type ButtonStyle = 'primary' | 'secondary' | 'inverse'

const ButtonStyleAttributes: Record<ButtonStyle, Partial<StyleAttributes>> = {
  primary: {
    text: { light: 'white', dark: 'black' },
    bg: { light: 'blue-500', dark: 'white' },
    'hover:bg': { light: 'blue-700', dark: 'blue-700' },
    'focus:ring': { light: 'blue-400', dark: 'blue-400' },
  },
  secondary: {
    bg: { light: 'gray-100', dark: 'gray-100' },
    'hover:bg': { light: 'gray-100', dark: 'gray-100' },
    'focus:ring': { light: 'gray-400', dark: 'gray-400' },
  },
  inverse: {
    text: { light: 'white', dark: 'gray-900' },
    bg: { light: 'gray-900', dark: 'white' },
  },
}

type HTMLButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

type ButtonProps = HTMLButtonProps & {
  className?: string
  rounded?: boolean
}
function BaseButton({ children, className, rounded, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      className={classes(
        'px-4',
        'py-2',
        'font-semibold',
        rounded ? 'rounded-full' : 'rounded-md',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-blue-400',
        'focus:ring-opacity-50',
        'transition-color',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default BaseButton

export function PrimaryButton({ className, ...props }: ButtonProps) {
  return (
    <BaseButton
      className={classes(getTailwindClasses('primary'), className)}
      {...props}
    />
  )
}

export const SecondaryButton = ({ className, ...props }: ButtonProps) => (
  <BaseButton
    className={classes(getTailwindClasses('secondary'), className)}
    {...props}
  />
)

export const TertiaryButton = ({ className, ...props }: ButtonProps) => (
  <BaseButton
    className={classes(getTailwindClasses('inverse'), className)}
    {...props}
  />
)

function getTailwindClasses(buttonStyle: ButtonStyle) {
  const styles = ButtonStyleAttributes[buttonStyle]
  const classList = Object.entries(styles).map(([prefix, { light, dark }]) =>
    [`${prefix}-${light}`, dark && `dark:${prefix}-${dark}`]
      .filter(Boolean)
      .join(' ')
  )
  return classList.join(' ')
}
