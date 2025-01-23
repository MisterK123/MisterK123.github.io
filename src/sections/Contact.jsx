import React from 'react'
import {useRef, useState} from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
    const formRef = useRef();
    const [loading,setLoading] = useState(false);
    const [form,setForm] = useState({
        name: '',
        email: '',
        message: '',
    })
    const handleChange = ({target: { name, value }}) => {
        setForm({...form, [name]: value})
    }
    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);
        try{
            await emailjs.send('service_6tjw6uq', 'template_zzs1sb4',{
                from_name: form.name,
                to_name: 'Kirin Harrington',
                from_email: form.email,
                to_email: 'kirin@twosmallpeople.co.uk',
                message: form.message,
            },'nZVjTGLMTqYijx_Gg')
            setLoading(false);
            alert('Your message has been sent!');
            setForm({
                name: '',
                email: '',
                message: '',
            })
        } catch (error) {
            alert(`Something went wrong: ${error.text || 'Unknown error'}`);
            setLoading(false);
        }
    }

    return (
        <section className="c-space my-3 border-t border-black-300">
            <div className="relative min-h-screen flex items-center justify-center flex-col">
                <img src="/assets/terminal.png" alt="terminal background" className="absolute inset-0 min-h-screen"/>
                <div className="contact-container">
                    <h3 className="head-text"> Get In Touch</h3>
                    <p className="text-lg text-white-600 mt-3">Give me work experience please :)
                    </p>

                    <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7">
                        <label className="space-y-3">
                            <span className="field-label">Full Name</span>
                            <input type="text" name="name" value={form.name} onChange={handleChange}
                                   className="field-input" placeholder="Your name" required/>
                        </label>
                        <label className="space-y-3">
                            <span className="field-label">Email</span>
                            <input type="email" name="email" value={form.email} onChange={handleChange}
                                   className="field-input" placeholder="example@gmail.com" required/>
                        </label>
                        <label className="space-y-3">
                            <span className="field-label">Message</span>
                            <textarea name="message" value={form.message} onChange={handleChange}
                                   className="field-input" placeholder="Hi, I'm interested in...." required rows={5}/>
                        </label>
                        <button className="field-btn" type="submit" disabled={loading}>
                            {loading ? 'Sending...' : 'Send Message'}
                            <img src="/assets/arrow-up.png" alt="arrow" className="field-btn_arrow"/>

                        </button>

                    </form>

                </div>

            </div>


        </section>
    )
}
export default Contact
