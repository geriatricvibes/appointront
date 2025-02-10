// Initialize theme as early as possible to prevent flash
export function initializeTheme() {
  // Get theme from localStorage or default to dark
  const theme = localStorage.getItem('theme') ?? 'dark';
  
  // Apply theme immediately
  document.documentElement.classList.remove('dark', 'light');
  document.documentElement.classList.add(theme);
  
  // Enhanced system theme listener
  const systemThemeWatcher = window.matchMedia('(prefers-color-scheme: dark)');
  const handleThemeChange = (e) => {
    if (!localStorage.getItem('theme')) {
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add('dark'); // Always default to dark
      updateParticleColor(true);
    }
  };

  // Use both addListener (older mobile browsers) and addEventListener
  if (systemThemeWatcher.addListener) {
    systemThemeWatcher.addListener(handleThemeChange);
  }
  systemThemeWatcher.addEventListener('change', handleThemeChange);
  
  // Helper to get HSL color as hex
  function getParticleColor(isDark) {
    return isDark ? '#FFFFFF' : '#000000';
  }
  
  // Update particle color based on theme
  function updateParticleColor(isDark) {
    const root = document.documentElement;
    root.style.setProperty('--particle-color', isDark ? '0 0% 100%' : '0 0% 0%');
  }
  
  // Initial setup
  const isDark = document.documentElement.classList.contains('dark');
  updateParticleColor(isDark);
  
  // Watch for theme changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        const isDark = document.documentElement.classList.contains('dark');
        updateParticleColor(isDark);
      }
    });
  });
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  });
}

// Update this function to force color values
export function getCurrentParticleColor() {
  const isDark = document.documentElement.classList.contains('dark');
  return isDark ? '#FFFFFF' : '#000000';
}