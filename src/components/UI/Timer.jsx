import React, { useEffect, useState } from 'react'

export default function Timer({expireTime}) {
  const [currentTime,setCurrentTime] = useState(Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000)
  },[])

  function displayTime(expireTime) {
    const mili = expireTime - currentTime

    if (mili > 0) {
    const seconds = Math.floor(mili/1000)
    const minutes = Math.floor(seconds/60)
    const hours = Math.floor(minutes/60)
    return `${hours.toString()}h ${minutes.toString()%60}m ${(seconds%60).toString()}s`
    }
    return null
}

  return (
    displayTime(expireTime) ? (
        <div className="de_countdown">{displayTime(expireTime)}</div>
    ) : (
        null
    )
  );
}