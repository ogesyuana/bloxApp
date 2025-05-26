'use client';
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { useGetPostUser } from '@/hooks/useGetData';
import { UseGetPostUser } from '@/types';

export default function EChartPost() {
    const { data: userPost } = useGetPostUser();
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const chart = echarts.init(chartRef.current!);

        const usernames = userPost?.data?.map((u: UseGetPostUser) => u.name);
        const postCounts = userPost?.data?.map((u: UseGetPostUser) => u.postCount);

        chart.setOption({
            title: {
                text: 'Blog Post Quantity',
                textStyle: {
                    color: '#121212',
                    fontSize: 14,
                    fontWeight: 'bold',
                }
            },
            color: ['#59a1a5'],
            tooltip: {},
            legend: {
                data: ['Total Post'],
                left: 'left',
                bottom: 'bottom'
            },
            xAxis: {
                name: 'Username',
                nameLocation: 'start',
                nameTextStyle: {
                    verticalAlign: 'top',
                    align: 'center',
                    lineHeight: 60,
                },
                axisLabel: {
                    interval: 0,
                    rotate: -25,
                    showMinLabel: true,
                },
                data: usernames
            },
            yAxis: {
                name: 'Post',
                nameTextStyle: {
                    verticalAlign: 'bottom',
                    align: 'right',
                },
            },
            series: [
                {
                    barMaxWidth: 25,
                    name: 'Total Post',
                    type: 'bar',
                    data: postCounts,
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
    }, [userPost]);

    return <div ref={chartRef} style={{ width: '100%', height: 490 }} />;
}
