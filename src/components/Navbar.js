import logo from '../assets/Stefan.png'
import "./NavbarStyles.css"

function Navbar() {
    return(
        <nav>
            <a href="index.html">
                <img src={logo} />
            </a>

            <div>
                <ul id ="navbar">
                    <li>
                        <a href="index.html">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="index.html">
                            Resume
                        </a>
                    </li>
                    <li>
                        <a href="index.html">
                            Projects
                        </a>
                    </li>
                    <li>
                        <a href="index.html">
                            Blog
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;