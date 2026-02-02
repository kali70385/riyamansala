import { useEffect } from "react";
import { useAdSettings } from "@/hooks/useAdSettings";

const AdMetaTags = () => {
  const adSettings = useAdSettings();

  useEffect(() => {
    if (!adSettings.metaTags) return;

    // Create a container for the meta tags in head
    const headScriptId = 'ad-network-meta-tags';
    let existingContainer = document.getElementById(headScriptId);
    
    if (existingContainer) {
      existingContainer.remove();
    }

    // Parse and inject meta tags/scripts into head
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = adSettings.metaTags;

    // Process script tags
    const scripts = tempDiv.querySelectorAll('script');
    scripts.forEach(script => {
      const newScript = document.createElement('script');
      newScript.setAttribute('data-ad-meta', 'true');
      if (script.src) {
        newScript.src = script.src;
        newScript.async = true;
      } else {
        newScript.textContent = script.textContent;
      }
      document.head.appendChild(newScript);
    });

    // Process meta tags
    const metas = tempDiv.querySelectorAll('meta');
    metas.forEach(meta => {
      const newMeta = meta.cloneNode(true) as HTMLMetaElement;
      newMeta.setAttribute('data-ad-meta', 'true');
      document.head.appendChild(newMeta);
    });

    // Process link tags
    const links = tempDiv.querySelectorAll('link');
    links.forEach(link => {
      const newLink = link.cloneNode(true) as HTMLLinkElement;
      newLink.setAttribute('data-ad-meta', 'true');
      document.head.appendChild(newLink);
    });

    // Cleanup function
    return () => {
      document.querySelectorAll('[data-ad-meta="true"]').forEach(el => el.remove());
    };
  }, [adSettings.metaTags]);

  return null;
};

export default AdMetaTags;
