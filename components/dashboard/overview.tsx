"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 167,
  },
  {
    name: "Feb",
    total: 145,
  },
  {
    name: "Mar",
    total: 234,
  },
  {
    name: "Apr",
    total: 187,
  },
  {
    name: "May",
    total: 156,
  },
  {
    name: "Jun",
    total: 198,
  },
  {
    name: "Jul",
    total: 211,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-custom-green-500"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}