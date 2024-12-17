import { Pie, PieChart, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const description = "A simple pie chart";

const Chart = ({ reports }: any) => {
  const totalNotifications = reports.length;

  const notificationCount = reports.reduce(
    (acc, notification) => {
      if (notification.status === 1) {
        acc.done += 1;
      }
      if (notification.status === 0) {
        acc.inProgress += 1;
      }
      if (notification.status === 2) {
        acc.rejected += 1;
      }
      return acc;
    },
    { done: 0, inProgress: 0, rejected: 0 }
  );

  const chartData = [
    {
      browser: "InProgress",
      visitors: notificationCount.inProgress,
      fill: "var(--color-inprogress)", // Màu cho trạng thái InProgress
    },
    {
      browser: "Done",
      visitors: notificationCount.done,
      fill: "var(--color-done)", // Màu cho trạng thái Done
    },
    {
      browser: "Rejected",
      visitors: notificationCount.rejected,
      fill: "var(--color-rejected)", // Màu cho trạng thái Rejected
    },
  ];

  // Cấu hình màu sắc cho biểu đồ
  const chartConfig = {
    inprogress: {
      label: "InProgress",
      color: "#fde047",
    },
    done: {
      label: "Done",
      color: "#86efac",
    },
    rejected: {
      label: "Rejected",
      color: "#f87171",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex size-full flex-col border-none">
      <CardHeader className="text-dark100_light500 items-center pb-0">
        {/* <CardDescription>Last month</CardDescription> */}
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center pb-0">
        <ChartContainer config={chartConfig} className="size-full">
          <PieChart width={200} height={200}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              strokeWidth={1}
              fontSize={12}
              labelLine={false}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                percent,
                index,
              }) => {
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

                let labelColor = "white";
                const browser = chartData[index].browser;

                if (browser === "InProgress") {
                  labelColor = "#854d0e";
                } else if (browser === "Done") {
                  labelColor = "#166534";
                } else if (browser === "Rejected") {
                  labelColor = "#991b1b";
                }
                const actualPercentage =
                  (chartData[index].visitors / totalNotifications) * 100;

                return (
                  <text
                    x={x}
                    y={y}
                    fill={labelColor}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={14}
                  >
                    {actualPercentage % 1 === 0
                      ? `${actualPercentage.toFixed(0)}%`
                      : `${actualPercentage.toFixed(2)}%`}{" "}
                  </text>
                );
              }}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="tooltip">
                      <p>{`Status: ${payload[0].name}`}</p>
                      <p>{`Count: ${payload[0].value}`}</p>{" "}
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="w-full flex-col items-center justify-start gap-2 text-sm">
        <div className="flex w-1/5 items-center gap-2 font-medium leading-none">
          <FontAwesomeIcon
            icon={faSquare}
            className="text-[16px] text-green-300"
          />
          <p className="pt-1 text-green-800">Done</p>
        </div>
        <div className="flex w-1/5 items-center gap-2 font-medium leading-none">
          <FontAwesomeIcon
            icon={faSquare}
            className="text-[16px] text-yellow-300"
          />
          <p className="whitespace-nowrap pt-1 text-yellow-800">In progress</p>
        </div>
        <div className="flex w-1/5 items-center gap-2 font-medium leading-none">
          <FontAwesomeIcon
            icon={faSquare}
            className="text-[16px] text-red-400"
          />
          <p className="whitespace-nowrap pt-1 text-red-800">Rejected</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Chart;
