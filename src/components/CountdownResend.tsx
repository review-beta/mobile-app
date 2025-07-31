import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

const CountdownResend = () => {
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    if (!canResend) return;
    setTimer(60);
    setCanResend(false);
    // Trigger resend logic
  };

  return canResend ? (
    <TouchableOpacity onPress={handleResend}>
      <Text style={{ marginTop: 10, color: '#007bff' }}>Resend Code</Text>
    </TouchableOpacity>
  ) : (
    <Text style={{ marginTop: 10, color: '#888' }}>Resend in {timer}s</Text>
  );
};

export default CountdownResend;