
import React, { forwardRef } from 'react';
import { TrackData } from './TrackItem';
import { ThemeData } from './ThemeSelector';
import { cn } from '@/lib/utils';

interface ReceiptProps {
  title: string;
  artist: string;
  tracks: TrackData[];
  date: string;
  time: string;
  totalTime: string;
  producers: string;
  theme: ThemeData;
}

const Receipt = forwardRef<HTMLDivElement, ReceiptProps>(({
  title,
  artist,
  tracks,
  date,
  time,
  totalTime,
  producers,
  theme = { type: 'paper', value: 'paper' }
}, ref) => {
  // Calculate total minutes from tracks
  const calculateTotalMinutes = () => {
    // If totalTime is set manually, use that
    if (totalTime) return totalTime;
    
    // Otherwise calculate from tracks
    let totalMinutes = 0;
    let totalSeconds = 0;
    
    tracks.forEach(track => {
      const [min, sec] = track.duration.split(':').map(part => parseInt(part, 10) || 0);
      totalMinutes += min;
      totalSeconds += sec;
    });
    
    totalMinutes += Math.floor(totalSeconds / 60);
    totalSeconds = totalSeconds % 60;
    
    return `${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
  };

  const formattedDate = date || new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '.');
  
  const formattedTime = time || new Date().toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Dynamically generate the background style based on the theme
  const getBackgroundStyle = () => {
    switch (theme.type) {
      case 'solid':
        return { background: theme.value };
      case 'gradient':
        return { background: theme.value };
      case 'image':
        return { 
          backgroundImage: `url(${theme.value})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        };
      case 'paper':
      default:
        return {};
    }
  };

  return (
    <div 
      ref={ref}
      className="receipt-wrapper w-full max-w-md mx-auto bg-white shadow-lg"
    >
      <div 
        className={cn(
          "p-8 pt-10 font-mono text-gray-800 tracking-wide",
          theme.type === 'paper' ? "receipt-paper" : "",
          theme.type === 'image' ? "relative" : ""
        )}
        style={getBackgroundStyle()}
      >
        {/* Add overlay for better text readability on images or dark backgrounds */}
        {theme.type === 'image' && (
          <div className="absolute inset-0 bg-white/70"></div>
        )}
        
        {/* Content Container with proper z-index to appear above overlays */}
        <div className="relative z-10">
          {/* Title */}
          <div className="text-center mb-6 animate-fade-in">
            <h1 className="text-3xl uppercase font-bold tracking-wider mb-2">
              {title || "ALBUM TITLE"}
            </h1>
            <p className="text-sm uppercase">
              BY {artist || "ARTIST NAME"}
            </p>
          </div>
          
          {/* Track List */}
          <div className="mb-6">
            {tracks.map((track, index) => (
              <div 
                key={track.id} 
                className="flex justify-between track-list-item"
              >
                <div className="flex-1 pr-4 truncate">
                  <span className="uppercase">{track.title || `TRACK ${index + 1}`}</span>
                  {track.featuring && (
                    <span className="text-gray-600 uppercase"> (FEAT. {track.featuring})</span>
                  )}
                </div>
                <div className="text-right">
                  {track.duration || "0:00"}
                </div>
              </div>
            ))}
          </div>
          
          {/* Total Minutes */}
          <div className="flex justify-between py-1 border-t border-b border-gray-300 mb-6">
            <span className="uppercase font-bold">TOTAL MINUTES</span>
            <span>{calculateTotalMinutes()}</span>
          </div>
          
          {/* Date and ID */}
          <div className="flex justify-center mb-6 text-sm">
            <span>{formattedDate} {formattedTime} {Math.floor(Math.random() * 90 + 10)} {Math.floor(Math.random() * 90 + 10)} {Math.floor(Math.random() * 90000 + 10000)} {Math.floor(Math.random() * 9000 + 1000)}</span>
          </div>
          
          {/* Credits */}
          <div className="text-center text-sm mb-2">
            <p className="uppercase mb-2">COPYRIGHT {new Date().getFullYear()}</p>
            <p className="uppercase mb-4 whitespace-pre-wrap">
              {producers || "PRODUCED BY YOUR PRODUCERS HERE"}
            </p>
            <p className="text-xs">@ALBUMRECEIPTS</p>
          </div>
        </div>
      </div>
    </div>
  );
});

Receipt.displayName = 'Receipt';

export default Receipt;
