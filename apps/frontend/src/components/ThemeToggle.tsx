import { useEffect, useState } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'
import './ThemeToggle.css'

type Theme = 'ocean' | 'forest' | 'sunset' | 'purple'
type Mode = 'light' | 'dark'

export const ThemeToggle = () => {
  const [mode, setMode] = useState<Mode>('dark')
  const [theme, setTheme] = useState<Theme>('ocean')
  const [showThemes, setShowThemes] = useState(false)

  useEffect(() => {
    // Load saved preferences
    const savedMode = localStorage.getItem('theme-mode') as Mode | null
    const savedTheme = localStorage.getItem('theme-color') as Theme | null

    if (savedMode) setMode(savedMode)
    if (savedTheme) setTheme(savedTheme)

    applyTheme(savedMode || 'dark', savedTheme || 'ocean')
  }, [])

  const applyTheme = (newMode: Mode, newTheme: Theme) => {
    const root = document.documentElement

    // Remove all mode and theme classes
    root.classList.remove('light', 'dark', 'theme-ocean', 'theme-forest', 'theme-sunset', 'theme-purple')

    // Apply new mode and theme
    root.classList.add(newMode)
    if (newTheme !== 'ocean') {
      root.classList.add(`theme-${newTheme}`)
    }
  }

  const toggleMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark'
    setMode(newMode)
    localStorage.setItem('theme-mode', newMode)
    applyTheme(newMode, theme)
  }

  const selectTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('theme-color', newTheme)
    applyTheme(mode, newTheme)
    setShowThemes(false)
  }

  return (
    <>
      <div className="theme-toggle-container">
        {/* Mode Toggle Button */}
        <button
          className="theme-toggle-button"
          onClick={toggleMode}
          aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
          title={`${mode === 'dark' ? 'Light' : 'Dark'} mode`}
        >
          {mode === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>

        {/* Theme Selector Button */}
        <button
          className="theme-toggle-button theme-selector"
          onClick={() => setShowThemes(!showThemes)}
          aria-label="Select color theme"
          title="Color themes"
        >
          <div className={`theme-color-indicator theme-${theme}`}></div>
        </button>

        {/* Theme Dropdown */}
        {showThemes && (
          <div className="theme-dropdown">
            <button
              className={`theme-option ${theme === 'ocean' ? 'active' : ''}`}
              onClick={() => selectTheme('ocean')}
            >
              <div className="theme-color-indicator theme-ocean"></div>
              <span>Ocean</span>
            </button>
            <button
              className={`theme-option ${theme === 'forest' ? 'active' : ''}`}
              onClick={() => selectTheme('forest')}
            >
              <div className="theme-color-indicator theme-forest"></div>
              <span>Forest</span>
            </button>
            <button
              className={`theme-option ${theme === 'sunset' ? 'active' : ''}`}
              onClick={() => selectTheme('sunset')}
            >
              <div className="theme-color-indicator theme-sunset"></div>
              <span>Sunset</span>
            </button>
            <button
              className={`theme-option ${theme === 'purple' ? 'active' : ''}`}
              onClick={() => selectTheme('purple')}
            >
              <div className="theme-color-indicator theme-purple"></div>
              <span>Purple</span>
            </button>
          </div>
        )}
      </div>

      {/* Overlay to close dropdown */}
      {showThemes && (
        <div
          className="theme-dropdown-overlay"
          onClick={() => setShowThemes(false)}
        />
      )}
    </>
  )
}
