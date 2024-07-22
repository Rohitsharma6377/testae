
import { useState, useEffect, useRef } from 'react';


export default function Achievements({ data }) {

    const [counters, setCounters] = useState(data.map(achievement => ({
        ...achievement,
        current: 0 // Start from 0
    })));

    const sectionRef = useRef(null); // Ref for the section to observe
    const [startAnimation, setStartAnimation] = useState(false);


    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            // Trigger animation when the section is visible
            if (entries[0].isIntersecting) {
                setStartAnimation(true);
                observer.disconnect();
            }
        }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);


    useEffect(() => {
        if (startAnimation) {
            const updates = counters.map((counter, index) => {
                const target = parseInt(counter.number);
                const step = target / 3000 * 10; // Increment step for 10ms interval

                const interval = setInterval(() => {
                    setCounters(currentCounters => {
                        const newCounters = [...currentCounters];
                        if (newCounters[index].current < target) {
                            newCounters[index].current += step; // Increment the current value
                        } else {
                            newCounters[index].current = target; // Ensure it does not exceed target
                            clearInterval(interval); // Clear interval when target is reached
                        }
                        return newCounters;
                    });
                }, 10);
                return interval;
            });

            // Clean up intervals
            return () => {
                updates.forEach(clearInterval);
            };
        }
    }, [startAnimation]);

    
    return (
        <section ref={sectionRef}>
            <div className="px-10 md:px-20 lg:px-32 py-10 bg-gradient-to-r from-[#00203F] to-[#003366] shadow-lg text-white gap-6 md:gap-10 text-center">
                <h1 className="text-2xl font-bold text-white mb-2">
                    Our Achievements
                </h1>
                <hr className="border-t-2 w-28 mx-auto border-gray-400 mb-4" />
                <div className="mt-6 mx-auto md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {counters.map((achievement, index) => (
                        <div key={index} className="text-sm text-white rounded-lg px-8 overflow-hidden">
                            <h3 className="text-4xl md:text-5xl mx-auto font-bold">
                                {Math.floor(achievement.current)}+
                            </h3>
                            <p className="font-bold mt-1 text-md opacity-50">{achievement.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
