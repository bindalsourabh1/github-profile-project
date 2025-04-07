import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: { date: string; count: number }[];
  username: string;
  loading: boolean;
}

const CommitsChart = ({ data, username, loading }: Props) => {
  if (loading) {
    return <p>Loading commits...</p>;
  }

  if (username && data.length === 0) {
    return <p>No commits found.</p>;
  }

  if (data.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2 ml-6">Commits in Last 7 Days</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#2563EB"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CommitsChart;
