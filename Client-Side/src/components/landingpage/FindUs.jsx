import React from 'react';
import { Section, Container, SectionHead } from '@/UI/Section';

export default function FindUs() {
    return (
        <Section id="findus" className="bg-white pt-2 md:pt-12 ">
            <Container>
                <SectionHead 
                    tag="Location" 
                    title={<span>Where to <span className="text-brand">Find Us</span></span>} 
                    sub="Visit our state-of-the-art clinic. We are conveniently located and ready to serve you with the best orthodontic care."
                />
            </Container>
            
            <div className="w-full px-4 md:px-8 lg:px-12 relative group pb-2 md:pb-6">
                <div className="w-full rounded-[2rem] overflow-hidden border-4 border-white/80">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3712.2302895972443!2d86.91920927472702!3d21.498697871473205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1cf59f6fffdd2b%3A0xe686e83c5ac29226!2sStation%20Rd%2C%20Railway%20Colony%2C%20Balasore%2C%20Odisha%20756001!5e0!3m2!1sen!2sin!4v1775625968371!5m2!1sen!2sin" 
                        width="100%" 
                        height="500" 
                        style={{ border: 0 }} 
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Clinic Location"
                        className="opacity-90 group-hover:opacity-100 transition-opacity duration-500 block"
                    ></iframe>
                </div>
            </div>
        </Section>
    );
}