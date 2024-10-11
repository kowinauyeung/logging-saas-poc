import { TrackJS } from 'trackjs'
TrackJS.install({
  token: import.meta.env.VITE_TRACKJS_TOKEN,
  // for more configuration options, see https://docs.trackjs.com
})
