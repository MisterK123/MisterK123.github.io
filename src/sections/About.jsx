import React from 'react'

const About = () => {
    return (
        <section className="c-space my-5">
            <div className="grid xl:grid-cols-3 xl:grid-rows-3 md:grid-cols-2 grid-cols-1 gap-5 h-full">
                <div className="col-span-1 xl:row-span-3">
                    <div className="grid-container">
                        <img src="/assets/kirinpfp5.PNG" alt="Kirin's pfp"
                             className="w-full sm-h-[276] h-fit object-contain"/>
                        <div>
                            <p className="grid-headtext">Hi, I&#39;m Kirin</p>
                            <p className="grid-subtext">A Y13 student currently studying Computer Science, Maths, and
                                Physics</p>
                        </div>
                    </div>

                </div>
                <div className="col-span-1 xl:row-span-3">
                    <div className="grid-container">
                        <img src="/assets/grid2-5.png" alt="Passions img" className="w-full sm-h-[276] h-fit object-contain"/>
                        <div>
                            <p className="grid-headtext">My Passions</p>
                            <p className="grid-subtext">I love problem solving and learning new things, especially anything related to Cyber Security and Computer Science. I also have a passion for chess and playing the piano, alongside hiking and cycling.</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 xl:row-span-3">
                    <div className="grid-container">
                        <div>
                            <p className="grid-headtext">My Skills</p>
                        </div>
                        <div>
                            <p className="grid-subtext" style={{textDecoration: 'underline', fontWeight: 'bold'}}>Public
                                speaking</p>
                            <p className="grid-subtext">• Example 1 of public speaking</p>
                            <p className="grid-subtext">• Example 2 of public speaking</p>
                            <br></br>
                            <p className="grid-subtext"
                               style={{textDecoration: 'underline', fontWeight: 'bold'}}>Organisation</p>
                            <p className="grid-subtext">• Example 1 of organisation</p>
                            <p className="grid-subtext">• Example 2 of organisation</p>
                            <br></br>
                            <p className="grid-subtext"
                               style={{textDecoration: 'underline', fontWeight: 'bold'}}>Leadership</p>
                            <p className="grid-subtext">• Example 1 of leadership</p>
                            <p className="grid-subtext">• Example 2 of leadership</p>
                            <br></br>
                            <p className="grid-subtext"
                               style={{textDecoration: 'underline', fontWeight: 'bold'}}>Problem solving</p>
                            <p className="grid-subtext">• Example 1 of problem solving</p>
                            <p className="grid-subtext">• Example 2 of problem solving</p>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    )
}
export default About
