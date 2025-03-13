import { useEffect } from "react";

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
    }, []);

    return <div id="google_translate_element"></div>;
};

export default GoogleTranslator;
