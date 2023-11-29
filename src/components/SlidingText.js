import React from 'react'; 
import Slide from 'react-awesome-reveal'; 
  
const SlidingText = () => { 
    return ( 
        <div>
            <Slide direction="right" delay={500}> 
                <h2>Welcome to my Website!</h2>
            </Slide>
            <Slide direction="right" delay={2500}>
                <p>My name is Stefan Caloian, and I am a highly motivated </p>
                <p>and compassionate engineer with a keen eye for great </p>
                <p>software design.</p>
            </Slide>
            <Slide direction="right" delay={4500}>
                <p>I graduated from the University of Waterloo, with a computer</p>
                <p>engineering degree in 2022, and since then I have been </p>
                <p>lucky enough to be able to follow my passion of coding.</p>
                <p>through all sorts of fulfilling professional and personal </p>
                <p>endeavours.</p>
            </Slide>
            <Slide direction="right" delay={6500}>
                <p>Here you can find my resume, various projects, as well</p>
                <p>as my thoughts on movies I have recently seen and books</p>
                <p>I have recently read. My contact info is below if you would </p>
                <p>like to speak about anything! </p>
            </Slide>
    </div>
    ); 
}; 
  
export default SlidingText;
