import React from 'react'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/StatsContainer'
import { StatsItem } from '.'
import { RiDoorOpenFill } from 'react-icons/ri'
import { MdPendingActions } from 'react-icons/md'
import { AiOutlineFileDone } from 'react-icons/ai'
import { BsHouseDoor } from 'react-icons/bs'

const StatsContainer = () => {
  const { stats } = useAppContext()

  const getTotal = (vacant=0,pending=0,closed=0,maintenance=0) => {
    return vacant + pending + closed + maintenance
  }

  const defaultStats = [
    {
      title: 'Vacant',
      count: stats.open || 0,
      icon: <RiDoorOpenFill />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'Pending-Lease',
      count: stats["pending-lease"] || 0,
      icon: <MdPendingActions />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'Closed',
      count: stats.closed || 0,
      icon: <AiOutlineFileDone />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
    {
      title: 'Total Rentals',
      count: getTotal(stats.open, stats["pending-lease"], stats.closed, stats.maintenance) || 0,
      icon: <BsHouseDoor />,
      color: '#5aab0e',
      bcg: '#edfae1',
    },
  ]

  return (
    <Wrapper>
        {defaultStats.map((item, index) => {
        return <StatsItem key={index} {...item} />
      })}
    </Wrapper>
  )
}

export default StatsContainer