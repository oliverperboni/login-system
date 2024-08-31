import React, { useState, FormEvent } from 'react';

interface NewPasswordFormProps {
  onSubmit: (password: string) => Promise<void>;
}

const NewPasswordForm: React.FC<NewPasswordFormProps> = ({ onSubmit }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 6) {
      setError('The password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await onSubmit(newPassword);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2 className="form-title">New Password</h2>
      <div className="form-group">
        <label htmlFor="new-password">New Password:</label>
        <input
          type="password"
          id="new-password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input
          type="password"
          id="confirm-password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      {error && <span className="error-message">{error}</span>}
      <button type="submit" className="submit-button">
        Reset Password
      </button>
    </form>
  );
};

export default NewPasswordForm;
