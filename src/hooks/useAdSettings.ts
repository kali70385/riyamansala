import { useState, useEffect } from "react";

export interface AdSettings {
  metaTags: string;
  leaderboardAdCode: string;
  inlineAdCodes: string[];
  detailPageAdCodes: {
    afterImage: string;
    afterDetails: string;
    aboveFooter: string;
  };
}

const defaultAdSettings: AdSettings = {
  metaTags: '',
  leaderboardAdCode: '',
  inlineAdCodes: ['', '', '', '', '', ''],
  detailPageAdCodes: {
    afterImage: '',
    afterDetails: '',
    aboveFooter: '',
  },
};

// Counter for rotating inline ads
let inlineAdCounter = 0;

export const useAdSettings = () => {
  const [adSettings, setAdSettings] = useState<AdSettings>(defaultAdSettings);

  useEffect(() => {
    const savedAdSettings = localStorage.getItem('adSettings');
    if (savedAdSettings) {
      try {
        setAdSettings(JSON.parse(savedAdSettings));
      } catch (e) {
        console.error('Failed to parse ad settings:', e);
      }
    }
  }, []);

  return adSettings;
};

export const getNextInlineAdCode = (adSettings: AdSettings): string => {
  const codes = adSettings.inlineAdCodes.filter(code => code.trim() !== '');
  if (codes.length === 0) return '';
  
  const code = codes[inlineAdCounter % codes.length];
  inlineAdCounter++;
  return code;
};

export const resetInlineAdCounter = () => {
  inlineAdCounter = 0;
};
