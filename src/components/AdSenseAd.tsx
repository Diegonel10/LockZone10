import React, { useEffect, useRef } from 'react';

interface AdSenseAdProps {
  adSlot: string;
  adFormat?: string;
  width?: number;
  height?: number;
  onAdLoaded?: () => void;
  onAdFailed?: () => void;
}

export const AdSenseAd: React.FC<AdSenseAdProps> = ({
  adSlot,
  adFormat = 'auto',
  width,
  height,
  onAdLoaded,
  onAdFailed
}) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      console.log('AdSense: Checking if adsbygoogle is available...');
      console.log('Window object:', typeof window);
      console.log('AdSense script loaded:', !!(window as any).adsbygoogle);
      
      // Check if AdSense is available
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        console.log('AdSense: Pushing ad to queue...');
        // Push the ad to AdSense
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        console.log('AdSense: Ad pushed successfully');
        onAdLoaded?.();
      } else {
        // AdSense not loaded, fallback
        console.warn('AdSense: Script not available, using fallback');
        onAdFailed?.();
      }
    } catch (error) {
      console.error('AdSense error:', error);
      onAdFailed?.();
    }
  }, [onAdLoaded, onAdFailed]);

  return (
    <div ref={adRef} className="w-full flex justify-center">
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : 'auto'
        }}
        data-ad-client="ca-pub-9640347463461021"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
};