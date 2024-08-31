import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';

interface CodeVerificationFormProps {
  email: string;
  onSubmit: (code: string[]) => Promise<void>;
}

const CodeVerificationForm: React.FC<CodeVerificationFormProps> = ({ email, onSubmit }) => {
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const codeInputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.replace(/\D/, '');
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < codeInputsRef.current.length - 1) {
      codeInputsRef.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (code.join('').length < 6) {
      setError('Please enter the complete code.');
      return;
    }

    try {
      await onSubmit(code);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2 className="form-title">Code Verification</h2>
      <p className="form-text">Enter the code sent to {email}</p>
      <div className="code-inputs">
        {code.map((value, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={value}
            onChange={(e) => handleCodeChange(e, index)}
            ref={(el) => (codeInputsRef.current[index] = el)}
            required
          />
        ))}
      </div>
      {error && <span className="error-message">{error}</span>}
      <button type="submit" className="submit-button">
        Verify Code
      </button>
    </form>
  );
};

export default CodeVerificationForm;
