type MetricReporter = (name: string, value: number) => void;

function observeMetric(
  entryType: string,
  reporter: MetricReporter,
  valueGetter: (entry: PerformanceEntry) => number,
): void {
  if (typeof PerformanceObserver === "undefined") return;

  try {
    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const latest = entries[entries.length - 1];
      if (!latest) return;
      reporter(entryType, Math.round(valueGetter(latest)));
    });

    observer.observe({ type: entryType, buffered: true } as PerformanceObserverInit);
  } catch {
    // noop: unsupported metric type for this browser
  }
}

export function initPerformanceClarity(reportMetric: MetricReporter): void {
  if (typeof window === "undefined") return;

  // First paint responsiveness signals
  observeMetric("first-contentful-paint", reportMetric, (entry) => entry.startTime);
  observeMetric("largest-contentful-paint", reportMetric, (entry) => entry.startTime);
  observeMetric("layout-shift", reportMetric, (entry) => {
    const shift = entry as PerformanceEntry & { value?: number; hadRecentInput?: boolean };
    if (shift.hadRecentInput) return 0;
    return (shift.value || 0) * 1000;
  });

  // Interaction latency proxy from event timings when available
  observeMetric("event", reportMetric, (entry) => {
    const eventEntry = entry as PerformanceEventTiming;
    return eventEntry.duration || 0;
  });

  // Long-task visibility for main-thread pressure
  observeMetric("longtask", reportMetric, (entry) => entry.duration);
}

