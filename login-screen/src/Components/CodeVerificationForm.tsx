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
    const value = e.target.value;
    if (value.length > 1) return; // Impede que mais de um caractere seja digitado

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Se o valor foi preenchido, foca no próximo input
    if (value && index < codeInputsRef.current.length - 1) {
      codeInputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Detecta o Backspace e se o campo está vazio
    if (e.key === 'Backspace' && code[index] === '') {
      if (index > 0) {
        codeInputsRef.current[index - 1]?.focus();
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData('text');
    if (paste.length === code.length) {
      const newCode = paste.split('');
      setCode(newCode);
      newCode.forEach((char, index) => {
        if (codeInputsRef.current[index]) {
          codeInputsRef.current[index]!.value = char;
        }
      });
      codeInputsRef.current[code.length - 1]?.focus();
    }
    e.preventDefault();
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
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
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
