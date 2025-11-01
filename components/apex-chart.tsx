import type React from "react"
import ReactApexChart from "react-apexcharts"
import type { ApexOptions } from "apexcharts"

interface ChartDataItem {
  month: string
  earnings: number
}

interface ChartProps {
  data: ChartDataItem[]
  title: string
  color: string
  currency: string
  lastMonthLabel?: string
  height?: number
  showAverage?: boolean
}

const Chart: React.FC<ChartProps> = ({
  data,
  title,
  color,
  currency,
  lastMonthLabel = "Last month",
  height = 250,
  showAverage = true,
}) => {
  const currentMonth: number =
    data.length > 0 ? data[data.length - 1].earnings : 0
  const lastMonth: number = data.length > 1 ? data[data.length - 2].earnings : 0
  const average: number =
    data.length > 0
      ? Math.round(data.reduce((sum, d) => sum + d.earnings, 0) / data.length)
      : 0

  const series = [
    {
      name: "Earnings",
      data: data.map((d) => d.earnings),
    },
  ]

  const options: ApexOptions = {
    chart: {
      type: "area",
      fontFamily: "Lexend, sans-serif",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 0,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.6,
        opacityTo: 0.8,
        stops: [0, 100],
        type: "vertical",
      },
    },
    colors: [color],
    xaxis: {
      categories: data.map((d) => d.month.substring(0, 3)),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#9ca3af",
          fontSize: "11px",
          fontFamily: "Lexend, sans-serif",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#9ca3af",
          fontSize: "11px",
          fontFamily: "Lexend, sans-serif",
        },
        formatter: (value: number) => `$ ${value}`,
      },
    },
    grid: {
      borderColor: "#f3f4f6",
      strokeDashArray: 0,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    tooltip: {
      custom: ({ series, seriesIndex, dataPointIndex }) => {
        return `<div style="background: white; padding: 8px 12px; font-family: Lexend, sans-serif;">
          <p style="font-size: 14px; font-weight: 600; color: #1f2937; margin: 0;">${data[dataPointIndex].month}</p>
          <p style="font-size: 14px; color: #6b7280; margin: 4px 0 0 0;">$${series[seriesIndex][dataPointIndex]} ${currency}</p>
        </div>`
      },
    },
  }

  return (
    <div className="w-full font-lexend">
      <div className="bg-white border border-border rounded-3xl p-4 md:p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <div className="flex items-baseline gap-3">
              <h1 className="text-4xl font-bold text-foreground ">
                {currentMonth} {currency}
              </h1>
              {showAverage && (
                <span className="text-sm text-muted-foreground">
                  Avg. {average}
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground mb-1">
              {lastMonthLabel}
            </p>
            <h2 className="text-2xl font-bold text-foreground">
              {lastMonth} {currency}
            </h2>
          </div>
        </div>

        <div>
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={height}
          />
        </div>
      </div>
    </div>
  )
}

export default Chart
