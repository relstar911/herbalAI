
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FreeTextFormData } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/auth';
import { saveFreeTextQuestionnaire } from '@/lib/api';
import AuthModal from './AuthModal';
import { Loader2 } from 'lucide-react';

const FreeTextForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState<FreeTextFormData>({
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.description.trim().length < 20) {
      toast({
        title: "Beschreibung zu kurz",
        description: "Bitte gib eine ausführlichere Beschreibung deiner Situation ein.",
        variant: "destructive"
      });
      return;
    }
    
    // Speichern in localStorage für nicht angemeldete Benutzer
    localStorage.setItem('freeTextFormData', JSON.stringify(formData));
    localStorage.setItem('questionnaireType', 'freeText');
    
    try {
      setIsSubmitting(true);
      const result = await saveFreeTextQuestionnaire(formData, user?.id);
      
      // Navigiere zur Ergebnisseite mit den erhaltenen Daten
      navigate('/results', { state: { result } });
    } catch (error) {
      console.error("Fehler beim Verarbeiten des Fragebogens:", error);
      toast({
        title: "Fehler",
        description: "Bei der Verarbeitung ist ein Fehler aufgetreten. Bitte versuche es später erneut.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  const handleAuthPrompt = () => {
    setShowAuthModal(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <Card className="border-heilkunst-green/20">
          <CardHeader>
            <CardTitle className="text-heilkunst-green-dark">Freier Text Fragebogen</CardTitle>
            <CardDescription>
              Beschreibe deine Symptome, Situation und Bedürfnisse mit deinen eigenen Worten.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="description" className="text-base">
                Deine Beschreibung
              </Label>
              <Textarea 
                id="description"
                placeholder="Beschreibe deine Symptome, deren Dauer, Intensität und Kontext. Je mehr Details du angibst, desto präziser können wir dir helfen. Erwähne auch bisherige Therapien oder Behandlungspräferenzen."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="min-h-[200px] heilkunst-input"
                disabled={isSubmitting}
              />
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">Hilfreiche Informationen, die du erwähnen kannst:</h4>
              <ul className="text-sm space-y-1">
                <li>• Wann haben die Symptome begonnen?</li>
                <li>• Gibt es bestimmte Auslöser oder Verschlimmerungsfaktoren?</li>
                <li>• Hast du bereits bestimmte Mittel oder Behandlungen versucht?</li>
                <li>• Leidest du an chronischen Erkrankungen oder Allergien?</li>
                <li>• Nimmst du regelmäßig Medikamente ein?</li>
                <li>• Gibt es besondere Umstände in deinem Lebensstil oder Umfeld zu beachten?</li>
              </ul>
            </div>
            
            {!user && (
              <div className="bg-heilkunst-purple-light/30 p-4 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center">
                  <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Tipp für personalisierte Empfehlungen
                </h4>
                <p className="text-sm">
                  <button 
                    type="button" 
                    className="text-heilkunst-purple hover:text-heilkunst-purple-dark font-medium underline"
                    onClick={handleAuthPrompt}
                  >
                    Melde dich an
                  </button>
                  {" "}oder{" "}
                  <button 
                    type="button" 
                    className="text-heilkunst-purple hover:text-heilkunst-purple-dark font-medium underline"
                    onClick={handleAuthPrompt}
                  >
                    erstelle ein Konto
                  </button>
                  , um deine Anfragen und Empfehlungen zu speichern und jederzeit wieder aufzurufen.
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-heilkunst-green hover:bg-heilkunst-green-dark"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Empfehlungen werden generiert...
                </>
              ) : (
                'Empfehlungen erhalten'
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default FreeTextForm;
