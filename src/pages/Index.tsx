
import React, { useState, useRef } from 'react';
import ReceiptForm, { ReceiptFormData } from '@/components/ReceiptForm';
import Receipt from '@/components/Receipt';
import DownloadButton from '@/components/DownloadButton';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [receiptData, setReceiptData] = useState<ReceiptFormData>({
    title: 'PLAYBOI CARTI',
    artist: 'PLAYBOI CARTI',
    tracks: [],
    date: '',
    time: '',
    totalTime: '',
    producers: ''
  });
  
  const receiptRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const handleFormUpdate = (formData: ReceiptFormData) => {
    setReceiptData(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto py-6 px-4">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Album Receipt Generator</h1>
          <p className="text-gray-500 mt-1">Create and download custom album receipts</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Form */}
          <div className="order-2 lg:order-1 animate-fade-in">
            <ReceiptForm onUpdate={handleFormUpdate} />
            <div className="mt-6 flex justify-center">
              <DownloadButton 
                receiptRef={receiptRef} 
                filename={`${receiptData.title || 'album'}-receipt`} 
              />
            </div>
          </div>

          {/* Right side - Preview */}
          <div className="order-1 lg:order-2 animate-fade-in">
            <div className="bg-white p-6 rounded-lg shadow-md mb-4">
              <h2 className="text-lg font-medium mb-4">Live Preview</h2>
              <div className="bg-gray-100 p-4 rounded-md overflow-hidden">
                <Receipt
                  ref={receiptRef}
                  title={receiptData.title}
                  artist={receiptData.artist}
                  tracks={receiptData.tracks}
                  date={receiptData.date}
                  time={receiptData.time}
                  totalTime={receiptData.totalTime}
                  producers={receiptData.producers}
                />
              </div>
            </div>
            {/* Mobile download button */}
            {isMobile && (
              <div className="flex justify-center mb-8">
                <DownloadButton 
                  receiptRef={receiptRef} 
                  filename={`${receiptData.title || 'album'}-receipt`} 
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>Create custom album receipts inspired by the style of @albumreceipts</p>
          <p className="mt-2">Built with React • All data is processed locally in your browser</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
