
import html2canvas from 'html2canvas';

export const downloadReceiptAsImage = async (receiptRef: React.RefObject<HTMLDivElement>, filename: string = 'album-receipt') => {
  if (!receiptRef.current) return;
  
  try {
    const canvas = await html2canvas(receiptRef.current, {
      scale: 2, // Higher resolution
      backgroundColor: 'white',
      logging: false,
      allowTaint: true,
      useCORS: true
    });
    
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = `${filename.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.click();
  } catch (error) {
    console.error('Error generating image:', error);
  }
};
