import Bugsnag from '@bugsnag/js'
import { faker } from '@faker-js/faker'
import * as Sentry from '@sentry/react'
import { useCallback, useState } from 'react'
import { TrackJS } from 'trackjs'
import './App.css'
import { loggly } from './loggly'

type Primitive = number | string | boolean | bigint | symbol | null | undefined
type User = {
  id: string
  email: string
  username: string
}

type SearchIndices = {
  action: string
  [key: string]: string
}

type Extra = {
  [key: string]: Primitive
}

type LogObject = {
  user: User
  title: string
  indices: SearchIndices
  extra: Extra
}

function App() {
  const [count, setCount] = useState(0)
  const fireErrorIfEven = useCallback(() => {
    const nextCount = count + 1
    setCount(nextCount)
    if (count % 2 !== 0) {
      const msg = `This is even number ${nextCount}!!`
      console.log('log: ' + msg)
      console.info('info: ' + msg)
      console.warn('warn: ' + msg)
      console.error('error: ' + msg)
      console.trace('trace: ' + msg)
      console.table(loggly)
      loggly.push({
        type: 'log',
        level: 'info',
        meta: {
          msg,
        },
      })
      // throw new Error(msg)
    }
  }, [count])

  const log = useCallback(({ user, title, indices, extra }: LogObject) => {
    // Sentry
    Sentry.captureMessage(`${title}_${Date.now()}`, {
      user,
      tags: indices,
      extra,
    })

    // TrackJS
    Object.entries(indices).forEach(([key, value]) => {
      TrackJS.addMetadata(key, String(value))
    })
    TrackJS.track({
      title,
      user,
      meta: indices,
      extra,
    })
    Object.keys(indices).forEach(TrackJS.removeMetadata)

    // Bugsnag
    Bugsnag.notify({
      name: title,
      message: JSON.stringify({
        title,
        user,
        meta: indices,
        extra,
      }),
    })
  }, [])

  const logRandomly = useCallback(() => {
    log({
      title: 'HOME_RANDOM_CLICK',
      user: {
        id: faker.database.mongodbObjectId(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
      },
      indices: {
        action: faker.hacker.verb(),
        session_id: faker.string.uuid(),
      },
      extra: {
        live_duration: faker.number.int({ min: 999999999 }),
        live_times: faker.number.int({ min: 1, max: 100 }),
      },
    })
  }, [log])

  const logHard = useCallback(() => {
    log({
      title: 'HOME_BUTTON_CLICK',
      user: {
        id: 'thisisauserid',
        email: 'john.doe@example.com',
        username: 'John Doe',
      },
      indices: {
        action: 'home_btn_click',
        session_id: 'thisisasessionid',
      },
      extra: {
        live_duration: 899999998,
        live_times: 4,
      },
    })
  }, [log])

  return (
    <>
      <h1>POC of each logging SaaS</h1>
      <div className="card">
        <button onClick={logHard}>Log</button>
        <button onClick={logRandomly}>Random</button>
        <button onClick={fireErrorIfEven}>Log error</button>
      </div>
    </>
  )
}

export default App
