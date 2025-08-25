import React, { useEffect } from 'react';

interface AdSenseAdProps {
  className?: string;
  adSlot?: string;
}

export const AdSenseAd: React.FC<AdSenseAdProps> = ({ 
  className = "",
  adSlot = "9400723506"
}) => {
  useEffect(() => {
    try {
      // Push the ad to AdSense
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`ad-container ${className}`}>
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-9640347463461021"
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};