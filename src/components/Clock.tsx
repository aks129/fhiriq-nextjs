'use client';

import { useEffect, useState } from 'react';

/**
 * Live UTC clock, lifted from the reference's nav metadata.
 *
 * Renders `--:-- UTC` on the server and fills in after mount, which is what
 * agencidev does too. That is not a stylistic choice: a clock rendered on the
 * server disagrees with the client on hydration, and this sidesteps it
 * entirely rather than suppressing the warning.
 *
 * UTC rather than a local timezone because it is unambiguous and true for
 * every reader.
 */
export default function Clock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(
        `${String(d.getUTCHours()).padStart(2, '0')}:${String(
          d.getUTCMinutes(),
        ).padStart(2, '0')}`,
      );
    };
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="label whitespace-nowrap tabular-nums">
      {time ?? '--:--'} UTC
    </span>
  );
}
