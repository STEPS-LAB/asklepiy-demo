'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocale } from '@/contexts';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  Sparkles,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { Button, Skeleton, SkeletonAvatar } from '@/components/ui';
import { cn } from '@/lib/utils';
import {
  fadeInUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
  modalVariants,
} from '@/lib/motion';
import { useUI } from '@/contexts';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestions?: string[];
}

const quickActions = [
  { label: 'Записатися на прийом', labelEn: 'Book appointment', action: 'booking' },
  { label: 'Знайти лікаря', labelEn: 'Find a doctor', action: 'doctors' },
  { label: 'Дізнатися ціни', labelEn: 'View prices', action: 'prices' },
  { label: 'Графік роботи', labelEn: 'Working hours', action: 'hours' },
];

const contextResponses: Record<string, { ua: string; en: string }> = {
  gynecology: {
    ua: 'Бачу, вас цікавить гінекологія. Бажаєте переглянути розклад наших гінекологів?',
    en: 'I see you\'re interested in gynecology. Would you like to see our gynecologists\' schedule?',
  },
  cardiology: {
    ua: 'Помічаю ваш інтерес до кардіології. Наші кардіологи приймають щодня. Показати розклад?',
    en: 'I notice your interest in cardiology. Our cardiologists accept daily. Show schedule?',
  },
  pediatrics: {
    ua: 'Цікавить педіатрія? У нас працюють досвідчені дитячі лікарі. Бажаєте записатися?',
    en: 'Interested in pediatrics? We have experienced pediatricians. Would you like to book?',
  },
  backPain: {
    ua: 'Біль у спині може вимагати консультації вертебролога або МРТ обстеження. Бажаєте записатися?',
    en: 'Back pain may require a vertebrologist consultation or MRI scan. Would you like to book?',
  },
  general: {
    ua: 'Для загальної консультації рекомендую звернутися до сімейного лікаря. Показати вільні часи?',
    en: 'For a general consultation, I recommend seeing a family doctor. Show available times?',
  },
};

/**
 * Loading Skeleton for AI Assistant
 */
function AIAssistantSkeleton() {
  return (
    <div className="h-80 p-4 space-y-4">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className={cn('flex', i % 2 === 0 ? 'justify-end' : 'justify-start')}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className={cn(
            'rounded-sm p-3',
            i % 2 === 0 ? 'bg-medical-surface-100' : 'bg-medical-accent-50'
          )}>
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32 mt-2" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function AIAssistant() {
  const { locale } = useLocale();
  const { isModalOpen } = useUI();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Close chat when modal opens
  useEffect(() => {
    if (isModalOpen && isOpen) {
      setIsOpen(false);
      setIsMinimized(false);
    }
  }, [isModalOpen, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Close chat on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        chatWindowRef.current &&
        !chatWindowRef.current.contains(event.target as Node)
      ) {
        const floatingButton = document.querySelector('[data-chatbot-button]');
        if (floatingButton && !floatingButton.contains(event.target as Node)) {
          setIsOpen(false);
          setIsMinimized(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate initial loading
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsLoading(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Track current page for context awareness
  useEffect(() => {
    const path = window.location.pathname;

    if (path.includes('gynecology') && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(contextResponses.gynecology[locale as 'ua' | 'en']);
      }, 2000);
    } else if (path.includes('cardiology') && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(contextResponses.cardiology[locale as 'ua' | 'en']);
      }, 2000);
    } else if (path.includes('pediatrics') && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(contextResponses.pediatrics[locale as 'ua' | 'en']);
      }, 2000);
    }
  }, []);

  const addBotMessage = useCallback((content: string, suggestions?: string[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content,
          timestamp: new Date().toISOString(),
          suggestions,
        },
      ]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  }, []);

  const handleSend = useCallback(() => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    const lowerInput = inputValue.toLowerCase();
    let response = contextResponses.general[locale as 'ua' | 'en'];

    if (lowerInput.includes('гінеко') || lowerInput.includes('gynecol')) {
      response = contextResponses.gynecology[locale as 'ua' | 'en'];
    } else if (lowerInput.includes('кардіо') || lowerInput.includes('cardio')) {
      response = contextResponses.cardiology[locale as 'ua' | 'en'];
    } else if (lowerInput.includes('педіатр') || lowerInput.includes('pediatr')) {
      response = contextResponses.pediatrics[locale as 'ua' | 'en'];
    } else if (lowerInput.includes('спин') || lowerInput.includes('back') || lowerInput.includes('біль')) {
      response = contextResponses.backPain[locale as 'ua' | 'en'];
    } else if (lowerInput.includes('запис') || lowerInput.includes('book')) {
      response = locale === 'ua'
        ? 'З радістю допоможу записатися на прийом. Оберіть послугу або лікаря.'
        : 'I\'d be happy to help you book an appointment. Choose a service or doctor.';
    } else if (lowerInput.includes('цін') || lowerInput.includes('price')) {
      response = locale === 'ua'
        ? 'Наші ціни доступні на сторінці послуг. Бажаєте переглянути прайс?'
        : 'Our prices are available on the services page. Would you like to view the price list?';
    }

    addBotMessage(response, ['Записатися', 'Переглянути послуги', 'Знайти лікаря']);
  }, [inputValue, locale, addBotMessage]);

  const handleQuickAction = useCallback((action: string) => {
    const actionMessages: Record<string, { ua: string; en: string }> = {
      booking: { ua: 'Хочу записатися на прийом', en: 'I want to book an appointment' },
      doctors: { ua: 'Показати лікарів', en: 'Show doctors' },
      prices: { ua: 'Які у вас ціни?', en: 'What are your prices?' },
      hours: { ua: 'Який графік роботи?', en: 'What are your working hours?' },
    };

    setInputValue(actionMessages[action][locale as 'ua' | 'en']);
    setTimeout(() => handleSend(), 100);
  }, [locale, handleSend]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
    setIsLoading(true);

    if (!isOpen && messages.length === 0) {
      const greeting = locale === 'ua'
        ? 'Вітаю! Я Asklepiy AI. Я знаю все про нашу клініку. Чим можу допомогти?'
        : 'Hello! I am Asklepiy AI. I know everything about our clinic. How can I help you today?';
      setTimeout(() => {
        addBotMessage(greeting, quickActions.map((a) => locale === 'ua' ? a.label : a.labelEn));
      }, 1500);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className={cn('fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-toast', isModalOpen && 'hidden')}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 400, damping: 20 }}
        data-chatbot-button
      >
        <motion.button
          onClick={toggleOpen}
          className={cn(
            'w-14 h-14 rounded-full shadow-medical-glow-lg',
            'bg-gradient-to-br from-medical-accent-600 to-medical-accent-500',
            'hover:from-medical-accent-500 hover:to-medical-accent-400',
            isOpen && 'from-medical-primary-900 to-medical-primary-800 hover:from-medical-primary-800 hover:to-medical-primary-700',
            'transition-all duration-500',
            'flex items-center justify-center'
          )}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 500 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 500 }}
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </motion.button>

        {!isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-medical-status-error rounded-full border-2 border-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2, type: 'spring', stiffness: 500 }}
          />
        )}
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatWindowRef}
            className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 w-[calc(100vw-2rem)] sm:w-full max-w-md z-toast"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="bg-white rounded-sm shadow-medical-xl overflow-hidden backdrop-blur-xl">
              {/* Header */}
              <motion.div
                className="bg-gradient-to-br from-medical-primary-900 to-medical-primary-800 text-white px-5 py-4 flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-11 h-11 bg-gradient-to-br from-medical-accent-600 to-medical-accent-500 rounded-full flex items-center justify-center shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, delay: 0.2 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Bot className="w-6 h-6" />
                  </motion.div>
                  <div>
                    <h3 className="font-medium text-base">Asklepiy AI</h3>
                    <p className="text-xs text-medical-surface-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-medical-status-success rounded-full animate-pulse" />
                      {locale === 'ua' ? 'Онлайн помічник' : 'Online assistant'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <motion.button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-2 hover:bg-white/10 rounded-sm transition-colors flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                  </motion.button>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-sm transition-colors flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>

              {!isMinimized && (
                <>
                  {/* Messages */}
                  <div className="h-80 overflow-y-auto p-4 space-y-6 bg-medical-surface-50/50">
                    {isLoading ? (
                      <AIAssistantSkeleton />
                    ) : (
                      <motion.div
                        variants={staggerContainerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {messages.map((message, index) => (
                          <motion.div
                            key={message.id}
                            className={cn('flex mb-6', message.role === 'user' ? 'justify-end' : 'justify-start', 'last:mb-0')}
                            variants={staggerItemVariants}
                            custom={index}
                          >
                            <motion.div
                              className={cn(
                                'max-w-[80%] px-4 py-3 rounded-sm shadow-sm',
                                message.role === 'user'
                                  ? 'bg-gradient-to-br from-medical-accent-600 to-medical-accent-500 text-white'
                                  : 'bg-white text-medical-text-primary border border-medical-surface-200'
                              )}
                              initial={{ opacity: 0, scale: 0.9, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                            >
                              <p className="text-sm leading-relaxed">{message.content}</p>
                              {message.suggestions && (
                                <motion.div
                                  className="flex flex-wrap gap-2 mt-3"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.2 }}
                                >
                                  {message.suggestions.map((suggestion, i) => (
                                    <motion.button
                                      key={i}
                                      onClick={() => setInputValue(suggestion)}
                                      className="text-xs px-3 py-1.5 bg-medical-accent-50 hover:bg-medical-accent-100 text-medical-accent-700 rounded-full transition-all"
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      {suggestion}
                                    </motion.button>
                                  ))}
                                </motion.div>
                              )}
                            </motion.div>
                          </motion.div>
                        ))}

                        {isTyping && (
                          <motion.div
                            className="flex justify-start"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            <div className="bg-white border border-medical-surface-200 px-4 py-3 rounded-sm shadow-sm">
                              <div className="flex gap-1.5">
                                <motion.div
                                  className="w-2 h-2 bg-medical-accent-500 rounded-full"
                                  animate={{ y: [0, -6, 0] }}
                                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                />
                                <motion.div
                                  className="w-2 h-2 bg-medical-accent-500 rounded-full"
                                  animate={{ y: [0, -6, 0] }}
                                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                />
                                <motion.div
                                  className="w-2 h-2 bg-medical-accent-500 rounded-full"
                                  animate={{ y: [0, -6, 0] }}
                                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}

                        <div ref={messagesEndRef} />
                      </motion.div>
                    )}
                  </div>

                  {/* Quick Actions */}
                  {!isLoading && messages.length === 0 && (
                    <motion.div className="px-4 pb-4" variants={fadeInUpVariants} initial="hidden" animate="visible">
                      <div className="flex flex-wrap gap-2">
                        {quickActions.map((action, index) => (
                          <motion.button
                            key={action.action}
                            onClick={() => handleQuickAction(action.action)}
                            className="text-xs px-3 py-2 bg-gradient-to-br from-medical-accent-50 to-medical-accent-100 text-medical-accent-700 hover:from-medical-accent-100 hover:to-medical-accent-200 rounded-full transition-all flex items-center gap-1.5 shadow-sm"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            {locale === 'ua' ? action.label : action.labelEn}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Input */}
                  <motion.div
                    className="border-t border-medical-surface-200 p-4 bg-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={locale === 'ua' ? 'Запитайте мене про що завгодно...' : 'Ask me anything...'}
                        className="flex-1 px-4 py-3 bg-medical-surface-100 border-0 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-medical-accent-300 transition-all"
                      />
                      <Button
                        onClick={handleSend}
                        size="sm"
                        className="w-11 h-11 p-0 rounded-full flex items-center justify-center"
                        disabled={!inputValue.trim() || isLoading}
                      >
                        <motion.div initial={{ scale: 1 }} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                          <Send className="w-5 h-5" />
                        </motion.div>
                      </Button>
                    </div>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
