import { useEffect, useRef, useState } from "react";

export const useStatsCounters = (
    stats: { number: string; label: string }[],
    trigger: boolean,
    duration: number = 2
): number[] => {
    const [counts, setCounts] = useState(stats.map(() => 0));
    const frameRef = useRef<number | null>(null);

    useEffect(() => {
        if (!trigger) return;

        const startTimestamps: number[] = [];
        const endValues = stats.map((s) =>
            parseInt(s.number.replace(/[^\d]/g, ""))
        );

        const animate = (timestamp: number) => {
            const newCounts = [...counts];
            let isDone = true;

            endValues.forEach((end, i) => {
                if (!startTimestamps[i]) startTimestamps[i] = timestamp;
                const progress = timestamp - startTimestamps[i];
                const ratio = Math.min(progress / (duration * 1000), 1);
                newCounts[i] = Math.floor(ratio * end);
                if (ratio < 1) isDone = false;
            });

            setCounts(newCounts);
            if (!isDone) frameRef.current = requestAnimationFrame(animate);
        };

        frameRef.current = requestAnimationFrame(animate);

        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [trigger]);

    return counts;
};
