import logo from '../assets/Stefan.png'
import resume_button from '../assets/resume.png'
import projects_button from '../assets/projects.png'
import blog_button from '../assets/blog.png'
import "./NavbarStyles.css"

function Navbar() {
    return(
        <nav>
            <a href="index.html">
                <img src={logo} alt="logo"/>
            </a>

            <div>
                <ul id ="navbar">
                    <li>
                        <a href="index.html">
                            <img src= {resume_button} alt="resume"/>
                        </a>
                    </li>
                    <li>
                        <a href="index.html">
                            <img src= {projects_button} alt="project"/>
                        </a>
                    </li>
                    <li>
                        <a href="index.html">
                            <img src= {blog_button} alt="blog"/>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;