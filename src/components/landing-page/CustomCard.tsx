import React from 'react'
import { Card } from '../ui/card'


type CardProps = React.ComponentProps<typeof Card>
type CustomCardProps = CardProps & {
    cardHeader?: React.ReactNode,
    cardFooter?: React.ReactNode,
    cardContent?: React.ReactNode,
}

const CustomCard: React.FC<CustomCardProps> = ({ cardHeader, cardFooter, cardContent, ...props }) => {
    return (
        <div>

        </div>
    )
}

export default CustomCard