import React from 'react'

import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel, VictoryTooltip } from "victory"

const data = [
    { hours: 9, average: 60, label: "9:00" },
    { hours: 10, average: 55, label: "10:00" },
    { hours: 11, average: 50, label: "11:00" },
    { hours: 12, average: 46, label: "12:00" },
    { hours: 13, average: 57, label: "13:00" },
    { hours: 14, average: 70, label: "14:00" },
    { hours: 15, average: 84, label: "15:00" },
    { hours: 16, average: 94, label: "16:00" },
    { hours: 17, average: 73, label: "17:00" },
    { hours: 18, average: 60, label: "18:00" },
];

export const WeekChart: React.FC = () => {
    return (
        <VictoryChart
            domainPadding={20}
        >
            <VictoryLabel
                textAnchor="start" verticalAnchor="start"
                x={125} y={0}
                text={`Average term availability`}
                style={{ fontSize: 24, fill: "#00b9bc" }}
            />
            <VictoryBar
                labelComponent={<VictoryTooltip />}
                animate={{
                    duration: 1000,
                    onLoad: { duration: 1000 }
                }}
                style={{
                    data: {
                        fill: ({ datum }) => datum.average > 80 ? "red" : "green"
                    }
                }}
                data={data}
                x="hours"
                y="average"
            />
            <VictoryAxis dependentAxis
                style={{
                    tickLabels: { fill: "#00b9bc" },
                    axis: { stroke: "#00b9bc" }
                }}
                tickFormat={(tick) => `${tick}%`}
            />
            <VictoryAxis
                style={{
                    tickLabels: { fill: "#00b9bc" },
                    axis: { stroke: "#00b9bc" }
                }}
                tickFormat={(tick) => `${tick}.00`}
            />
        </VictoryChart>
    );
}