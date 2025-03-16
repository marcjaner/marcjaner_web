
import React, { useEffect } from 'react';

const NewsletterPage = () => {
  useEffect(() => {
    // Create and append Substack widget script
    const script1 = document.createElement('script');
    script1.innerHTML = `
      window.CustomSubstackWidget = {
        substackUrl: "marcjaner.substack.com",
        placeholder: "example@gmail.com",
        buttonText: "Subscribe",
        theme: "custom",
        colors: {
          primary: getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim() || "#000000",
          input: getComputedStyle(document.documentElement).getPropertyValue('--input-color').trim() || "#FFFFFF",
          email: getComputedStyle(document.documentElement).getPropertyValue('--email-color').trim() || "#FFFFFF", 
          text: getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim() || "#000000",
        }
      };
    `;
    document.body.appendChild(script1);

    // Create and append Substack API script
    const script2 = document.createElement('script');
    script2.src = "https://substackapi.com/widget.js";
    script2.async = true;
    document.body.appendChild(script2);

    // Update CSS variables based on theme
    const updateThemeColors = () => {
      const isDark = document.documentElement.classList.contains('dark');
      
      document.documentElement.style.setProperty(
        '--primary-color', 
        isDark ? 'hsl(0, 0%, 98%)' : 'hsl(240, 5.9%, 10%)'
      );
      document.documentElement.style.setProperty(
        '--input-color',
        isDark ? 'hsl(240, 3.7%, 15.9%)' : 'hsl(240, 4.8%, 95.9%)'
      );
      document.documentElement.style.setProperty(
        '--email-color',
        isDark ? 'hsl(0, 0%, 98%)' : 'hsl(240, 10%, 3.9%)'
      );
      document.documentElement.style.setProperty(
        '--text-color',
        isDark ? 'hsl(0, 0%, 98%)' : 'hsl(240, 10%, 3.9%)'
      );
    };

    // Initial theme setup
    updateThemeColors();

    // Setup theme change observer
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          updateThemeColors();
          
          // Reload the Substack widget when theme changes
          const embedDiv = document.getElementById('custom-substack-embed');
          if (embedDiv) {
            embedDiv.innerHTML = '';
            
            // Remove previous scripts
            if (script1.parentNode) script1.parentNode.removeChild(script1);
            if (script2.parentNode) script2.parentNode.removeChild(script2);
            
            // Re-add scripts
            document.body.appendChild(script1);
            document.body.appendChild(script2);
          }
        }
      });
    });

    // Start observing theme changes
    observer.observe(document.documentElement, { attributes: true });

    return () => {
      // Cleanup on component unmount
      observer.disconnect();
      if (script1.parentNode) script1.parentNode.removeChild(script1);
      if (script2.parentNode) script2.parentNode.removeChild(script2);
    };
  }, []);

  return (
    <>
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 reveal">
              <h1 className="text-4xl font-bold mb-6">Subscribe to my Newsletter</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Stay up to date with my latest projects, blog posts, and insights on data engineering,
                software development, and more.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-2xl p-8 reveal stagger-1">
              <div id="custom-substack-embed" className="py-4"></div>
            </div>
            
            <div className="mt-12 text-center reveal stagger-2">
              <p className="text-sm text-muted-foreground">
                Your email is safe with me. I respect your privacy and will never share your information.
                <br />
                You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsletterPage;
