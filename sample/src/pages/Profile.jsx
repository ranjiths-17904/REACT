import { useEffect, useState } from 'react';
import Profilex from '../assets/img/orig.webp';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

const handleSocialClick = (platform) => {
    console.log(`Navigating to ${platform}...`);
};

const Profile = () => {
    const titles = ["Web Developer", "UI/UX Designer", "Software Engineer"];
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
    const [titleIndex, setTitleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false); // Tracks whether we're typing or deleting
    const [speed, setSpeed] = useState(100); // Speed of typing
    const [pause, setPause] = useState(false); // Pause between typing/deleting

    useEffect(() => {
        if (!pause) {
            if (!isDeleting && titleIndex < titles[currentTitleIndex].length) {
                // Typing characters
                const typingTimer = setTimeout(() => {
                    setTitleIndex(prev => prev + 1);
                    setSpeed(150); // Adjust typing speed
                }, speed);
                return () => clearTimeout(typingTimer);
            } else if (isDeleting && titleIndex > 0) {
                // Deleting characters
                const deletingTimer = setTimeout(() => {
                    setTitleIndex(prev => prev - 1);
                    setSpeed(50); // Adjust deleting speed
                }, speed);
                return () => clearTimeout(deletingTimer);
            } else if (!isDeleting && titleIndex === titles[currentTitleIndex].length) {
                // Pause after full title is typed
                const fullTitlePause = setTimeout(() => {
                    setPause(true);
                    setIsDeleting(true);
                }, 1000); // Pause before deleting
                return () => clearTimeout(fullTitlePause);
            } else if (isDeleting && titleIndex === 0) {
                // Move to next title after deleting
                setIsDeleting(false);
                setCurrentTitleIndex(prev => (prev + 1) % titles.length); // Cycle to next title
                setPause(true);
            }
        } else {
            // Brief pause before typing/deleting
            const pauseTimer = setTimeout(() => {
                setPause(false);
            }, 500);
            return () => clearTimeout(pauseTimer);
        }
    }, [titleIndex, isDeleting, pause, currentTitleIndex, speed, titles]);

    return (
        <div className="h-full w-full flex flex-col lg:flex-row justify-center items-center p-4 lg:p-2 gap-20 pr-10">
         
            <div className="flex justify-center lg:justify-end w-full lg:w-auto ">
                <img 
                    src={Profilex} 
                    alt="profile" 
                    className="p-2 lg:h-80 lg:w-80 lg:m-10 rounded-3xl shadow-2xl object-cover" 
                />
            </div>
            <div className="text-center lg:text-left">
                <h2 className="text-3xl lg:text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                    Hi, I am Ranjith
                </h2>

                <div className="text-xl lg:text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 mt-2 lg:mt-4">
                    I am a {titles[currentTitleIndex].slice(0, titleIndex)}
                </div>

                {/* Social Media Icons */}
                <div className="flex justify-center lg:justify-start space-x-6 mt-6">
                    <a 
                        href="https://www.facebook.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={() => handleSocialClick('Facebook')} 
                        className="text-2xl lg:text-3xl text-blue-600 hover:text-blue-800 transition duration-300">
                        <FaFacebook />
                    </a>
                    <a 
                        href="https://www.github.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={() => handleSocialClick('Github')} 
                        className="text-2xl lg:text-3xl text-black hover:text-gray-600 transition duration-300">
                        <FaGithub />
                    </a>
                    <a 
                        href="https://www.instagram.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={() => handleSocialClick('Instagram')} 
                        className="text-2xl lg:text-3xl text-pink-600 hover:text-pink-800 transition duration-300">
                        <FaInstagram />
                    </a>
                    <a 
                        href="https://www.linkedin.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={() => handleSocialClick('LinkedIn')} 
                        className="text-2xl lg:text-3xl text-blue-500 hover:text-blue-700 transition duration-300">
                        <FaLinkedin />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Profile;
