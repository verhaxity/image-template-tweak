
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export type ThemeType = 'solid' | 'gradient' | 'image' | 'paper';
export type ThemeData = {
  type: ThemeType;
  value: string;
};

interface ThemeSelectorProps {
  value: ThemeData;
  onChange: (theme: ThemeData) => void;
}

const SOLID_COLORS = [
  { name: 'White', value: '#ffffff' },
  { name: 'Cream', value: '#f8f5e6' },
  { name: 'Light Gray', value: '#f1f1f1' },
  { name: 'Light Blue', value: '#e6f7ff' },
  { name: 'Light Pink', value: '#ffdee2' },
  { name: 'Light Yellow', value: '#fffacd' },
];

const GRADIENTS = [
  { name: 'Sunset', value: 'linear-gradient(90deg, #ff9a9e 0%, #fad0c4 100%)' },
  { name: 'Ocean', value: 'linear-gradient(90deg, #a1c4fd 0%, #c2e9fb 100%)' },
  { name: 'Mojito', value: 'linear-gradient(90deg, #d4fc79 0%, #96e6a1 100%)' },
  { name: 'Berry', value: 'linear-gradient(90deg, #ff9a9e 0%, #fecfef 100%)' },
  { name: 'Summer', value: 'linear-gradient(90deg, #ffecd2 0%, #fcb69f 100%)' },
  { name: 'Moonlight', value: 'linear-gradient(90deg, #e3eeff 0%, #f3f8ff 100%)' },
];

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ value, onChange }) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ type: 'image', value: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium">Receipt Background</h3>
      
      <Tabs defaultValue={value.type} onValueChange={(tab) => onChange({ type: tab as ThemeType, value: tab === 'paper' ? 'paper' : value.value })}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="paper">Paper</TabsTrigger>
          <TabsTrigger value="solid">Solid</TabsTrigger>
          <TabsTrigger value="gradient">Gradient</TabsTrigger>
          <TabsTrigger value="image">Image</TabsTrigger>
        </TabsList>
        
        <TabsContent value="paper" className="pt-4">
          <div className="flex items-center justify-center p-4 border rounded-md bg-gray-50">
            <div className="w-40 h-24 receipt-paper"></div>
          </div>
        </TabsContent>
        
        <TabsContent value="solid" className="pt-4">
          <RadioGroup 
            value={value.type === 'solid' ? value.value : ''}
            onValueChange={(val) => onChange({ type: 'solid', value: val })}
            className="grid grid-cols-3 gap-2"
          >
            {SOLID_COLORS.map((color) => (
              <div key={color.value} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={color.value} 
                  id={`color-${color.value}`} 
                  className="sr-only"
                />
                <Label 
                  htmlFor={`color-${color.value}`}
                  className={cn(
                    "flex items-center justify-between w-full p-2 border rounded-md cursor-pointer hover:bg-gray-50",
                    value.type === 'solid' && value.value === color.value && "ring-2 ring-primary"
                  )}
                >
                  <span>{color.name}</span>
                  <span 
                    className="block w-6 h-6 rounded-full border" 
                    style={{ backgroundColor: color.value }}
                  />
                </Label>
              </div>
            ))}
          </RadioGroup>
        </TabsContent>
        
        <TabsContent value="gradient" className="pt-4">
          <RadioGroup 
            value={value.type === 'gradient' ? value.value : ''}
            onValueChange={(val) => onChange({ type: 'gradient', value: val })}
            className="grid grid-cols-3 gap-2"
          >
            {GRADIENTS.map((gradient) => (
              <div key={gradient.value} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={gradient.value} 
                  id={`gradient-${gradient.name}`} 
                  className="sr-only"
                />
                <Label 
                  htmlFor={`gradient-${gradient.name}`}
                  className={cn(
                    "flex flex-col items-center justify-center w-full p-2 border rounded-md cursor-pointer hover:bg-gray-50",
                    value.type === 'gradient' && value.value === gradient.value && "ring-2 ring-primary"
                  )}
                >
                  <div 
                    className="w-full h-10 rounded-md mb-1" 
                    style={{ background: gradient.value }}
                  />
                  <span className="text-xs">{gradient.name}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </TabsContent>
        
        <TabsContent value="image" className="pt-4">
          <div className="space-y-4">
            <Input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload}
              className="w-full"
            />
            
            {value.type === 'image' && value.value && (
              <div className="mt-4 border rounded-md p-2">
                <p className="text-xs text-gray-500 mb-2">Preview:</p>
                <div className="w-full aspect-video bg-cover bg-center rounded-md" style={{ backgroundImage: `url(${value.value})` }} />
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ThemeSelector;
