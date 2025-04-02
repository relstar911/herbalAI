
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { StructuredFormData } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/auth';
import { saveStructuredQuestionnaire } from '@/lib/api';
import AuthModal from './AuthModal';
import { Loader2 } from 'lucide-react';

const commonSymptoms = [
  'Kopfschmerzen',
  'Müdigkeit',
  'Schlafprobleme',
  'Verdauungsprobleme',
  'Hautausschlag',
  'Schmerzen im Rücken',
  'Gelenkschmerzen',
  'Stress',
  'Konzentrationsschwäche',
  'Allergiesymptome'
];

const treatmentPreferences = [
  'Pflanzliche Heilmittel',
  'Homöopathie',
  'Aromatherapie',
  'Traditionelle Medizin',
  'Akupunktur',
  'Nahrungsergänzungsmittel',
  'Natürliche Anwendungen'
];

const StructuredForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState<StructuredFormData>({
    symptoms: [],
    location: '',
    severity: 'moderate',
    duration: '',
    preferences: []
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      symptoms: checked 
        ? [...prev.symptoms, symptom]
        : prev.symptoms.filter(s => s !== symptom)
    }));
  };

  const handlePreferenceChange = (preference: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      preferences: checked 
        ? [...prev.preferences, preference]
        : prev.preferences.filter(p => p !== preference)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.symptoms.length === 0) {
      toast({
        title: "Fehler",
        description: "Bitte wähle mindestens ein Symptom aus.",
        variant: "destructive"
      });
      return;
    }
    
    // Speichern in localStorage für nicht angemeldete Benutzer
    localStorage.setItem('structuredFormData', JSON.stringify(formData));
    localStorage.setItem('questionnaireType', 'structured');
    
    try {
      setIsSubmitting(true);
      const result = await saveStructuredQuestionnaire(formData, user?.id);
      
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
        <Card className="border-heilkunst-purple/20">
          <CardHeader>
            <CardTitle className="text-heilkunst-purple-dark">Strukturierter Fragebogen</CardTitle>
            <CardDescription>
              Bitte fülle die folgenden Informationen aus, um personalisierte Empfehlungen zu erhalten.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base">Welche Symptome hast du? (Mehrfachauswahl möglich)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {commonSymptoms.map(symptom => (
                  <div key={symptom} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`symptom-${symptom}`}
                      checked={formData.symptoms.includes(symptom)}
                      onCheckedChange={(checked) => 
                        handleSymptomChange(symptom, checked === true)
                      }
                      disabled={isSubmitting}
                    />
                    <Label htmlFor={`symptom-${symptom}`} className="font-normal">
                      {symptom}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="location" className="text-base">
                Wo sind die Symptome lokalisiert?
              </Label>
              <Input 
                id="location"
                placeholder="z.B. Kopf, Gelenke, Bauch"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full heilkunst-input"
                disabled={isSubmitting}
              />
            </div>
            
            <div className="space-y-3">
              <Label className="text-base">Schweregrad der Symptome</Label>
              <RadioGroup
                value={formData.severity}
                onValueChange={(value: 'mild' | 'moderate' | 'severe') => 
                  setFormData(prev => ({ ...prev, severity: value }))
                }
                className="flex flex-col space-y-1"
                disabled={isSubmitting}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mild" id="mild" />
                  <Label htmlFor="mild" className="font-normal">Leicht - kaum Einschränkungen im Alltag</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="moderate" />
                  <Label htmlFor="moderate" className="font-normal">Mittel - spürbare Einschränkungen im Alltag</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="severe" id="severe" />
                  <Label htmlFor="severe" className="font-normal">Stark - erhebliche Einschränkungen im Alltag</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="duration" className="text-base">
                Wie lange bestehen die Symptome bereits?
              </Label>
              <Input 
                id="duration"
                placeholder="z.B. 3 Tage, 2 Wochen, 6 Monate"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full heilkunst-input"
                disabled={isSubmitting}
              />
            </div>
            
            <div className="space-y-3">
              <Label className="text-base">Welche Behandlungsformen bevorzugst du? (Mehrfachauswahl möglich)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {treatmentPreferences.map(preference => (
                  <div key={preference} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`preference-${preference}`}
                      checked={formData.preferences.includes(preference)}
                      onCheckedChange={(checked) => 
                        handlePreferenceChange(preference, checked === true)
                      }
                      disabled={isSubmitting}
                    />
                    <Label htmlFor={`preference-${preference}`} className="font-normal">
                      {preference}
                    </Label>
                  </div>
                ))}
              </div>
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
              className="w-full bg-heilkunst-purple hover:bg-heilkunst-purple-dark"
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

export default StructuredForm;
