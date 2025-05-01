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
      label: '8 characters',
      valid: password.length >= 8,
    },
    {
      label: 'lowercase letter',
      valid: /[a-z]/.test(password),
    },
    {
      label: 'uppercase letter',
      valid: /[A-Z]/.test(password),
    },
    {
      label: 'special letter',
      valid: /[^A-Za-z0-9]/.test(password),
    },
  ];
  const [prevValid, setPrevValid] = useState([false, false, false, false]);

  // Reorder rules: missing first, then accepted
  const missingRules = rules.filter(r => !r.valid);
  const acceptedRules = rules.filter(r => r.valid);
  const displayRules = [...missingRules, ...acceptedRules];

  useEffect(() => {
    setPrevValid(rules.map(r => r.valid));
    // eslint-disable-next-line
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
    <div className="pw-rules-list pw-rules-grid">
      {[0, 1].map(rowIdx => (
        <div className="pw-rules-row-flex" key={rowIdx}>
          {[0, 1].map(colIdx => {
            const idx = rowIdx * 2 + colIdx;
            const rule = rules[idx];
            const justChanged = prevValid[idx] !== rule.valid;
            return (
              <div
                key={rule.label}
                className={`pw-rule-row${rule.valid ? ' pw-rule-valid' : ' pw-rule-invalid'}`}
                style={{ flex: 1, minWidth: 0 }}
              >
                <span className={`pw-rule-icon${rule.valid ? ' pw-rule-icon-valid' : ' pw-rule-icon-invalid'}${justChanged ? ' pw-rule-icon-animate' : ''}`}>
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
            );
          })}
        </div>
      ))}
    </div>
  );
}
