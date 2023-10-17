import { Text } from "@react-three/drei";
import { useEffect, useState, useRef, useCallback } from "react";

const MAX_LOGS = 10;
const LOG_UPDATE_INTERVAL = 1000;

export function LogDisplay() {
  const [logs, setLogs] = useState<string[]>([]);
  const logBuffer = useRef<string[]>([]);
  const originalLogRef = useRef<typeof console.log | null>(null);

  const handleLog = useCallback((msg: string) => {
    logBuffer.current.push(msg);
    if (logBuffer.current.length > MAX_LOGS) {
      logBuffer.current.shift();
    }
  }, []);

  useEffect(() => {
    originalLogRef.current = console.log;
    console.log = (...args) => {
      handleLog(args.map((arg) => JSON.stringify(arg, null, 2)).join(" "));
      if (originalLogRef.current) {
        originalLogRef.current(...args);
      }
    };

    const intervalId = setInterval(() => {
      if (logBuffer.current.length > 0) {
        setLogs([...logBuffer.current]);
        logBuffer.current = [];
      }
    }, LOG_UPDATE_INTERVAL);

    return () => {
      console.log = originalLogRef.current || console.log;
      clearInterval(intervalId);
    };
  }, [handleLog]);

  return (
    <Text position={[0, 1, -2]} fontSize={0.08}>
      {logs.join("\n")}
    </Text>
  );
}
