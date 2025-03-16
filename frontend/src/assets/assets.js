import p_img1 from './p_img1.png'
import p_img2 from './p_img2.png'
import p_img3 from './p_img3.png'
import p_img4 from './p_img4.png'
import p_img5 from './p_img5.png'
import p_img6 from './p_img6.png'
import p_img7 from './p_img7.png'
import p_img8 from './p_img8.png'
import p_img9 from './p_img9.png'
import p_img10 from './p_img10.png'
import p_img11 from './p_img11.png'
import p_img12 from './p_img12.png'
import p_img13 from './p_img13.png'
import p_img14 from './p_img14.png'
// import p_vdo1  from './p_vdo1.mp4'
// import p_srt1 from './p_srt1.srt?url'



import logo from './logo.png'
import hero_img from './hero_img.png'
import cart_icon from './cart_icon.png'
import bin_icon from './bin_icon.png'
import dropdown_icon from './dropdown_icon.png'
import exchange_icon from './exchange_icon.png'
import profile_icon from './profile_icon.png'
import quality_icon from './quality_icon.png'
import search_icon from './search_icon.png'
import star_dull_icon from './star_dull_icon.png'
import star_icon from './star_icon.png'
import support_img from './support_img.png'
import menu_icon from './menu_icon.png'
import about_img from './about_img.png'
import contact_img from './contact_img.png'
import razorpay_logo from './razorpay_logo.png'
import stripe_logo from './stripe_logo.png'
import cross_icon from './cross_icon.png'
import translate_icon from './translate_icon.png'


export const assets = {
    logo,
    hero_img,
    cart_icon,
    dropdown_icon,
    exchange_icon,
    profile_icon,
    quality_icon,
    search_icon,
    star_dull_icon,
    star_icon,
    bin_icon,
    support_img,
    menu_icon,
    about_img,
    contact_img,
    razorpay_logo,
    stripe_logo,
    cross_icon,
    translate_icon,
    // p_srt1,
    // p_vdo1
    
}

export const products = [
    {
        _id: "aaaaa",
        name: "C Programming Language",
        description: "Learn the fundamentals of C programming, including syntax, variables, loops, and functions. Perfect for beginners stepping into coding.",
        price: 100,
        image: [p_img1],
        category: "Computer",
        subCategory: "Easy",
        sizes: ["S", "M", "L"],
        date: 1716634345448,
        bestseller: true
    },
    {
        _id: "aaaab",
        name: "Microsoft Excel",
        description: "Master the basics of Microsoft Excel, including formulas, data analysis, and visualization techniques for efficient spreadsheet management.",
        price: 200,
        image: [p_img2],
        category: "Computer",
        subCategory: "Easy",
        sizes: ["M", "L", "XL"],
        date: 1716621345448,
        bestseller: true
    },
    {
        _id: "aaaac",
        name: "Java",
        description: "Explore object-oriented programming with Java, covering classes, inheritance, and exception handling. Ideal for aspiring developers.",
        price: 220,
        image: [p_img3],
        category: "Computer",
        subCategory: "Medium",
        sizes: ["S", "L", "XL"],
        date: 1716234545448,
        bestseller: true
    },
    {
        _id: "aaaad",
        name: "Q Basic",
        description: "An entry-level programming course covering basic commands, loops, and simple algorithms for problem-solving.",
        price: 110,
        image: [p_img4],
        category: "Computer",
        subCategory: "Easy",
        sizes: ["S", "M", "XXL"],
        date: 1716621345448,
        bestseller: true
    },
    {
        _id: "aaaae",
        name: "Web Development",
        description: "Learn HTML, CSS, and JavaScript to create responsive websites from scratch. A hands-on course for aspiring web developers.",
        price: 130,
        image: [p_img5],
        category: "Computer",
        subCategory: "Medium",
        sizes: ["M", "L", "XL"],
        date: 1716622345448,
        bestseller: true
    },
    {
        _id: "aaaaf",
        name: "Adobe Flash",
        description: "An in-depth guide to creating animations and interactive content using Adobe Flash. Learn to design and develop engaging multimedia applications.",
        price: 140,
        image: [p_img6],
        category: "Computer",
        subCategory: "Hard",
        sizes: ["S", "L", "XL"],
        date: 1716623423448,
        bestseller: true
    },
    {
        _id: "aaaag",
        name: "Algebra",
        description: "Understand algebraic expressions, equations, and problem-solving techniques. Ideal for students building a strong mathematical foundation.",
        price: 190,
        image: [p_img7],
        category: "Maths",
        subCategory: "Easy",
        sizes: ["S", "L", "XL"],
        date: 1716621542448,
        bestseller: false
    },
    {
        _id: "aaaah",
        name: "Abacus",
        description: "Develop mental calculation skills and improve mathematical speed using the ancient abacus technique.",
        price: 140,
        image: [p_img8],
        category: "Maths",
        subCategory: "Easy",
        sizes: ["S", "M", "L", "XL"],
        date: 1716622345448,
        bestseller: false
    },
    {
        _id: "aaaai",
        name: "Geometry",
        description: "Learn about shapes, angles, theorems, and problem-solving techniques used in geometry. Suitable for school and competitive exams.",
        price: 100,
        image: [p_img9],
        category: "Maths",
        subCategory: "Medium",
        sizes: ["M", "L", "XL"],
        date: 1716621235448,
        bestseller: false
    },
    {
        _id: "aaaaj",
        name: "Mental Math",
        description: "Sharpen your arithmetic skills and improve problem-solving speed with mental math techniques and tricks.",
        price: 110,
        image: [p_img10],
        category: "Maths",
        subCategory: "Hard",
        sizes: ["S", "L", "XL"],
        date: 1716622235448,
        bestseller: false
    },
    {
        _id: "aaaak",
        name: "Article Writing",
        description: "Learn the art of writing engaging and structured articles, covering grammar, style, and effective communication.",
        price: 120,
        image: [p_img11],
        category: "English",
        subCategory: "Easy",
        sizes: ["S", "M", "L"],
        date: 1716623345448,
        bestseller: false
    },
    {
        _id: "aaaal",
        name: "Tenses Mastery",
        description: "Master all 12 English tenses with real-world examples and practice exercises for fluent and accurate communication.",
        price: 150,
        image: [p_img12],
        category: "English",
        subCategory: "Medium",
        sizes: ["S", "M", "L", "XL"],
        date: 1716624445448,
        bestseller: false
    },
    {
        _id: "aaaam",
        name: "Prepositions in English",
        description: "Enhance your writing and speaking skills by mastering the correct usage of prepositions in different contexts.",
        price: 130,
        image: [p_img13],
        category: "English",
        subCategory: "Medium",
        sizes: ["S", "M", "L", "XL"],
        date: 1716625545448,
        bestseller: false,
        video: assets.p_vdo1,
        subtitles: assets.p_srt1  
    }
    
    ,
    {
        _id: "aaaan",
        name: "Verbs and Their Forms",
        description: "Understand verb conjugation, tense forms, and their correct application in writing and speaking.",
        price: 160,
        image: [p_img14],
        category: "English",
        subCategory: "Hard",
        sizes: ["S", "M", "L", "XL"],
        date: 1716626645448,
        bestseller: false
    },
];
