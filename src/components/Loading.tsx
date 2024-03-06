interface LoadingProps {
    theme: string;
    showLoadingIndicator: boolean;
}

export function Loading({ theme, showLoadingIndicator }: LoadingProps) {

    const logoURL = theme === 'light' ? '/logo/football-light-theme.png' : '/logo/football-dark-theme.png';

    return (
        <div className="loading-container">
            {showLoadingIndicator &&
                <img src={logoURL} className='Football-logo' alt="Logo" />
            }
        </div>
    )

}