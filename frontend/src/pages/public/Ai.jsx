import React, { useEffect } from 'react'
import AIHero from '../../components/ui/ai/AIHero'
import Philosophy from '../../components/ui/ai/Philosophy'
import AIUseCases from '../../components/ui/ai/Uses'
import WhatWeDo from '../../components/ui/ai/How'

const Ai = () => {
  useEffect(() => {
      window.scrollTo(0, 0)
  }, [])
  return (
    <div>
      <AIHero/>
      <Philosophy/>
      <AIUseCases/>
      <WhatWeDo/>
    </div>
  )
}

export default Ai
