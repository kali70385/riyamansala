import { useEffect, useRef } from "react";
import { useAdSettings, getNextInlineAdCode } from "@/hooks/useAdSettings";

interface AdSpaceProps {
  variant: "leaderboard" | "inline";
  className?: string;
  placement?: "afterImage" | "afterDetails" | "aboveFooter";
}

const AdSpace = ({ variant, className = "", placement }: AdSpaceProps) => {
  const adSettings = useAdSettings();
  const adContainerRef = useRef<HTMLDivElement>(null);

  // Get the appropriate ad code based on variant and placement
  const getAdCode = (): string => {
    if (variant === "leaderboard") {
      return adSettings.leaderboardAdCode || '';
    }
    
    if (variant === "inline" && placement) {
      return adSettings.detailPageAdCodes[placement] || '';
    }
    
    // For inline ads in listings grid (rotating)
    if (variant === "inline") {
      return getNextInlineAdCode(adSettings);
    }
    
    return '';
  };

  const adCode = getAdCode();

  // Render the ad code as HTML
  useEffect(() => {
    if (adContainerRef.current && adCode) {
      // Clear previous content
      adContainerRef.current.innerHTML = '';
      
      // Parse and execute the ad code
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = adCode;
      
      // Handle script tags separately
      const scripts = tempDiv.querySelectorAll('script');
      scripts.forEach(script => {
        const newScript = document.createElement('script');
        if (script.src) {
          newScript.src = script.src;
          newScript.async = true;
        } else {
          newScript.textContent = script.textContent;
        }
        script.remove();
        adContainerRef.current?.appendChild(newScript);
      });
      
      // Append remaining content
      while (tempDiv.firstChild) {
        adContainerRef.current.appendChild(tempDiv.firstChild);
      }
    }
  }, [adCode]);

  if (variant === "leaderboard") {
    return (
      <div className={`w-full flex justify-center py-3 ${className}`}>
        {adCode ? (
          <div 
            ref={adContainerRef}
            className="w-[320px] h-[50px] md:w-[728px] md:h-[90px] flex items-center justify-center"
          />
        ) : (
          <div className="bg-muted border border-border rounded-lg flex items-center justify-center w-[320px] h-[50px] md:w-[728px] md:h-[90px]">
            <span className="text-xs text-muted-foreground">Advertisement</span>
          </div>
        )}
      </div>
    );
  }

  // Inline ad
  return (
    <div className={`w-full flex justify-center py-4 ${className}`}>
      {adCode ? (
        <div 
          ref={adContainerRef}
          className="w-[300px] h-[250px] flex items-center justify-center"
        />
      ) : (
        <div className="bg-muted border border-border rounded-lg flex items-center justify-center w-[300px] h-[250px]">
          <span className="text-xs text-muted-foreground">Advertisement</span>
        </div>
      )}
    </div>
  );
};

export default AdSpace;
