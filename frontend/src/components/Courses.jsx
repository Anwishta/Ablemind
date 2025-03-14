import React, { useState } from "react";
import { products } from "../assets"; 

const Courses = () => {
    const [category, setCategory] = useState(""); 
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCourses = (selectedCategory) => {
        setLoading(true);
        setCategory(selectedCategory);
        
        setTimeout(() => {
            const filtered = products.filter(course => course.category === selectedCategory);
            setFilteredCourses(filtered);
            setLoading(false);
        }, 1000);
    };

    
    const readCourseHeadlines = () => {
        if (!filteredCourses.length) return;
        
        const headlines = filteredCourses.map(course => course.name).join(", ");
        const speech = new SpeechSynthesisUtterance(`The courses available for ${category} are: ${headlines}`);
        
        speech.lang = "en-US"; 
        speech.rate = 1; 
        window.speechSynthesis.speak(speech);
    };

    return (
        <div>
            <h2>Course Categories</h2>
       
            <button onClick={() => fetchCourses("Computer")}>Computer</button>
            <button onClick={() => fetchCourses("Maths")}>Maths</button>
            <button onClick={() => fetchCourses("English")}>English</button>

            {loading && <p>Fetching courses for {category}...</p>}

            {!loading && filteredCourses.length > 0 && (
                <div>
                    <h3>Available Courses for {category}</h3>
                    <ul>
                        {filteredCourses.map(course => (
                            <li key={course._id}>{course.name}</li>
                        ))}
                    </ul>
                    <button onClick={readCourseHeadlines}>Do you want me to read the headlines for you?</button>
                </div>
            )}
        </div>
    );
};

export default Courses;
