import logo from './MicrosoftTeams-image (4).png'

function Header(){
    return(
        <div className="header">
            <img src={logo.src} />
            ArcGIS Buddy
        </div>
    );
}

export default Header;