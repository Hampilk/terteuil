import { TrendingUp, Target, Award, Flame } from "lucide-react";
import AnimatedStatCard from "./AnimatedStatCard";

interface StatisticsCardsProps {
  totalPredictions: number;
  accuracy: number;
  topPattern: string;
  winningStreak: number;
}

const StatisticsCards = ({
  totalPredictions,
  accuracy,
  topPattern,
  winningStreak,
}: StatisticsCardsProps) => {
  const stats = [
    {
      label: "Összes predikció",
      value: totalPredictions.toLocaleString(),
      icon: <Target className="h-6 w-6" />,
      gradient: "cyan" as const,
      trend: 12,
      trendLabel: "az elmúlt hónapban",
      sparkline: [45, 52, 48, 61, 58, 72, 85],
    },
    {
      label: "Pontosság",
      value: `${accuracy}%`,
      icon: <TrendingUp className="h-6 w-6" />,
      gradient: "emerald" as const,
      trend: 5,
      trendLabel: "az elmúlt hónapban",
      sparkline: [78, 81, 79, 84, 86, 85, 87],
    },
    {
      label: "Legjobb pattern",
      value: topPattern,
      icon: <Award className="h-6 w-6" />,
      gradient: "violet" as const,
      trend: 18,
      trendLabel: "az elmúlt hónapban",
      sparkline: [60, 65, 68, 72, 75, 78, 82],
    },
    {
      label: "Nyerő sorozat",
      value: winningStreak.toString(),
      icon: <Flame className="h-6 w-6" />,
      gradient: "pink" as const,
      trend: 33,
      trendLabel: "az elmúlt hónapban",
      sparkline: [2, 3, 2, 4, 5, 6, 7],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <AnimatedStatCard
          key={index}
          label={stat.label}
          value={stat.value}
          icon={stat.icon}
          gradient={stat.gradient}
          trend={stat.trend}
          trendLabel={stat.trendLabel}
          sparkline={stat.sparkline}
        />
      ))}
    </div>
  );
};

export default StatisticsCards;
