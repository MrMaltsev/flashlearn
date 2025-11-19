import React, { useState, useEffect, useRef } from 'react';
import '../styles/OnboardingTour.css';

const OnboardingTour = ({ steps, onComplete, isActive }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const overlayRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (!isActive || steps.length === 0) return;

    const updatePosition = async () => {
      const step = steps[currentStep];
      if (!step) return;

      const element = document.querySelector(step.target);
      if (!element) {
        // Если элемент не найден, пропускаем этот шаг
        setTimeout(() => {
          if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
          } else {
            onComplete();
          }
        }, 100);
        return;
      }

      // Проверяем, виден ли элемент
      const elementRect = element.getBoundingClientRect();
      if (elementRect.width === 0 || elementRect.height === 0) {
        // Элемент скрыт, пропускаем
        setTimeout(() => {
          if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
          } else {
            onComplete();
          }
        }, 100);
        return;
      }

      // Прокручиваем к элементу, если он не полностью виден
      const isElementVisible = 
        elementRect.top >= 0 &&
        elementRect.left >= 0 &&
        elementRect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        elementRect.right <= (window.innerWidth || document.documentElement.clientWidth);

      if (!isElementVisible) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'nearest'
        });
        // Ждём завершения прокрутки
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      const rect = element.getBoundingClientRect();
      const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;

      setPosition({
        top: rect.top + scrollY,
        left: rect.left + scrollX,
        width: rect.width,
        height: rect.height,
      });

      // Вычисляем позицию тултипа
      const tooltipWidth = 320;
      const tooltipHeight = 180;
      const padding = 20;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let tooltipTop = rect.top + scrollY;
      let tooltipLeft = rect.left + scrollX;

      // Позиционируем тултип справа от элемента, если есть место
      if (rect.right + tooltipWidth + padding < viewportWidth) {
        tooltipLeft = rect.right + scrollX + padding;
        tooltipTop = rect.top + scrollY;
      } 
      // Иначе слева
      else if (rect.left - tooltipWidth - padding > 0) {
        tooltipLeft = rect.left + scrollX - tooltipWidth - padding;
        tooltipTop = rect.top + scrollY;
      }
      // Иначе снизу
      else if (rect.bottom + tooltipHeight + padding < viewportHeight + scrollY) {
        tooltipLeft = Math.max(padding, Math.min(rect.left + scrollX, viewportWidth - tooltipWidth - padding));
        tooltipTop = rect.bottom + scrollY + padding;
      }
      // Иначе сверху
      else {
        tooltipLeft = Math.max(padding, Math.min(rect.left + scrollX, viewportWidth - tooltipWidth - padding));
        tooltipTop = Math.max(padding, rect.top + scrollY - tooltipHeight - padding);
      }

      setTooltipPosition({ top: tooltipTop, left: tooltipLeft });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [currentStep, steps, isActive]);

  if (!isActive || steps.length === 0 || currentStep >= steps.length) {
    return null;
  }

  const step = steps[currentStep];
  if (!step) return null;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <>
      {/* Затемнение фона */}
      <div 
        ref={overlayRef}
        className="onboarding-overlay"
        onClick={handleNext}
      />
      
      {/* Подсветка элемента */}
      <div
        className="onboarding-highlight"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          width: `${position.width}px`,
          height: `${position.height}px`,
        }}
      />

      {/* Тултип с инструкцией */}
      <div
        ref={tooltipRef}
        className="onboarding-tooltip"
        style={{
          top: `${tooltipPosition.top}px`,
          left: `${tooltipPosition.left}px`,
        }}
      >
        <div className="onboarding-tooltip-content">
          <p className="onboarding-tooltip-text">{step.content}</p>
          <div className="onboarding-tooltip-footer">
            <span className="onboarding-step-indicator">
              {currentStep + 1} / {steps.length}
            </span>
            <div className="onboarding-tooltip-actions">
              {currentStep < steps.length - 1 && (
                <button 
                  className="onboarding-skip-btn"
                  onClick={handleSkip}
                >
                  Пропустить
                </button>
              )}
              <button 
                className="onboarding-ok-btn"
                onClick={handleNext}
              >
                Ок
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingTour;

