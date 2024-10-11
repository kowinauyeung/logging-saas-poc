import BugsnagPerformance from '@bugsnag/browser-performance'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'
import React from 'react'

Bugsnag.start({
  apiKey: import.meta.env.VITE_BUGSNAG_API_KEY,
  plugins: [new BugsnagPluginReact()],
})
BugsnagPerformance.start({ apiKey: import.meta.env.VITE_BUGSNAG_API_KEY })

const bugsnagPlugin = Bugsnag.getPlugin('react')
export const ErrorBoundary = (props: { children: React.ReactNode }) => {
  if (bugsnagPlugin) {
    const Boundary = bugsnagPlugin.createErrorBoundary(React)
    return <Boundary>{props.children}</Boundary>
  } else {
    return <>{props.children}</>
  }
}
