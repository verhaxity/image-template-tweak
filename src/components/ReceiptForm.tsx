
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import TrackItem, { TrackData } from './TrackItem';
import { Label } from '@/components/ui/label';

interface ReceiptFormProps {
  onUpdate: (formData: ReceiptFormData) => void;
}

export interface ReceiptFormData {
  title: string;
  artist: string;
  tracks: TrackData[];
  date: string;
  time: string;
  totalTime: string;
  producers: string;
}

const generateId = () => `track-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

const defaultTrack = (): TrackData => ({
  id: generateId(),
  title: '',
  duration: '',
  featuring: ''
});

const ReceiptForm: React.FC<ReceiptFormProps> = ({ onUpdate }) => {
  const [formData, setFormData] = useState<ReceiptFormData>({
    title: 'PLAYBOI CARTI',
    artist: 'PLAYBOI CARTI',
    tracks: [
      { id: generateId(), title: 'LOCATION', duration: '2:49', featuring: '' },
      { id: generateId(), title: 'MAGNOLIA', duration: '3:02', featuring: '' },
      { id: generateId(), title: 'LOOKIN', duration: '3:04', featuring: 'LIL UZI VERT' },
      { id: generateId(), title: 'WOKEUPLIKETHIS*', duration: '3:56', featuring: 'LIL UZI VERT' },
      { id: generateId(), title: 'LET IT GO', duration: '2:30', featuring: '' },
      { id: generateId(), title: 'HALF & HALF', duration: '3:47', featuring: '' },
      { id: generateId(), title: 'NEW CHOPPA', duration: '2:06', featuring: 'A$AP ROCKY' },
      { id: generateId(), title: 'OTHER SHIT', duration: '2:50', featuring: '' },
    ],
    date: '14.04.2017',
    time: '04:14',
    totalTime: '46:50',
    producers: 'PRODUCED BY A$AP ROCKY, CHACE JOHNSON, HARRY FRAUD, HIT-BOY, J, CASH BEATZ, JAKE ONE, JSTSEMOTHEBEAT, K-MAJOR, KASIIMGOTJUICE, MEXIKODRO, MURDA KID, PIERRE BOURNE, ROARK BAILEY, RICCI RIERA, SOUTHSIDE'
  });

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const updateField = (field: keyof ReceiptFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTrackChange = (id: string, field: keyof TrackData, value: string) => {
    setFormData(prev => ({
      ...prev,
      tracks: prev.tracks.map(track => 
        track.id === id ? { ...track, [field]: value } : track
      )
    }));
  };

  const addTrack = () => {
    setFormData(prev => ({
      ...prev,
      tracks: [...prev.tracks, defaultTrack()]
    }));
  };

  const removeTrack = (id: string) => {
    setFormData(prev => ({
      ...prev,
      tracks: prev.tracks.filter(track => track.id !== id)
    }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Customize Your Receipt</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Album Title</Label>
            <Input
              id="title"
              placeholder="Album Title"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              className="font-mono uppercase"
            />
          </div>
          <div>
            <Label htmlFor="artist">Artist</Label>
            <Input
              id="artist"
              placeholder="Artist Name"
              value={formData.artist}
              onChange={(e) => updateField('artist', e.target.value)}
              className="font-mono uppercase"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="date">Date (DD.MM.YYYY)</Label>
            <Input
              id="date"
              placeholder="DD.MM.YYYY"
              value={formData.date}
              onChange={(e) => updateField('date', e.target.value)}
              className="font-mono"
            />
          </div>
          <div>
            <Label htmlFor="time">Time (HH:MM)</Label>
            <Input
              id="time"
              placeholder="HH:MM"
              value={formData.time}
              onChange={(e) => updateField('time', e.target.value)}
              className="font-mono"
            />
          </div>
          <div>
            <Label htmlFor="totalTime">Total Time (MM:SS)</Label>
            <Input
              id="totalTime"
              placeholder="MM:SS"
              value={formData.totalTime}
              onChange={(e) => updateField('totalTime', e.target.value)}
              className="font-mono"
            />
          </div>
        </div>

        <div>
          <Label>Tracks</Label>
          <div className="space-y-1 mb-3">
            {formData.tracks.map((track, index) => (
              <TrackItem
                key={track.id}
                track={track}
                onChange={handleTrackChange}
                onRemove={removeTrack}
                index={index}
              />
            ))}
          </div>
          <Button 
            type="button" 
            onClick={addTrack}
            variant="outline"
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Track
          </Button>
        </div>

        <div>
          <Label htmlFor="producers">Producers/Credits</Label>
          <Textarea
            id="producers"
            placeholder="List all producers and credits here"
            value={formData.producers}
            onChange={(e) => updateField('producers', e.target.value)}
            rows={3}
            className="font-mono uppercase text-sm"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ReceiptForm;
