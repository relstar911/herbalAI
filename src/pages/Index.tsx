
import React, { useState } from 'react';
import Header from '@/components/Header';
import QuestionnaireSelector from '@/components/QuestionnaireSelector';
import StructuredForm from '@/components/StructuredForm';
import FreeTextForm from '@/components/FreeTextForm';
import { QuestionnaireType } from '@/types';
import { Leaf } from 'lucide-react';

const Index = () => {
  const [selectedType, setSelectedType] = useState<QuestionnaireType | null>(null);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        {!selectedType ? (
          <>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-heilkunst-purple-light flex items-center justify-center animate-float">
                  <Leaf className="h-8 w-8 text-heilkunst-purple" />
                </div>
              </div>
              <h1 className="text-4xl font-semibold mb-4 text-heilkunst-green-dark">
                Willkommen beim Heilkunst-KI-Kompass
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Entdecken Sie personalisierte Empfehlungen aus der Welt der natürlichen Heilkunde. 
                Wählen Sie eine der beiden Optionen, um Ihren individuellen Weg zur Gesundheit zu beginnen.
              </p>
              
              <QuestionnaireSelector onSelect={setSelectedType} />
            </div>
            
            <div className="mt-16 bg-heilkunst-beige/30 p-6 rounded-xl">
              <h2 className="text-2xl font-semibold text-heilkunst-brown mb-4 text-center">
                Unser ganzheitlicher Ansatz
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="rounded-full bg-heilkunst-purple-light/50 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <svg className="h-8 w-8 text-heilkunst-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">Umfassendes Wissen</h3>
                  <p className="text-sm">
                    Greifen Sie auf ein breites Spektrum an Heilwissen aus verschiedenen Traditionen und Methoden zu.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="rounded-full bg-heilkunst-green-light/50 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <svg className="h-8 w-8 text-heilkunst-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">Personalisierte Empfehlungen</h3>
                  <p className="text-sm">
                    Erhalten Sie auf Ihre Situation abgestimmte Empfehlungen und alternative Optionen.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="rounded-full bg-heilkunst-beige/70 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <svg className="h-8 w-8 text-heilkunst-brown" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">Stetig wachsende Wissensbasis</h3>
                  <p className="text-sm">
                    Unsere KI lernt kontinuierlich dazu und verbessert ihre Empfehlungen mit jeder Interaktion.
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : selectedType === 'structured' ? (
          <StructuredForm />
        ) : (
          <FreeTextForm />
        )}
      </main>
      
      <footer className="bg-heilkunst-green-dark text-white py-4">
        <div className="container text-center text-sm">
          <p>© 2023 Heilkunst-KI-Kompass. Alle Angaben ohne Gewähr. Ersetzt nicht den Besuch bei einem Arzt oder Heilpraktiker.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
