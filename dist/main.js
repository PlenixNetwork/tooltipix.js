/**
 * Tooltipix.js - Lightweight Tooltip Library
 * @version 1.0.0
 * @author Plenix Network
 * @license MIT
 *
 * Usage:
 * Global script: <script src="tooltipix.js"></script> then use window.tooltipix.init()
 * ES Module: import tooltipix from './tooltipix.js' then use tooltipix.init()
 * CommonJS: const tooltipix = require('./tooltipix.js') then use tooltipix.init()
 *
 * Add tooltips using data attributes:
 * <button data-tooltip="Hello!" data-trigger="hover,focus" data-position="top">Hover me</button>
 */

(function (root, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else {
    root.tooltipix = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  const style = `
    .tooltipix {
      position: absolute;
      background: #333;
      color: #fff;
      padding: 6px 10px;
      font-size: 13px;
      border-radius: 4px;
      white-space: nowrap;
      z-index: 10000;
      opacity: 0;
      transform: scale(0.95);
      transition: opacity 0.2s ease, transform 0.2s ease;
      pointer-events: none;
    }
    .tooltipix.show {
      opacity: 1;
      transform: scale(1);
    }
    .tooltipix-arrow {
      position: absolute;
      width: 6px;
      height: 6px;
      background: inherit;
      transform: rotate(45deg);
      z-index: -1;
    }
    .tooltipix-text {
      position: relative;
      z-index: 1;
    }
  `;

  function injectStyle() {
    if (!document.getElementById('tooltipix-style')) {
      const s = document.createElement('style');
      s.id = 'tooltipix-style';
      s.textContent = style;
      document.head.appendChild(s);
    }
  }

  let tooltipEl = null;
  let arrowEl = null;
  let activeTarget = null;
  let followCursor = false;
  let followMoveHandler = null;

  function createTooltip(text) {
    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.className = 'tooltipix';

      const textEl = document.createElement('div');
      textEl.className = 'tooltipix-text';
      tooltipEl.appendChild(textEl);

      arrowEl = document.createElement('div');
      arrowEl.className = 'tooltipix-arrow';
      tooltipEl.appendChild(arrowEl);

      document.body.appendChild(tooltipEl);
    }
    tooltipEl.querySelector('.tooltipix-text').textContent = text;
  }

  function positionTooltip(target, position = 'top', follow = false, event = null) {
    const rect = target.getBoundingClientRect();
    const tooltipRect = tooltipEl.getBoundingClientRect();

    let top, left;

    if (follow && event) {
      top = event.pageY + 10;
      left = event.pageX + 10;
    } else {
      switch (position) {
        case 'top':
          top = rect.top + window.scrollY - tooltipRect.height - 8;
          left = rect.left + window.scrollX + rect.width / 2 - tooltipRect.width / 2;
          break;
        case 'bottom':
          top = rect.bottom + window.scrollY + 8;
          left = rect.left + window.scrollX + rect.width / 2 - tooltipRect.width / 2;
          break;
        case 'left':
          top = rect.top + window.scrollY + rect.height / 2 - tooltipRect.height / 2;
          left = rect.left + window.scrollX - tooltipRect.width - 8;
          break;
        case 'right':
          top = rect.top + window.scrollY + rect.height / 2 - tooltipRect.height / 2;
          left = rect.right + window.scrollX + 8;
          break;
      }
    }

    tooltipEl.style.top = `${top}px`;
    tooltipEl.style.left = `${left}px`;
  }

  let showTimeout, hideTimeout, durationTimeout;

  function showTooltip(target, event) {
    const text = target.getAttribute('data-tooltip');
    if (!text) return;

    const position = target.getAttribute('data-position') || 'top';
    const delay = parseInt(target.getAttribute('data-delay') || '100');
    const duration = parseInt(target.getAttribute('data-duration') || '0');
    followCursor = target.hasAttribute('data-follow');

    clearTimeout(hideTimeout);
    clearTimeout(durationTimeout);
    activeTarget = target;

    showTimeout = setTimeout(() => {
      createTooltip(text);
      positionTooltip(target, position, followCursor, event);
      tooltipEl.classList.add('show');

      if (duration > 0) {
        durationTimeout = setTimeout(hideTooltip, duration);
      }

      if (followCursor) {
        followMoveHandler = (e) => positionTooltip(target, position, true, e);
        document.addEventListener('mousemove', followMoveHandler);
      }
    }, delay);
  }

  function hideTooltip() {
    clearTimeout(showTimeout);
    clearTimeout(durationTimeout);
    hideTimeout = setTimeout(() => {
      if (tooltipEl) tooltipEl.classList.remove('show');
      if (followMoveHandler) {
        document.removeEventListener('mousemove', followMoveHandler);
        followMoveHandler = null;
      }
    }, 100);
  }

  function init() {
    injectStyle();

    // Event listeners for showing tooltip
    ['mouseover', 'focusin', 'click'].forEach(trigger => {
      document.addEventListener(trigger, (e) => {
        const target = e.target.closest('[data-tooltip]');
        if (!target) return;

        const userTriggers = (target.getAttribute('data-trigger') || 'hover,focus').split(',').map(s => s.trim());
        const matched = (
          (trigger === 'mouseover' && userTriggers.includes('hover')) ||
          (trigger === 'focusin' && userTriggers.includes('focus')) ||
          (trigger === 'click' && userTriggers.includes('click'))
        );

        if (matched) showTooltip(target, e);
      });
    });

    // Event listeners for hiding tooltip
    ['mouseout', 'focusout'].forEach(trigger => {
      document.addEventListener(trigger, (e) => {
        const target = e.target.closest('[data-tooltip]');
        if (!target) return;

        const userTriggers = (target.getAttribute('data-trigger') || 'hover,focus').split(',').map(s => s.trim());
        const matched = (
          (trigger === 'mouseout' && userTriggers.includes('hover')) ||
          (trigger === 'focusout' && userTriggers.includes('focus'))
        );

        if (matched) hideTooltip();
      });
    });
  }

  return {
    init,
    destroy() {
      if (tooltipEl) tooltipEl.remove();
      tooltipEl = null;
      const style = document.getElementById('tooltipix-style');
      if (style) style.remove();
    },
  };
});
