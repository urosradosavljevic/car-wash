import React from 'react'
import { VictoryBar, VictoryChart, VictoryAxis } from "victory"

const data = [
    { hours: 9, average: 60 },
    { hours: 10, average: 55 },
    { hours: 11, average: 50 },
    { hours: 12, average: 46 },
    { hours: 13, average: 57 },
    { hours: 14, average: 70 },
    { hours: 15, average: 84 },
    { hours: 16, average: 94 },
    { hours: 17, average: 73 },
    { hours: 18, average: 60 },
];

export const WeekChart: React.FC = () => {
    return (
        <VictoryChart
            domainPadding={20}
        >
            <VictoryBar
                animate={{
                    duration: 1000,
                    onLoad: { duration: 1000 }
                }}
                data={data}
                x="hours"
                y="average"
            />
            <VictoryAxis dependentAxis
                tickFormat={(tick) => `${tick}%`}
            />
            <VictoryAxis
                tickFormat={(tick) => `${tick}.00`}
            />
        </VictoryChart>
    );
}