
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import ResultsDisplay from '@/components/ResultsDisplay';
import { Button } from '@/components/ui/button';
import { QuestionnaireResult } from '@/types';
import { ArrowLeft, Save, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for the results
const mockResult: QuestionnaireResult = {
  id: "xyz789",
  type: "combined",
  inputs: {
    structured: {
      symptoms: ["Kopfschmerzen", "Müdigkeit"],
      location: "Stirn und Schläfen",
      severity: "mittel",
      duration: "2 Tage",
      preferences: ["natürliche Mittel"]
    },
    freeText: "Ich arbeite viel am Computer und schlafe schlecht."
  },
  research: {
    contextAnalysis: "Die Symptome könnten mit Bildschirmarbeit, Überlastung und Schlafmangel zusammenhängen. Eine Kombination aus natürlichen Heilmitteln zur schnellen Linderung und präventiven Maßnahmen kann hilfreich sein.",
    relevantCategories: ["Natürliche Heilmittel", "Heilpraktiken und Methoden", "Symptome und Beschwerden"]
  },
  results: [
    {
      solution: {
        category: "Natürliche Heilmittel",
        suggestion: "Pfefferminzöl",
        application: "Auf Schläfen auftragen, 2x täglich",
        effect: "Kühlt und lindert Spannungskopfschmerzen",
        precaution: "Nicht bei empfindlicher Haut unverdünnt verwenden"
      },
      alternative: {
        suggestion: "Lavendeltee",
        application: "1 Tasse vor dem Schlafengehen",
        effect: "Beruhigt und fördert Schlaf"
      },
      supplement: {
        suggestion: "Digitale Auszeit",
        reason: "Eine Stunde vor dem Schlafengehen Bildschirme vermeiden fördert die Melatoninproduktion"
      }
    },
    {
      solution: {
        category: "Heilpraktiken",
        suggestion: "Progressive Muskelentspannung",
        application: "15 Minuten täglich, vorzugsweise am Abend",
        effect: "Reduziert Verspannungen und verbessert Schlafqualität"
      },
      alternative: {
        suggestion: "Kalte Kompresse",
        application: "10 Minuten auf Stirn und Schläfen auflegen",
        effect: "Lindert akute Kopfschmerzen durch Gefäßverengung"
      }
    }
  ]
};

const Results = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [result, setResult] = useState<QuestionnaireResult | null>(null);
  
  useEffect(() => {
    // In a real application, we would fetch results from an API
    // For now, we'll simulate this with a mock result
    const questionnaireType = localStorage.getItem('questionnaireType');
    
    if (questionnaireType === 'structured') {
      const formData = localStorage.getItem('structuredFormData');
      if (formData) {
        // Create a customized result based on the form data
        // For this demo, we'll use the mock result
        setResult(mockResult);
      } else {
        navigate('/');
      }
    } else if (questionnaireType === 'freeText') {
      const formData = localStorage.getItem('freeTextFormData');
      if (formData) {
        // Create a customized result based on the form data
        // For this demo, we'll use the mock result
        setResult(mockResult);
      } else {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);
  
  const handleSave = () => {
    toast({
      title: "Gespeichert",
      description: "Ihre Ergebnisse wurden erfolgreich gespeichert."
    });
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        toast({
          title: "Link kopiert",
          description: "Der Link zu Ihren Ergebnissen wurde in die Zwischenablage kopiert."
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
  
  if (!result) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 container py-8 flex items-center justify-center">
          <div className="animate-pulse text-lg text-heilkunst-purple">
            Empfehlungen werden generiert...
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
              Ihre Empfehlungen
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
    </div>
  );
};

export default Results;
