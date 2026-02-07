'use client'

import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import { Card } from '@/components/ui/card'

interface TrafficDataPoint {
    label: string
    visitors: number
    clicks: number
}

interface TrafficOverviewChartProps {
    data: TrafficDataPoint[]
    growthLabel?: string
}

export function TrafficOverviewChart({
    data,
    growthLabel = '+0% this week',
}: TrafficOverviewChartProps) {
    return (
        <Card className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl">
            {/* Header */}
            <div className="mb-6 flex items-start justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-white">
                        Traffic Overview
                    </h3>
                    <p className="text-sm text-zinc-400">
                        Daily visitors vs clicks
                    </p>
                </div>

                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                    ↑ {growthLabel}
                </span>
            </div>

            {/* Chart */}
            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            {/* Visitors gradient */}
                            <linearGradient id="visitorsGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
                                <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            strokeDasharray="3 6"
                            stroke="#27272a"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="label"
                            tick={{ fill: '#a1a1aa', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            tick={{ fill: '#71717a', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#09090b',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 12,
                                color: '#fff',
                            }}
                            cursor={{ stroke: '#6366f1', strokeDasharray: '4 4' }}
                        />

                        {/* Clicks (dotted line) */}
                        <Area
                            type="monotone"
                            dataKey="clicks"
                            stroke="#c4b5fd"
                            strokeWidth={2}
                            strokeDasharray="4 4"
                            fill="transparent"
                            dot={false}
                        />

                        {/* Visitors (solid with area) */}
                        <Area
                            type="monotone"
                            dataKey="visitors"
                            stroke="#6366f1"
                            strokeWidth={2}
                            fill="url(#visitorsGradient)"
                            dot={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    )
}