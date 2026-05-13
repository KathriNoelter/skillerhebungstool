interface Step {
  label: string;
  num: number;
}

interface StepperProps {
  steps: Step[];
  current: number;
}

export function Stepper({ steps, current }: StepperProps) {
  return (
    <nav className="no-print flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
      {steps.map((step, i) => {
        const done = current > step.num;
        const active = current === step.num;
        return (
          <div key={step.num} className="flex flex-1 items-center gap-2">
            {i > 0 && (
              <div
                className={`mx-2 hidden h-px flex-1 sm:block ${
                  done ? "bg-emerald-400" : "bg-gray-200"
                }`}
              />
            )}
            <div className="flex items-center gap-2">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                  active
                    ? "bg-slate-800 text-white"
                    : done
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {done ? "\u2713" : step.num}
              </span>
              <span
                className={`hidden text-sm md:inline ${
                  active
                    ? "font-semibold text-slate-800"
                    : done
                      ? "text-emerald-700"
                      : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
