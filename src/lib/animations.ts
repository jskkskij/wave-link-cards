/**
 * Vanilla JavaScript animation utilities for paper-to-digital transformations
 * Optimized for performance using GPU-accelerated properties
 */

/**
 * Creates a paper-to-digital reveal animation effect
 * Uses transform and opacity for optimal performance
 */
export const createPaperToDigitalReveal = (
  element: HTMLElement,
  options: {
    duration?: number;
    delay?: number;
    easing?: string;
  } = {}
): void => {
  const { duration = 1200, delay = 0, easing = 'cubic-bezier(0.4, 0, 0.2, 1)' } = options;

  // Set initial state
  element.style.willChange = 'transform, opacity, filter';
  element.style.transform = 'scaleY(0.1) scaleX(0.95) rotateX(90deg)';
  element.style.opacity = '0';
  element.style.filter = 'blur(4px)';
  element.style.transformOrigin = 'center center';

  // Force reflow
  void element.offsetHeight;

  // Animate to final state
  requestAnimationFrame(() => {
    element.style.transition = `transform ${duration}ms ${easing}, opacity ${duration}ms ${easing}, filter ${duration}ms ${easing}`;
    
    setTimeout(() => {
      element.style.transform = 'scaleY(1) scaleX(1) rotateX(0deg)';
      element.style.opacity = '1';
      element.style.filter = 'blur(0px)';

      // Clean up will-change after animation
      setTimeout(() => {
        element.style.willChange = 'auto';
      }, duration);
    }, delay);
  });
};

/**
 * Creates a scan-line effect (like digitizing a document)
 */
export const createScanLineEffect = (
  container: HTMLElement,
  options: {
    color?: string;
    duration?: number;
    height?: number;
  } = {}
): (() => void) => {
  const { color = 'rgba(59, 130, 246, 0.5)', duration = 2000, height = 4 } = options;

  const scanLine = document.createElement('div');
  scanLine.style.position = 'absolute';
  scanLine.style.top = '0';
  scanLine.style.left = '0';
  scanLine.style.right = '0';
  scanLine.style.height = `${height}px`;
  scanLine.style.background = `linear-gradient(to bottom, transparent, ${color}, transparent)`;
  scanLine.style.transform = 'translateY(-100%)';
  scanLine.style.transition = `transform ${duration}ms ease-in-out`;
  scanLine.style.pointerEvents = 'none';
  scanLine.style.zIndex = '1000';
  scanLine.setAttribute('aria-hidden', 'true');

  container.style.position = 'relative';
  container.appendChild(scanLine);

  // Force reflow
  void scanLine.offsetHeight;

  requestAnimationFrame(() => {
    scanLine.style.transform = 'translateY(100vh)';
  });

  // Cleanup function
  return () => {
    setTimeout(() => {
      if (scanLine.parentNode) {
        scanLine.parentNode.removeChild(scanLine);
      }
    }, duration);
  };
};

/**
 * Creates a digital reveal animation (clip-path based)
 */
export const createDigitalReveal = (
  element: HTMLElement,
  options: {
    direction?: 'left' | 'right' | 'top' | 'bottom';
    duration?: number;
    delay?: number;
  } = {}
): void => {
  const { direction = 'left', duration = 1500, delay = 0 } = options;

  const clipPathMap = {
    left: 'inset(0 100% 0 0)',
    right: 'inset(0 0 0 100%)',
    top: 'inset(100% 0 0 0)',
    bottom: 'inset(0 0 100% 0)',
  };

  element.style.willChange = 'clip-path, opacity';
  element.style.clipPath = clipPathMap[direction];
  element.style.opacity = '0';

  void element.offsetHeight;

  requestAnimationFrame(() => {
    element.style.transition = `clip-path ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;

    setTimeout(() => {
      element.style.clipPath = 'inset(0 0% 0 0)';
      element.style.opacity = '1';

      setTimeout(() => {
        element.style.willChange = 'auto';
      }, duration);
    }, delay);
  });
};

/**
 * Intersection Observer utility for scroll-based animations
 * Optimized for performance
 */
export const createScrollReveal = (
  elements: NodeListOf<Element> | Element[],
  options: {
    threshold?: number;
    rootMargin?: string;
    animationClass?: string;
  } = {}
): (() => void) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    animationClass = 'animate-fade-in-up',
  } = options;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold,
      rootMargin,
    }
  );

  elements.forEach((el) => {
    observer.observe(el);
  });

  // Cleanup function
  return () => {
    elements.forEach((el) => {
      observer.unobserve(el);
    });
  };
};

