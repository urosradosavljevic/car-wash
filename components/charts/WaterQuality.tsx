import React from 'react'
import { VictoryLabel, VictoryTooltip } from 'victory';

interface Props {

}

export const WaterQuality: React.FC<Props> = () => {
    return (
        <g>
            <VictoryLabel />
            <VictoryTooltip

                x={200} y={250}
                orientation="top"
                pointerLength={0}
                cornerRadius={50}
                flyoutWidth={100}
                flyoutHeight={100}
                flyoutStyle={{ fill: "black" }}
            />
        </g>);
}