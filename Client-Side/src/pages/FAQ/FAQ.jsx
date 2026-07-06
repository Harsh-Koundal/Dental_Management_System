import HomeFAQ from '@/components/landingpage/HomeFAQ';
import HomeContact from '@/components/landingpage/HomeContact';

const FAQ = () => {
    return (
        <div className="min-h-screen bg-[#fdfbf7]">
            <HomeFAQ />
            <div className="py-24 border-y border-brand/5 shadow-inner bg-[#f8fbfe]">
                <HomeContact />
            </div>
        </div>
    );
};

export default FAQ;
