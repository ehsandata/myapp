import React, { useState, useRef, useEffect } from 'react';

const SUGGESTIONS = [
  '123456-7890',
  '987654-3210',
  '456789-1234',
  '654321-9876',
];

export default function CprDropdown({ value, onChange, disabled }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [filtered, setFiltered] = useState(SUGGESTIONS);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleInput(e) {
    onChange(e);
    const val = e.target.value;
    setFiltered(
      SUGGESTIONS.filter(s => s.includes(val))
    );
    setShowDropdown(true);
  }

  function handleSelect(s) {
    onChange({ target: { value: s } });
    setShowDropdown(false);
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input
        ref={inputRef}
        type="text"
        placeholder="CPR/National Number"
        autoComplete="off"
        value={value}
        onChange={handleInput}
        onFocus={() => setShowDropdown(true)}
        disabled={disabled}
        className="form-input"
        style={{ maxWidth: 300 }}
        required
      />
      {showDropdown && filtered.length > 0 && (
        <div
          ref={dropdownRef}
          style={{
            position: 'absolute',
            left: 0,
            top: '100%',
            width: '100%',
            background: 'rgba(36,37,46,0.98)',
            border: '1px solid #23272f',
            borderRadius: '0.6rem',
            boxShadow: '0 2px 8px 0 rgba(31, 38, 135, 0.18)',
            zIndex: 30,
            padding: '0.5rem 0',
            marginTop: 2,
          }}
        >
          {filtered.map(s => (
            <div
              key={s}
              onClick={() => handleSelect(s)}
              style={{
                padding: '0.6rem 1rem',
                cursor: 'pointer',
                color: '#fff',
                background: value === s ? 'rgba(99,102,241,0.15)' : 'none',
                fontWeight: value === s ? 600 : 400,
              }}
              onMouseDown={e => e.preventDefault()}
            >
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
