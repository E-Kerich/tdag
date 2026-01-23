import React, { useEffect } from 'react'
import WebHero from '../../components/web/WebHero'
import WhatWeBuild from '../../components/web/Work'
import Process from '../../components/web/Process'
import Pricing from '../../components/web/Pricing'

const Webdesign = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
  return (
    <div>
      <WebHero/>
      <WhatWeBuild/>
      <Process/>
      <Pricing/>
    </div>
  )
}

export default Webdesign
