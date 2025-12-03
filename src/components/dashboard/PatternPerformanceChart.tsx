import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import { useState } from "react";

interface PatternData {
  name: string;
  accuracy: number;
  total: number;
}

interface PatternPerformanceChartProps {
  data: PatternData[];
}

const PatternPerformanceChart = ({ data }: PatternPerformanceChartProps) => {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  const getBarColor = (accuracy: number) => {
    if (accuracy >= 80) return "#10b981";
    if (accuracy >= 60) return "#06b6d4";
    if (accuracy >= 40) return "#f59e0b";
    return "#ef4444";
  };

  const CustomTooltip = (props: any) => {
    if (!props.active || !props.payload) return null;

    const data = props.payload[0].payload;
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 shadow-xl">
        <p className="text-sm font-bold text-white">{data.name}</p>
        <p className="text-xs text-cyan-400">Pontosság: {data.accuracy.toFixed(1)}%</p>
        <p className="text-xs text-slate-400">Összes: {data.total}</p>
      </div>
    );
  };

  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Pattern teljesítmény</h2>
        <p className="text-sm text-slate-400 mt-1">
          Az egyes minták pontossági mutatói
        </p>
      </div>

      {/* Chart */}
      {data.length === 0 ? (
        <div className="flex items-center justify-center h-64 rounded-xl bg-slate-900/30 border border-slate-700/30">
          <p className="text-slate-400 font-medium">Nincs elegendő adat</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <defs>
              <linearGradient id="gradientGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#059669" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="gradientCyan" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#0891b2" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="gradientAmber" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#d97706" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="gradientRed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#dc2626" stopOpacity={0.6} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgb(71, 85, 105)"
              opacity={0.2}
            />

            <XAxis
              dataKey="name"
              tick={{
                fill: "rgb(148, 163, 184)",
                fontSize: 12,
                fontWeight: 500,
              }}
              axisLine={{ stroke: "rgb(71, 85, 105)", opacity: 0.3 }}
              angle={-45}
              textAnchor="end"
              height={100}
            />

            <YAxis
              domain={[0, 100]}
              tick={{
                fill: "rgb(148, 163, 184)",
                fontSize: 12,
              }}
              axisLine={{ stroke: "rgb(71, 85, 105)", opacity: 0.3 }}
              tickFormatter={(value) => `${value}%`}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(6, 182, 212, 0.1)" }} />

            <Bar
              dataKey="accuracy"
              radius={[8, 8, 0, 0]}
              onMouseEnter={(data) => setHoveredBar(data.name)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              {data.map((entry, index) => {
                const isHovered = hoveredBar === entry.name;
                const color = getBarColor(entry.accuracy);
                let gradient = "url(#gradientGreen)";

                if (entry.accuracy >= 80) {
                  gradient = "url(#gradientGreen)";
                } else if (entry.accuracy >= 60) {
                  gradient = "url(#gradientCyan)";
                } else if (entry.accuracy >= 40) {
                  gradient = "url(#gradientAmber)";
                } else {
                  gradient = "url(#gradientRed)";
                }

                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={gradient}
                    opacity={isHovered || hoveredBar === null ? 1 : 0.5}
                    className="transition-all duration-300"
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}

      {/* Footer Stats */}
      {data.length > 0 && (
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="p-3 rounded-lg bg-slate-700/30 border border-slate-700/50">
            <p className="text-xs text-slate-400 mb-1">Átlag pontosság</p>
            <p className="text-lg font-bold text-cyan-400">
              {(
                data.reduce((sum, item) => sum + item.accuracy, 0) / data.length
              ).toFixed(1)}
              %
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-700/30 border border-slate-700/50">
            <p className="text-xs text-slate-400 mb-1">Legjobb pattern</p>
            <p className="text-lg font-bold text-emerald-400">
              {Math.max(...data.map((d) => d.accuracy)).toFixed(1)}%
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-700/30 border border-slate-700/50">
            <p className="text-xs text-slate-400 mb-1">Összes pattern</p>
            <p className="text-lg font-bold text-white">{data.length}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatternPerformanceChart;
