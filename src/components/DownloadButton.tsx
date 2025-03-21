
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { downloadReceiptAsImage } from '@/utils/downloadUtils';
import { toast } from 'sonner';

interface DownloadButtonProps {
  receiptRef: React.RefObject<HTMLDivElement>;
  filename?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ 
  receiptRef, 
  filename = 'album-receipt' 
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    try {
      await downloadReceiptAsImage(receiptRef, filename);
      toast.success('Receipt downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download receipt.');
      console.error('Download error:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button 
      onClick={handleDownload}
      disabled={isDownloading}
      className="relative overflow-hidden group transition-all duration-300"
    >
      <span className="flex items-center gap-2">
        <Download className="w-4 h-4" />
        {isDownloading ? 'Processing...' : 'Download Receipt'}
      </span>
      
      {isDownloading && (
        <div className="absolute inset-0 loading-animation"></div>
      )}
    </Button>
  );
};

export default DownloadButton;
