import { useEffect, useRef } from "react";
import { createScrollReveal } from "@/lib/animations";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  animationClass?: string;
  once?: boolean;
}

/**
 * Custom hook for scroll-based reveal animations
 * Optimized for performance using Intersection Observer
 */
export const useScrollReveal = (options: UseScrollRevealOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    animationClass = "animate-fade-in-up",
    once = true,
  } = options;

  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            entry.target.classList.remove(animationClass);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(elementRef.current);

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, rootMargin, animationClass, once]);

  return elementRef;
};

/**
 * Hook for revealing multiple elements on scroll
 */
export const useScrollRevealMultiple = (
  elements: HTMLElement[],
  options: UseScrollRevealOptions = {}
) => {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    animationClass = "animate-fade-in-up",
  } = options;

  useEffect(() => {
    if (elements.length === 0) return;

    const cleanup = createScrollReveal(
      elements as NodeListOf<Element>,
      {
        threshold,
        rootMargin,
        animationClass,
      }
    );

    return cleanup;
  }, [elements, threshold, rootMargin, animationClass]);
};

