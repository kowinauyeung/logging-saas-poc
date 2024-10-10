declare global {
  interface Window {
    _LTracker: object[]
  }
}

let _LTracker
if (!window._LTracker) {
  const script = document.createElement('script')
  script.src = 'https://cloudfront.loggly.com/js/loggly.tracker-2.2.4.min.js'
  document.body.appendChild(script)
  window._LTracker = []
  _LTracker = window._LTracker
  _LTracker.push({
    logglyKey: import.meta.env.VITE_LOGGLY_KEY,
    tag: 'loggly-poc',
  })
}
_LTracker = window._LTracker

export const loggly = _LTracker
