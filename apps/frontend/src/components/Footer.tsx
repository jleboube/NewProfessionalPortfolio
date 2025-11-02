import { Link } from 'react-router-dom'

interface FooterProps {
  profileName: string
  variant?: 'home' | 'default'
  onBackToTop?: () => void
}

const Footer = ({ profileName, variant = 'default', onBackToTop }: FooterProps) => {
  return (
    <footer>
      <div className="footer-content">
        <a
          href="https://www.buymeacoffee.com/muscl3n3rd"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png"
            alt="Buy Me A Coffee"
            style={{
              height: '37px',
              width: '170px',
              boxShadow: '0px 3px 2px 0px rgba(190, 190, 190, 0.5)',
              WebkitBoxShadow: '0px 3px 2px 0px rgba(190, 190, 190, 0.5)'
            }}
          />
        </a>

        {variant === 'home' ? (
          <>
            <p>© {new Date().getFullYear()} {profileName}. Built with React, Vite, and Framer Motion.</p>
            {onBackToTop && (
              <button type="button" onClick={onBackToTop}>
                Back to top
              </button>
            )}
          </>
        ) : (
          <>
            <p>© {new Date().getFullYear()} {profileName}</p>
            <Link to="/">Back to home</Link>
          </>
        )}
      </div>
    </footer>
  )
}

export default Footer
