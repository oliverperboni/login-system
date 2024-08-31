import React, { useState } from 'react';
import '../Style/PasswordReset.css';
import EmailForm from '../Components/EmailForm';
import CodeVerificationForm from '../Components/CodeVerificationForm';
import NewPasswordForm from '../Components/NewPasswordForm';
import SuccessMessage from '../Components/SuccessMessage';

const PasswordReset: React.FC = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState<string[]>(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');

  // Step 1: Handle email submission
  const handleEmailSubmit = async (submittedEmail: string) => {
    // Simulate API call
    const isValid = await simulateEmailValidation(submittedEmail);
    if (isValid) {
      setEmail(submittedEmail);
      setStep(2);
    } else {
      throw new Error('Email not found.');
    }
  };

  // Step 2: Handle code verification
  const handleCodeSubmit = async (submittedCode: string[]) => {
    // Simulate API call
    const isValid = await simulateCodeValidation(submittedCode.join(''));
    if (isValid) {
      setVerificationCode(submittedCode);
      setStep(3);
    } else {
      throw new Error('Invalid verification code.');
    }
  };

  // Step 3: Handle password reset
  const handlePasswordSubmit = async (submittedPassword: string) => {
    // Simulate API call
    const isSuccess = await simulatePasswordReset(submittedPassword);
    if (isSuccess) {
      setNewPassword(submittedPassword);
      setStep(4);
    } else {
      throw new Error('Password reset failed.');
    }
  };

  return (
    <div className="password-reset-container">
      <div className="form-container">
        {step === 1 && <EmailForm onSubmit={handleEmailSubmit} />}
        {step === 2 && <CodeVerificationForm email={email} onSubmit={handleCodeSubmit} />}
        {step === 3 && <NewPasswordForm onSubmit={handlePasswordSubmit} />}
        {step === 4 && <SuccessMessage />}
      </div>
    </div>
  );
};

// Simulated API calls
const simulateEmailValidation = async (email: string): Promise<boolean> => {
  return new Promise((resolve) => setTimeout(() => resolve(email === 'user@example.com'), 1000));
};

const simulateCodeValidation = async (code: string): Promise<boolean> => {
  return new Promise((resolve) => setTimeout(() => resolve(code === '123456'), 1000));
};

const simulatePasswordReset = async (password: string): Promise<boolean> => {
  return new Promise((resolve) => setTimeout(() => resolve(true), 1000));
};

export default PasswordReset;
