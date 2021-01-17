import React, { useEffect, useRef, useState } from 'react'
import { VictoryAnimation, VictoryLabel, VictoryPie } from 'victory';

interface Props {

}

const getData = (percent: number) => {
    return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
}

export const NextAvailableChart: React.FC<Props> = () => {
    const [data, setData] = useState<any>([{ x: 1, y: 31 }, { x: 2, y: 65 }])

    return (<svg viewBox="0 0 400 400" width="100%" height="100%">
        <VictoryPie
            standalone={false}
            // animate={{ duration: 1000 }}
            width={400} height={400}
            data={data}
            innerRadius={120}
            cornerRadius={25}
            labels={() => null}
            style={{
                data: {
                    fill: ({ datum }) => {
                        const color = datum.y > 30 ? "green" : "red";
                        return datum.x === 1 ? color : "transparent";
                    }
                }
            }}
        />
        <VictoryLabel
            textAnchor="middle" verticalAnchor="middle"
            x={200} y={200}
            text={`in 34min`}
            style={{ fontSize: 35 }}
        />
    </svg>);
}