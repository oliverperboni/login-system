import React, { useState, FormEvent } from 'react';

interface EmailFormProps {
  onSubmit: (email: string) => Promise<void>;
}

const EmailForm: React.FC<EmailFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await onSubmit(email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2 className="form-title">Reset Password</h2>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {error && <span className="error-message">{error}</span>}
      </div>
      <button type="submit" className="submit-button">
        Verify Email
      </button>
    </form>
  );
};

export default EmailForm;
