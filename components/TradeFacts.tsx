import Reveal from "@/components/motion/Reveal";

/** Three small facts in a quiet row. */
export default function TradeFacts({ facts }: { facts: { label: string; value: string }[] }) {
  return (
    <Reveal y={10} blur={0}>
      <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-5 text-sm">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="text-[10px] uppercase tracking-[0.2em] text-paper/40">{fact.label}</dt>
            <dd className="mt-1 text-paper/90">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}