import { useEffect } from "react";
import { assets } from "../assets/assets";

const GoogleTranslator = () => {
    useEffect(() => {
        if (!window.googleTranslateElementInit) {
            window.googleTranslateElementInit = () => {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: "en",
                        includedLanguages: "en,hi,fr,de,zh,es,ja,ko,ru,ar,pt,it,nl,bn,tr",
                        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                        autoDisplay: false,
                        multilanguagePage: true,
                    },
                    "google_translate_element"
                );
            };
        }

        const existingScript = document.querySelector("script[src*='translate_a/element.js']");
        if (!existingScript) {
            const script = document.createElement("script");
            script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;
            document.body.appendChild(script);
        } else {
            window.googleTranslateElementInit();
        }

        // Hides the default Google Translate logo
        setTimeout(() => {
            const googleLogo = document.querySelector(".goog-te-gadget span");
            if (googleLogo) googleLogo.style.display = "none";
        }, 1000);
        
    }, []);

    return (
        <div className="relative inline-block">
            {/* Google Translate Dropdown (Hidden but Interactive) */}
            <div id="google_translate_element" className="absolute top-0 left-0 w-full h-full opacity-0 pointer-events-auto"></div>
    
            {/* Custom Translate Icon */}
            <img
                src={assets.translate_icon} // Your custom icon
                className="w-6 h-6 cursor-pointer"
                alt="Translate"
                onClick={() => {
                    const dropdown = document.querySelector("#google_translate_element select");
                    if (dropdown) dropdown.click(); // Triggers language selection
                }}
            />
        </div>
    );
    
};

export default GoogleTranslator;
