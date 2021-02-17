import React, { useEffect, useState } from 'react'
import { VictoryAnimation, VictoryContainer, VictoryLabel, VictoryPie } from 'victory';

interface Props {

}


export const NextAvailableChart: React.FC<Props> = () => {
    const [data, setData] = useState<any>([{ x: 1, y: 1 }, { x: 2, y: 99 }])
    const [nextTermInMinutes, setNextTermInMinutes] = useState<any>(0)

    const getData = (percent: number) => [{ x: 1, y: percent }, { x: 2, y: 100 - percent }]

    useEffect(() => {
        // get info about next term
        setNextTermInMinutes(34)
        setData(getData(nextTermInMinutes / 60 * 100))
    }, [nextTermInMinutes])

    return (
        <VictoryContainer>
            <svg viewBox="0 0 400 400" width="100%" height="100%">
                <VictoryPie
                    standalone={false}
                    animate={{ duration: 1000 }}
                    width={400} height={400}
                    data={data}
                    innerRadius={120}
                    cornerRadius={25}
                    style={{
                        data: {
                            fill: ({ datum }) => datum.x === 1 ? "green" : "transparent"
                        }
                    }}
                    labels={() => null}
                />
                <VictoryLabel
                    textAnchor="start" verticalAnchor="middle"
                    x={125} y={150}
                    text={`Next available term`}
                    style={{ fontSize: 18, fill: "#00b9bc" }}
                />
                <VictoryAnimation duration={1000} data={nextTermInMinutes}>
                    {(newProps) => {
                        return (
                            <VictoryLabel
                                textAnchor="middle" verticalAnchor="middle"
                                x={200} y={200}
                                // @ts-ignore
                                text={`in ${Math.round(newProps)}min`}
                                style={{ fontSize: 45, fill: "white" }}
                            />
                        );
                    }}
                </VictoryAnimation>
            </svg>
        </VictoryContainer>);
}