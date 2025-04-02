
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

const FreeTextForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FreeTextFormData>({
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.description.trim().length < 20) {
      toast({
        title: "Beschreibung zu kurz",
        description: "Bitte geben Sie eine ausführlichere Beschreibung Ihrer Situation ein.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, we would send this data to an API
    // For now, we'll simulate a result by setting data in localStorage
    localStorage.setItem('freeTextFormData', JSON.stringify(formData));
    localStorage.setItem('questionnaireType', 'freeText');
    
    // Navigate to results page
    navigate('/results');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      <Card className="border-heilkunst-green/20">
        <CardHeader>
          <CardTitle className="text-heilkunst-green-dark">Freier Text Fragebogen</CardTitle>
          <CardDescription>
            Beschreiben Sie Ihre Symptome, Situation und Bedürfnisse mit Ihren eigenen Worten.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="description" className="text-base">
              Ihre Beschreibung
            </Label>
            <Textarea 
              id="description"
              placeholder="Beschreiben Sie Ihre Symptome, deren Dauer, Intensität und Kontext. Je mehr Details Sie angeben, desto präziser können wir Ihnen helfen. Erwähnen Sie auch bisherige Therapien oder Behandlungspräferenzen."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="min-h-[200px] heilkunst-input"
            />
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2">Hilfreiche Informationen, die Sie erwähnen können:</h4>
            <ul className="text-sm space-y-1">
              <li>• Wann haben die Symptome begonnen?</li>
              <li>• Gibt es bestimmte Auslöser oder Verschlimmerungsfaktoren?</li>
              <li>• Haben Sie bereits bestimmte Mittel oder Behandlungen versucht?</li>
              <li>• Leiden Sie an chronischen Erkrankungen oder Allergien?</li>
              <li>• Nehmen Sie regelmäßig Medikamente ein?</li>
              <li>• Gibt es besondere Umstände in Ihrem Lebensstil oder Umfeld zu beachten?</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-heilkunst-green hover:bg-heilkunst-green-dark">
            Empfehlungen erhalten
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default FreeTextForm;
