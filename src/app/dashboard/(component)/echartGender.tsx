'use client';
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { RenderTotalGender } from './componentData';

export default function EChartGender() {
    const userGender = RenderTotalGender();
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const chart = echarts.init(chartRef.current!);

        const male = userGender[0];
        const female = userGender[1];
        const total = male + female;

        chart.setOption({
            color: ['#7851A9', '#4682B4'],
            title: {
                text: 'Post Distribution by Gender',
                textStyle: {
                    color: '#121212',
                    fontSize: 14,
                    fontWeight: 'bold',
                }
            },
            legend: {
                orient: 'horizontal',
                left: "0%",
                bottom: "0%",
                data: [`(${male}) Male`, `(${female}) Female`]
            },
            graphic: [
                {
                    type: 'text',
                    left: 'center',
                    top: '39%',
                    style: {
                        text: 'Total',
                        textAlign: 'center',
                        fill: '#8E8E93',
                        fontSize: 14,
                    },
                },
                {
                    type: 'text',
                    left: 'center',
                    top: '52%',
                    style: {
                        text: `${total}`,
                        textAlign: 'center',
                        fill: '#121212',
                        fontSize: 26,
                        fontWeight: 'bold',
                    },
                },
            ],
            series: [
                {
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                    },
                    labelLine: {
                        show: false
                    },
                    emphasis: {
                        label: {
                            show: false,
                        }
                    },
                    data: [
                        { value: male, name: `(${male}) Male` },
                        { value: female, name: `(${female}) Female` },
                    ]
                }
            ]
        });
        const observer = new ResizeObserver(() => {
            chart.resize();
        });

        if (chartRef.current) {
            observer.observe(chartRef.current);
        }

        return () => {
            observer.disconnect();
            chart.dispose();
        };
    }, [userGender]);

    return <div ref={chartRef} style={{ width: '100%', height: 200 }} />;
}
