import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = (props: any) => {
  return (
    <LineChart
      width={900}
      height={500}
      data={props.rates}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis type="number" domain={[0, 5]} />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="rating"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
};

export default Chart;
