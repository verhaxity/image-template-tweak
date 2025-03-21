
import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TrackItem, { TrackData } from './TrackItem';
import ThemeSelector, { ThemeData } from './ThemeSelector';

export interface ReceiptFormData {
  title: string;
  artist: string;
  tracks: TrackData[];
  date: string;
  time: string;
  totalTime: string;
  producers: string;
  theme: ThemeData;
}

interface ReceiptFormProps {
  onUpdate: (data: ReceiptFormData) => void;
}

const ReceiptForm: React.FC<ReceiptFormProps> = ({ onUpdate }) => {
  const [formData, setFormData] = useState<ReceiptFormData>({
    title: '',
    artist: '',
    tracks: [],
    date: '',
    time: '',
    totalTime: '',
    producers: '',
    theme: { type: 'paper', value: 'paper' }
  });

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Add a new track
  const addTrack = () => {
    const newTrack: TrackData = {
      id: uuidv4(),
      title: '',
      duration: '',
      featuring: ''
    };
    
    setFormData(prev => ({
      ...prev,
      tracks: [...prev.tracks, newTrack]
    }));
  };

  // Update a track
  const updateTrack = (updatedTrack: TrackData) => {
    setFormData(prev => ({
      ...prev,
      tracks: prev.tracks.map(track => 
        track.id === updatedTrack.id ? updatedTrack : track
      )
    }));
  };

  // Remove a track
  const removeTrack = (trackId: string) => {
    setFormData(prev => ({
      ...prev,
      tracks: prev.tracks.filter(track => track.id !== trackId)
    }));
  };

  // Handle theme changes
  const handleThemeChange = (theme: ThemeData) => {
    setFormData(prev => ({ ...prev, theme }));
  };

  // Calculate total time from tracks
  useEffect(() => {
    let totalMinutes = 0;
    let totalSeconds = 0;
    
    formData.tracks.forEach(track => {
      const [min, sec] = track.duration.split(':').map(part => parseInt(part, 10) || 0);
      totalMinutes += min;
      totalSeconds += sec;
    });
    
    totalMinutes += Math.floor(totalSeconds / 60);
    totalSeconds = totalSeconds % 60;
    
    const calculatedTotalTime = `${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
    
    if (!formData.totalTime || formData.totalTime !== calculatedTotalTime) {
      setFormData(prev => ({ ...prev, totalTime: calculatedTotalTime }));
    }
  }, [formData.tracks, formData.totalTime]);

  // Update parent component when form data changes
  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-slide-up">
      <h2 className="text-xl font-semibold mb-6">Receipt Details</h2>
      
      <div className="space-y-6">
        {/* Album Info */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Album Title</Label>
            <Input 
              id="title" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              placeholder="Enter album title"
            />
          </div>
          
          <div>
            <Label htmlFor="artist">Artist</Label>
            <Input 
              id="artist" 
              name="artist" 
              value={formData.artist} 
              onChange={handleChange} 
              placeholder="Enter artist name"
            />
          </div>
        </div>
        
        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="date">Date (Optional)</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <Label htmlFor="time">Time (Optional)</Label>
            <Input
              id="time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
            />
          </div>
        </div>
        
        {/* Tracks Section */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <Label>Tracks</Label>
            <Button 
              type="button" 
              onClick={addTrack} 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Add Track</span>
            </Button>
          </div>
          
          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {formData.tracks.length === 0 ? (
              <p className="text-sm text-gray-500 italic text-center py-4">
                No tracks added yet. Click "Add Track" to get started.
              </p>
            ) : (
              formData.tracks.map((track, index) => (
                <TrackItem
                  key={track.id}
                  track={track}
                  index={index}
                  onUpdate={updateTrack}
                  onRemove={() => removeTrack(track.id)}
                />
              ))
            )}
          </div>
        </div>
        
        {/* Total Time - Manual Override */}
        <div>
          <Label htmlFor="totalTime">Total Time (Optional)</Label>
          <Input
            id="totalTime"
            name="totalTime"
            value={formData.totalTime}
            onChange={handleChange}
            placeholder="Override calculated total (e.g. 45:30)"
          />
          <p className="text-xs text-gray-500 mt-1">
            Leave empty to auto-calculate from tracks
          </p>
        </div>
        
        {/* Producer Credits */}
        <div>
          <Label htmlFor="producers">Producer Credits</Label>
          <Input
            id="producers"
            name="producers"
            value={formData.producers}
            onChange={handleChange}
            placeholder="PRODUCED BY YOUR PRODUCERS HERE"
          />
        </div>
        
        {/* Theme Selector */}
        <ThemeSelector
          value={formData.theme}
          onChange={handleThemeChange}
        />
      </div>
    </div>
  );
};

export default ReceiptForm;
