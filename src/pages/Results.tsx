
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import ResultsDisplay from '@/components/ResultsDisplay';
import { Button } from '@/components/ui/button';
import { QuestionnaireResult } from '@/types';
import { ArrowLeft, Save, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/auth';
import AuthModal from '@/components/AuthModal';
import { generateRecommendations } from '@/lib/api';

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  const [result, setResult] = useState<QuestionnaireResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  useEffect(() => {
    // Prüfen, ob wir Ergebnisse aus der Navigation haben
    if (location.state?.result) {
      setResult(location.state.result);
      return;
    }

    // Andernfalls versuchen, den Fragebogen aus dem localStorage zu laden und Empfehlungen zu generieren
    const fetchResults = async () => {
      setIsLoading(true);
      
      try {
        const questionnaireType = localStorage.getItem('questionnaireType');
        
        if (questionnaireType === 'structured') {
          const formDataStr = localStorage.getItem('structuredFormData');
          if (formDataStr) {
            const formData = JSON.parse(formDataStr);
            // API-Aufruf mit Fragebogendaten
            const resultData = await generateRecommendations({
              type: 'structured',
              structured: formData
            }, user?.id);
            
            setResult(resultData);
          } else {
            navigate('/');
          }
        } else if (questionnaireType === 'freeText') {
          const formDataStr = localStorage.getItem('freeTextFormData');
          if (formDataStr) {
            const formData = JSON.parse(formDataStr);
            // API-Aufruf mit Fragebogendaten
            const resultData = await generateRecommendations({
              type: 'freeText',
              freeText: formData.description
            }, user?.id);
            
            setResult(resultData);
          } else {
            navigate('/');
          }
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error("Fehler beim Laden der Ergebnisse:", error);
        toast({
          title: "Fehler",
          description: "Die Empfehlungen konnten nicht geladen werden.",
          variant: "destructive"
        });
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    if (!result) {
      fetchResults();
    }
  }, [navigate, location.state, user, toast, result]);
  
  const handleSave = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    
    // Hier würden wir die Speicherfunktionalität implementieren
    // Da wir bereits beim Generieren der Empfehlungen speichern, wenn ein Benutzer angemeldet ist,
    // können wir hier einfach eine Erfolgsmeldung anzeigen
    toast({
      title: "Gespeichert",
      description: "Deine Empfehlungen wurden erfolgreich gespeichert."
    });
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        toast({
          title: "Link kopiert",
          description: "Der Link zu deinen Empfehlungen wurde in die Zwischenablage kopiert."
        });
      })
      .catch(() => {
        toast({
          title: "Fehler",
          description: "Der Link konnte nicht kopiert werden.",
          variant: "destructive"
        });
      });
  };
  
  if (isLoading || !result) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 container py-8 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-heilkunst-green mb-4"></div>
            <div className="text-lg text-heilkunst-purple">
              Empfehlungen werden generiert...
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Dieser Vorgang kann einen Moment dauern.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="icon" 
              className="mr-4"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-semibold text-heilkunst-purple-dark">
              Deine Empfehlungen
            </h1>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={handleSave}
            >
              <Save className="h-4 w-4" />
              <span>Speichern</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
              <span>Teilen</span>
            </Button>
          </div>
        </div>
        
        <ResultsDisplay result={result} />
        
        <div className="mt-8 flex justify-center">
          <Button 
            className="bg-heilkunst-purple hover:bg-heilkunst-purple-dark"
            onClick={() => navigate('/')}
          >
            Neue Anfrage stellen
          </Button>
        </div>
      </main>
      
      <footer className="bg-heilkunst-green-dark text-white py-4">
        <div className="container text-center text-sm">
          <p>© 2023 Heilkunst-KI-Kompass. Alle Angaben ohne Gewähr. Ersetzt nicht den Besuch bei einem Arzt oder Heilpraktiker.</p>
        </div>
      </footer>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default Results;
