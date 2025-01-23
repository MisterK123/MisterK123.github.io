import React from 'react';

const Footer = () => {
    return (
        <section className="c-space pt-3 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
            <div className="flex gap-3">
                <p className="text-lg text-white-600 mt-3">Kirin Harrington</p>
                <a
                    href="https://github.com/MisterK123"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon flex justify-center items-center"
                >
                    <img src="/assets/github.svg" alt="github-icon" className="w-8 h-8"/>
                </a>
                <a
                    href="https://www.linkedin.com/in/kirin-harrington-4601ab290/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon flex justify-center items-center"
                >
                    <img src="/assets/linkedin.svg" alt="linkedin-icon" className="w-8 h-8"/>
                </a>
            </div>
        </section>
    );
};

export default Footer;
