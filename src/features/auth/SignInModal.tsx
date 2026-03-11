'use client';

import { useState } from 'react';
import { useLocale, useAuth } from '@/contexts';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Chrome, Key, Shield, Check } from 'lucide-react';
import { Button, Input, Modal } from '@/components/ui';
import { cn, isValidEmail, isValidPhoneUA } from '@/lib/utils';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMethod = 'email' | 'phone' | 'google';
type AuthStep = 'method' | 'credentials' | 'verification' | 'success';

export function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const { locale } = useLocale();
  const { signIn } = useAuth();
  const [authMethod, setAuthMethod] = useState<AuthMethod | null>(null);
  const [currentStep, setCurrentStep] = useState<AuthStep>('method');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleMethodSelect = (method: AuthMethod) => {
    setAuthMethod(method);
    if (method === 'google') {
      handleGoogleSignIn();
    } else {
      setCurrentStep('credentials');
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await signIn({});
    setIsLoading(false);
    setCurrentStep('success');
    setTimeout(() => {
      onClose();
      setCurrentStep('method');
    }, 2000);
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (authMethod === 'email' && !isValidEmail(email)) {
      setError(locale === 'ua' ? 'Введіть коректний email' : 'Please enter a valid email');
      return;
    }

    if (authMethod === 'phone' && !isValidPhoneUA(phone.replace(/\D/g, ''))) {
      setError(locale === 'ua' ? 'Введіть коректний номер телефону' : 'Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setCurrentStep('verification');
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (verificationCode.length !== 6) {
      setError(locale === 'ua' ? 'Код має містити 6 цифр' : 'Code must be 6 digits');
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await signIn(authMethod === 'email' ? { email } : { phone });
    setIsLoading(false);
    setCurrentStep('success');
    setTimeout(() => {
      onClose();
      setCurrentStep('method');
      setAuthMethod(null);
      setEmail('');
      setPhone('');
      setPassword('');
      setVerificationCode('');
    }, 2000);
  };

  const handleBack = () => {
    if (currentStep === 'verification') {
      setCurrentStep('credentials');
    } else if (currentStep === 'credentials') {
      setCurrentStep('method');
      setAuthMethod(null);
    }
  };

  const renderMethodSelection = () => (
    <div className="space-y-3">
      <p className="text-center text-medical-text-secondary mb-6">
        {locale === 'ua'
          ? 'Оберіть зручний спосіб входу'
          : 'Choose a convenient sign-in method'}
      </p>

      <Button
        variant="outline"
        className="w-full justify-start py-4"
        onClick={() => handleMethodSelect('email')}
        leftIcon={<Mail className="w-5 h-5" />}
      >
        {locale === 'ua' ? 'Продовжити з Email' : 'Continue with Email'}
      </Button>

      <Button
        variant="outline"
        className="w-full justify-start py-4"
        onClick={() => handleMethodSelect('phone')}
        leftIcon={<Phone className="w-5 h-5" />}
      >
        {locale === 'ua' ? 'Продовжити з телефоном' : 'Continue with Phone'}
      </Button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-medical-surface-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-medical-text-tertiary">
            {locale === 'ua' ? 'або' : 'or'}
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full justify-start py-4"
        onClick={() => handleMethodSelect('google')}
        leftIcon={<Chrome className="w-5 h-5" />}
        isLoading={isLoading && authMethod === 'google'}
      >
        {locale === 'ua' ? 'Продовжити з Google' : 'Continue with Google'}
      </Button>

      <p className="text-xs text-medical-text-tertiary text-center mt-6">
        {locale === 'ua'
          ? 'Продовжуючи, ви погоджуєтесь з умовами використання'
          : 'By continuing, you agree to our terms of service'}
      </p>
    </div>
  );

  const renderCredentialsForm = () => (
    <form onSubmit={handleCredentialsSubmit} className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-medical-accent-100 rounded-full flex items-center justify-center mx-auto mb-3">
          {authMethod === 'email' ? (
            <Mail className="w-6 h-6 text-medical-accent-600" />
          ) : (
            <Phone className="w-6 h-6 text-medical-accent-600" />
          )}
        </div>
        <h3 className="text-lg font-medium text-medical-primary-900">
          {authMethod === 'email'
            ? locale === 'ua'
              ? 'Введіть ваш Email'
              : 'Enter your email'
            : locale === 'ua'
            ? 'Введіть номер телефону'
            : 'Enter phone number'}
        </h3>
      </div>

      {authMethod === 'email' ? (
        <Input
          type="email"
          label={locale === 'ua' ? 'Email' : 'Email'}
          placeholder={locale === 'ua' ? 'your@email.com' : 'your@email.com'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
        />
      ) : (
        <Input
          type="tel"
          label={locale === 'ua' ? 'Телефон' : 'Phone'}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={error}
          placeholder={locale === 'ua' ? 'Ваш номер телефону' : 'Your phone number'}
        />
      )}

      {authMethod === 'email' && (
        <Input
          type="password"
          label={locale === 'ua' ? 'Пароль' : 'Password'}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      )}

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button type="button" variant="ghost" onClick={handleBack} className="w-full">
          {locale === 'ua' ? 'Назад' : 'Back'}
        </Button>
        <Button type="submit" isLoading={isLoading} className="w-full">
          {locale === 'ua' ? 'Продовжити' : 'Continue'}
        </Button>
      </div>
    </form>
  );

  const renderVerification = () => (
    <form onSubmit={handleVerificationSubmit} className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-medical-accent-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <Key className="w-6 h-6 text-medical-accent-600" />
        </div>
        <h3 className="text-lg font-medium text-medical-primary-900 mb-2">
          {locale === 'ua' ? 'Введіть код підтвердження' : 'Enter verification code'}
        </h3>
        <p className="text-sm text-medical-text-secondary">
          {locale === 'ua'
            ? `Код відправлено на ${authMethod === 'email' ? email : phone}`
            : `Code sent to ${authMethod === 'email' ? email : phone}`}
        </p>
      </div>

      <div className="flex justify-center gap-2 mb-4">
        {[...Array(6)].map((_, i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            value={verificationCode[i] || ''}
            onChange={(e) => {
              const value = e.target.value;
              if (value && i < 5) {
                const nextInput = e.currentTarget.nextElementSibling as HTMLInputElement;
                nextInput?.focus();
              }
              setVerificationCode(
                verificationCode.slice(0, i) + value + verificationCode.slice(i + 1)
              );
            }}
            onKeyDown={(e) => {
              if (e.key === 'Backspace' && !verificationCode[i] && i > 0) {
                const prevInput = e.currentTarget.previousElementSibling as HTMLInputElement;
                prevInput?.focus();
              }
            }}
            className={cn(
              'w-10 h-12 text-center text-xl font-medium',
              'border-2 border-medical-surface-300 rounded-sm',
              'focus:border-medical-accent-600 focus:outline-none',
              'bg-medical-surface-50'
            )}
          />
        ))}
      </div>

      {error && <p className="text-sm text-medical-status-error text-center">{error}</p>}

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button type="button" variant="ghost" onClick={handleBack} className="w-full">
          {locale === 'ua' ? 'Назад' : 'Back'}
        </Button>
        <Button type="submit" isLoading={isLoading} className="w-full">
          {locale === 'ua' ? 'Підтвердити' : 'Verify'}
        </Button>
      </div>

      <button
        type="button"
        className="w-full text-sm text-medical-accent-600 hover:text-medical-accent-700 transition-colors"
      >
        {locale === 'ua'
          ? 'Надіслати код ще раз'
          : 'Resend code'}
      </button>
    </form>
  );

  const renderSuccess = () => (
    <div className="text-center py-8">
      <motion.div
        className="w-16 h-16 bg-medical-status-success rounded-full flex items-center justify-center mx-auto mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 400 }}
      >
        <Check className="w-8 h-8 text-white" />
      </motion.div>
      <h3 className="text-xl font-medium text-medical-primary-900 mb-2">
        {locale === 'ua' ? 'Успішно!' : 'Success!'}
      </h3>
      <p className="text-medical-text-secondary">
        {locale === 'ua'
          ? 'Ви успішно увійшли в систему'
          : 'You have successfully signed in'}
      </p>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={locale === 'ua' ? 'Вхід в кабінет' : 'Sign in to dashboard'}
    >
      <div className="max-w-md mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 'method' && renderMethodSelection()}
            {currentStep === 'credentials' && renderCredentialsForm()}
            {currentStep === 'verification' && renderVerification()}
            {currentStep === 'success' && renderSuccess()}
          </motion.div>
        </AnimatePresence>
      </div>
    </Modal>
  );
}
