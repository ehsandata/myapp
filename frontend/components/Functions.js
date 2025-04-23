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

import '../styles/globals.css';

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

  // Reorder rules: missing first, then accepted
  const missingRules = rules.filter(r => !r.valid);
  const acceptedRules = rules.filter(r => r.valid);
  const displayRules = [...missingRules, ...acceptedRules];

  useEffect(() => {
    if (!password) {
      setCurrentVisible(0);
      return;
    }
    // Reveal rules one by one as user types
    let idx = 1;
    setCurrentVisible(idx);
    const interval = setInterval(() => {
      idx++;
      if (idx <= rules.length) {
        setCurrentVisible(idx);
      } else {
        clearInterval(interval);
      }
    }, 350);
    return () => clearInterval(interval);
  }, [password]);

  if (!password) return null;

  const allValid = rules.every(rule => rule.valid);
  if (allValid) {
    return (
      <div className="pw-rules-done">
        <svg className="pw-rule-icon" width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#16a34a"/><path d="M6 10.5L9 13.5L14 8.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        All Password Rules Done.
      </div>
    );
  }

  return (
    <div className="pw-rules-list">
      {rules.slice(0, currentVisible).map((rule, idx) => (
        <div
          key={rule.label}
          className={`pw-rule-row${rule.valid ? ' pw-rule-valid' : ' pw-rule-invalid'}`}
        >
          <span className={`pw-rule-icon${rule.valid ? ' pw-rule-icon-valid' : ' pw-rule-icon-invalid'}`}>
            {rule.valid ? (
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="10" fill="#16a34a"/>
                <path d="M6 10.5L9 13.5L14 8.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#dc2626"/><path d="M7 7L13 13M13 7L7 13" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
            )}
          </span>
          <span className="pw-rule-label">{rule.label}</span>
        </div>
      ))}
    </div>
  );
}
