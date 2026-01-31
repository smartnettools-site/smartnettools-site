// SmartNet Tools - Main JavaScript

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navList = document.querySelector('.nav-list');
  
  if (mobileMenuToggle && navList) {
    mobileMenuToggle.addEventListener('click', () => {
      navList.classList.toggle('active');
      const isExpanded = navList.classList.contains('active');
      mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
      mobileMenuToggle.textContent = isExpanded ? '✕ Close' : '☰ Menu';
    });
  }
  
  // Set active nav item based on current page
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-list a');
  
  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (currentPath === linkPath || currentPath.startsWith(linkPath.replace(/\/$/, ''))) {
      link.classList.add('active');
    }
  });
});

// Form validation helper
function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return false;
  
  let isValid = true;
  const requiredFields = form.querySelectorAll('[required]');
  
  requiredFields.forEach(field => {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.form-error');
    
    // Remove previous error state
    formGroup.classList.remove('error');
    
    // Validate field
    if (!field.value.trim()) {
      formGroup.classList.add('error');
      if (errorElement) {
        errorElement.textContent = 'This field is required';
      }
      isValid = false;
    } else if (field.type === 'email' && !isValidEmail(field.value)) {
      formGroup.classList.add('error');
      if (errorElement) {
        errorElement.textContent = 'Please enter a valid email address';
      }
      isValid = false;
    } else if (field.type === 'url' && !isValidURL(field.value)) {
      formGroup.classList.add('error');
      if (errorElement) {
        errorElement.textContent = 'Please enter a valid URL';
      }
      isValid = false;
    }
  });
  
  return isValid;
}

// Email validation
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// URL validation
function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Copy to clipboard helper
function copyToClipboard(text, buttonElement) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = buttonElement.textContent;
    buttonElement.textContent = '✓ Copied!';
    buttonElement.style.background = 'var(--success-color)';
    
    setTimeout(() => {
      buttonElement.textContent = originalText;
      buttonElement.style.background = '';
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy:', err);
    alert('Failed to copy to clipboard');
  });
}

// Download text as file helper
function downloadAsFile(content, filename, mimeType = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Debounce helper for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Show notification
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: var(--bg-secondary);
    border: 2px solid var(--neon-cyan);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
