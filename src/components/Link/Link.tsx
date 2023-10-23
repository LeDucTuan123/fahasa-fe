import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
    to: string,
    className?: string,
    children: React.ReactNode,
}

export default function RouterLink({to, children, className}: Props) {
  return (
    <Link to={to} style={{
        textDecoration: 'none',
        color: 'rgba(0, 0, 0, 0.87)'
    }}
    className={className}
    >
        {children}
    </Link>
  )
}
