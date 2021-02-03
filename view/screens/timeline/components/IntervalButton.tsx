import React, { FC } from 'react'

interface BtnProps {
    top: number;
    height: number;
    onClick: () => void;
    className: string;
}

export const IntervalButton: FC<BtnProps> = ({
    top,
    height,
    className,
    onClick,
    ...props
}) => (
    <div
        role="button"
        className={className}
        onClick={onClick}
        style={{ top, height }}
        {...props}
    />)