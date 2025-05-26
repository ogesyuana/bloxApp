'use client';
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { RenderTotalActive } from './componentData';

export default function EChartStatus() {
    const userActive = RenderTotalActive();
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const chart = echarts.init(chartRef.current!);

        const active = userActive[0];
        const inactive = userActive[1];
        const total = active + inactive;

        chart.setOption({
            color: ['#188CB0', '#5CC8BE'],
            title: {
                text: 'User Status',
                textStyle: {
                    color: '#121212',
                    fontSize: 14,
                    fontWeight: 'bold',
                }
            },
            legend: {
                right: "0",
                orient: "vertical",
                bottom: "0%",
                data: ['Active', 'Inactive']
            },
            graphic: [
                {
                    type: 'text',
                    top: '0',
                    right: "0",
                    style: {
                        text: `${active}/${total}`,
                        fill: '#D3D3D3',
                        fontSize: 32,
                        fontWeight: 'bold',
                    },
                },
            ],
            series: [
                {
                    type: 'pie',
                    silent: true,
                    label: {
                        show: false,
                    },
                    data: [
                        { value: active, name: 'Active' },
                        { value: total, name: 'Dummy', itemStyle: { color: '#eee' } }],
                    radius: ['55%', '70%'],
                },
                {
                    type: 'pie',
                    silent: true,
                    top: 'middle',
                    height: "50%",
                    label: {
                        show: false,
                    },
                    data: [
                        { value: inactive, name: 'Inactive' },
                        { value: total, name: 'Dummy', itemStyle: { color: '#eee' } }],

                    radius: ['45%', '70%'],
                },
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
    }, [userActive]);

    return <div ref={chartRef} style={{ width: '100%', height: 200 }} />;
}
