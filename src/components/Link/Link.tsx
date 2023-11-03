import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
    to: string,
    className?: string,
    children: React.ReactNode,
    onClick?: () => void,
}

export default function RouterLink({to, children, className, onClick}: Props) {
  return (
    <Link to={to} style={{
        textDecoration: 'none',
        color: 'rgba(0, 0, 0, 0.87)'
    }}
    className={className}
    onClick={onClick}
    >
        {children}
    </Link>
  )
}
