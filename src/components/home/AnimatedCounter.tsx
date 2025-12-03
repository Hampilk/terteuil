import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  format?: "number" | "percent" | "decimal";
}

const AnimatedCounter = ({
  target,
  duration = 2000,
  prefix = "",
  suffix = "",
  format = "number",
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        setIsVisible(true);
        hasAnimated.current = true;
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let currentValue = 0;
    const increment = target / (duration / 16);
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      currentValue = Math.floor(target * progress);
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  const formatValue = (value: number): string => {
    switch (format) {
      case "percent":
        return `${value}%`;
      case "decimal":
        return value.toFixed(1);
      default:
        return value.toLocaleString();
    }
  };

  return (
    <div
      ref={ref}
      className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-counter"
    >
      {prefix}
      {formatValue(count)}
      {suffix}
    </div>
  );
};

export default AnimatedCounter;
