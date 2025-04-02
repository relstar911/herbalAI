
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
  
  const [formData, setFormData] = useState<StructuredFormData>({
    symptoms: [],
    location: '',
    severity: 'moderate',
    duration: '',
    preferences: []
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.symptoms.length === 0) {
      toast({
        title: "Fehler",
        description: "Bitte wählen Sie mindestens ein Symptom aus.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, we would send this data to an API
    // For now, we'll simulate a result by setting data in localStorage
    localStorage.setItem('structuredFormData', JSON.stringify(formData));
    localStorage.setItem('questionnaireType', 'structured');
    
    // Navigate to results page
    navigate('/results');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      <Card className="border-heilkunst-purple/20">
        <CardHeader>
          <CardTitle className="text-heilkunst-purple-dark">Strukturierter Fragebogen</CardTitle>
          <CardDescription>
            Bitte füllen Sie die folgenden Informationen aus, um personalisierte Empfehlungen zu erhalten.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base">Welche Symptome haben Sie? (Mehrfachauswahl möglich)</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {commonSymptoms.map(symptom => (
                <div key={symptom} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`symptom-${symptom}`}
                    checked={formData.symptoms.includes(symptom)}
                    onCheckedChange={(checked) => 
                      handleSymptomChange(symptom, checked === true)
                    }
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
            />
          </div>
          
          <div className="space-y-3">
            <Label className="text-base">Welche Behandlungsformen bevorzugen Sie? (Mehrfachauswahl möglich)</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {treatmentPreferences.map(preference => (
                <div key={preference} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`preference-${preference}`}
                    checked={formData.preferences.includes(preference)}
                    onCheckedChange={(checked) => 
                      handlePreferenceChange(preference, checked === true)
                    }
                  />
                  <Label htmlFor={`preference-${preference}`} className="font-normal">
                    {preference}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-heilkunst-purple hover:bg-heilkunst-purple-dark">
            Empfehlungen erhalten
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default StructuredForm;
