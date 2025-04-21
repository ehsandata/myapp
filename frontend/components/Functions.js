// Reusable UI functions and components
import React from 'react';

export function isPasswordValid(password) {
  return (
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}

import { useState, useEffect } from 'react';

export function PasswordRules({ password }) {
  const rules = [
    {
      label: 'At least 8 characters',
      valid: password.length >= 8,
    },
    {
      label: 'Contains lowercase letter',
      valid: /[a-z]/.test(password),
    },
    {
      label: 'Contains uppercase letter',
      valid: /[A-Z]/.test(password),
    },
    {
      label: 'Contains special character',
      valid: /[^A-Za-z0-9]/.test(password),
    },
  ];
  const [currentRuleIdx, setCurrentRuleIdx] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!password) {
      setCurrentRuleIdx(0);
      setVisible(false);
      return;
    }
    setVisible(true);
    setCurrentRuleIdx(0);
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentRuleIdx(idx => {
          if (idx < rules.length - 1) {
            setVisible(true);
            return idx + 1;
          } else {
            setVisible(false);
            return 0;
          }
        });
      }, 400); // fade out duration
    }, 2000);
    return () => clearInterval(interval);
  }, [password]);

  if (!password) return null;

  const rule = rules[currentRuleIdx];
  return (
    <div style={{ marginTop: '0.5rem', minHeight: '1.5rem', transition: 'min-height 0.2s' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          color: rule.valid ? '#16a34a' : '#dc2626',
          fontSize: '0.89rem',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.4s',
          minHeight: '1.2em',
        }}
      >
        {rule.valid ? (
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ marginRight: 6 }}><circle cx="10" cy="10" r="10" fill="#16a34a"/><path d="M6 10.5L9 13.5L14 8.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ marginRight: 6 }}><circle cx="10" cy="10" r="10" fill="#dc2626"/><path d="M7 7L13 13M13 7L7 13" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
        )}
        {rule.label}
      </div>
    </div>
  );
}

