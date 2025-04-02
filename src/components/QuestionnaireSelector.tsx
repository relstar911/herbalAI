
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardList, MessageSquare } from 'lucide-react';
import { QuestionnaireType } from '@/types';

interface QuestionnaireSelectorProps {
  onSelect: (type: QuestionnaireType) => void;
}

const QuestionnaireSelector: React.FC<QuestionnaireSelectorProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <Card className="relative overflow-hidden bg-gradient-to-br from-white to-heilkunst-purple-light border-heilkunst-purple/20 transition-all duration-300 hover:shadow-lg hover:border-heilkunst-purple/50">
        <CardHeader>
          <div className="absolute top-4 right-4">
            <ClipboardList className="h-8 w-8 text-heilkunst-purple" />
          </div>
          <CardTitle className="text-heilkunst-purple-dark">Strukturierter Fragebogen</CardTitle>
          <CardDescription>
            Systematisch durch vordefinierte Fragen zu Ihren Symptomen und Präferenzen
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-heilkunst-purple"></div>
              <span>Gezielte Fragen zu Symptomen</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-heilkunst-purple"></div>
              <span>Lokalisierung der Beschwerden</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-heilkunst-purple"></div>
              <span>Schweregrad und Dauer</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-heilkunst-purple"></div>
              <span>Persönliche Präferenzen</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-heilkunst-purple hover:bg-heilkunst-purple-dark" 
            onClick={() => onSelect('structured')}
          >
            Starten
          </Button>
        </CardFooter>
      </Card>

      <Card className="relative overflow-hidden bg-gradient-to-br from-white to-heilkunst-green-light border-heilkunst-green/20 transition-all duration-300 hover:shadow-lg hover:border-heilkunst-green/50">
        <CardHeader>
          <div className="absolute top-4 right-4">
            <MessageSquare className="h-8 w-8 text-heilkunst-green" />
          </div>
          <CardTitle className="text-heilkunst-green-dark">Freier Text</CardTitle>
          <CardDescription>
            Beschreiben Sie Ihre Situation mit eigenen Worten und in Ihrem eigenen Tempo
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-heilkunst-green"></div>
              <span>Unbegrenzter Textbereich</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-heilkunst-green"></div>
              <span>Kontextuelle Details</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-heilkunst-green"></div>
              <span>Persönliche Geschichte</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-heilkunst-green"></div>
              <span>Ganzheitliche Betrachtung</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-heilkunst-green hover:bg-heilkunst-green-dark" 
            onClick={() => onSelect('freeText')}
          >
            Starten
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuestionnaireSelector;
