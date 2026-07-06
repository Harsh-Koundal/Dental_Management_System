import { Section, Container, SectionHead } from '@/UI/Section';
import { ArrowRight, Sparkles, User, Clock } from 'lucide-react';

const Blogs = () => {
    const BLOG_POSTS = [
        { id: 1, title: "How to Choose Between Braces and Aligners", excerpt: "Selecting the right orthodontic treatment depends on your clinical case and lifestyle.", date: "April 2024", author: "Dr. Abinash Panda", img: "https://images.unsplash.com/photo-1598256989490-67bc7d5494a8?w=800&h=600&fit=crop" },
        { id: 2, title: "The Importance of Early Orthodontic Assessment", excerpt: "Why age 7 is the ideal time for your child's first orthodontic evaluation.", date: "March 2024", author: "Dr. Abinash Panda", img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=600&fit=crop" },
        { id: 3, title: "Maintaining Oral Hygiene with Braces", excerpt: "Professional tips to keep your teeth clean and healthy during orthodontic treatment.", date: "February 2024", author: "Dr. Abinash Panda", img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop" },
        { id: 4, title: "Adult Orthodontics: It's Never Too Late", excerpt: "Breaking the myth that orthodontic treatment is only for teenagers.", date: "January 2024", author: "Dr. Abinash Panda", img: "https://images.unsplash.com/photo-1460150035624-755ec9009596?w=800&h=600&fit=crop" }
    ];

    return (
        <div className="min-h-screen bg-[#fdfbf7]">
            <Section className="bg-white">
                <Container>
                    <SectionHead 
                        tag="Clinical Insights"
                        title="Dental Blogs & News"
                        sub="Stay updated with the latest in orthodontic technology and clinical care from Dr. Panda's desk."
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 mt-20">
                        {BLOG_POSTS.map((post, i) => (
                            <div key={post.id} className="group rounded-[3rem] bg-[#f8fbfe] border border-brand/5 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col md:flex-row h-full">
                                <div className="md:w-2/5 aspect-[4/3] md:aspect-auto relative overflow-hidden">
                                   <img src={post.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={post.title} />
                                   <div className="absolute top-6 left-6 bg-brand text-white text-[10px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest shadow-lg">New Article</div>
                                </div>
                                <div className="md:w-3/5 p-10 flex flex-col items-start justify-center">
                                    <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 font-display">
                                        <span className="flex items-center gap-2"><User size={12} className="text-brand" /> {post.author}</span>
                                        <span className="flex items-center gap-2"><Clock size={12} className="text-cyan-500" /> {post.date}</span>
                                    </div>
                                    <h3 className="text-2xl font-black mb-4 tracking-tight leading-tight group-hover:text-brand transition-colors">{post.title}</h3>
                                    <p className="text-sm font-medium leading-loose opacity-70 mb-8 max-w-[280px]">{post.excerpt}</p>
                                    <a href={`/blogs/${post.id}`} className="text-brand font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">Read Article <ArrowRight size={18} /></a>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            <Section className="bg-brand text-white text-center py-24">
                <Container>
                    <div className="max-w-3xl mx-auto flex flex-col items-center">
                        <Sparkles size={48} className="mb-10 text-cyan-300 opacity-80" />
                        <h2 className="text-4xl font-black mb-10 tracking-tight leading-tight uppercase">Scientific Knowledge = Powerful Smiles</h2>
                        <a href="/appointment" className="bg-white text-brand px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:translate-y-[-4px] transition-all">Start Your Transformation Now <ArrowRight className="inline-block ml-2" size={18} /></a>
                    </div>
                </Container>
            </Section>
        </div>
    );
};

export default Blogs;
