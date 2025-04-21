// Reusable UI functions and components
import React from 'react';

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
  if (!password) return null;
  return (
    <div style={{ marginTop: '0.5rem', marginBottom: 0 }}>
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '0.2rem' }}>
        {rules.slice(0, 2).map((rule, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', color: rule.valid ? '#16a34a' : '#dc2626', fontSize: '0.97rem' }}>
            {rule.valid ? (
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ marginRight: 6 }}><circle cx="10" cy="10" r="10" fill="#16a34a"/><path d="M6 10.5L9 13.5L14 8.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ marginRight: 6 }}><circle cx="10" cy="10" r="10" fill="#dc2626"/><path d="M7 7L13 13M13 7L7 13" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
            )}
            {rule.label}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {rules.slice(2).map((rule, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', color: rule.valid ? '#16a34a' : '#dc2626', fontSize: '0.97rem' }}>
            {rule.valid ? (
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ marginRight: 6 }}><circle cx="10" cy="10" r="10" fill="#16a34a"/><path d="M6 10.5L9 13.5L14 8.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ marginRight: 6 }}><circle cx="10" cy="10" r="10" fill="#dc2626"/><path d="M7 7L13 13M13 7L7 13" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
            )}
            {rule.label}
          </div>
        ))}
      </div>
    </div>
  );
}

