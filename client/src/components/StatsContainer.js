import React from 'react'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/StatsContainer'
import { StatsItem } from '.'
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa'

const StatsContainer = () => {
  const { stats } = useAppContext()

  const defaultStats = [
    {
      title: 'Vacant',
      count: stats.open || 0,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'Pending-Lease',
      count: stats["pending-lease"] || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'Closed',
      count: stats.closed || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
    {
      title: 'Total Rentals',
      count: (stats.closed  + stats.open + stats.maintenance + stats["pending-lease"]) || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
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