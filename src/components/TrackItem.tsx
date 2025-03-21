
import React from 'react';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface TrackData {
  id: string;
  title: string;
  duration: string;
  featuring?: string;
}

interface TrackItemProps {
  track: TrackData;
  onChange: (id: string, field: keyof TrackData, value: string) => void;
  onRemove: (id: string) => void;
  index: number;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, onChange, onRemove, index }) => {
  return (
    <div className="grid grid-cols-12 gap-2 mb-2 items-center animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
      <div className="col-span-6 sm:col-span-5">
        <Input 
          placeholder="TRACK TITLE"
          value={track.title}
          onChange={(e) => onChange(track.id, 'title', e.target.value)}
          className="font-mono text-sm uppercase"
        />
      </div>
      
      <div className="col-span-4 sm:col-span-5">
        <Input 
          placeholder="FEAT. ARTIST (optional)"
          value={track.featuring || ''}
          onChange={(e) => onChange(track.id, 'featuring', e.target.value)}
          className="font-mono text-sm uppercase"
        />
      </div>
      
      <div className="col-span-1">
        <Input 
          placeholder="0:00"
          value={track.duration}
          onChange={(e) => onChange(track.id, 'duration', e.target.value)}
          className="font-mono text-sm"
        />
      </div>
      
      <div className="col-span-1 flex justify-end">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onRemove(track.id)}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TrackItem;
