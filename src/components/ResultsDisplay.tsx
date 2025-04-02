
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { QuestionnaireResult } from '@/types';
import { Leaf, Lightbulb, RefreshCcw } from 'lucide-react';

interface ResultsDisplayProps {
  result: QuestionnaireResult;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-heilkunst-purple-light to-heilkunst-green-light p-6 rounded-xl">
        <h2 className="text-2xl font-semibold text-heilkunst-purple-dark mb-2">
          Analyse
        </h2>
        <p className="text-gray-700">{result.research.contextAnalysis}</p>
        <div className="mt-4">
          <h3 className="font-medium text-heilkunst-green-dark mb-1">Relevante Kategorien:</h3>
          <div className="flex flex-wrap gap-2">
            {result.research.relevantCategories.map((category, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-white/50 backdrop-blur-sm rounded-full text-sm"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {result.results.map((item, index) => (
          <div key={index} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="border-heilkunst-green/20 bg-gradient-to-br from-white to-heilkunst-green-light/30">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-heilkunst-green-dark flex items-center gap-2">
                    <Leaf className="h-5 w-5" />
                    Empfehlung
                  </CardTitle>
                  <span className="px-2 py-0.5 bg-heilkunst-green-light/50 text-xs rounded-full">
                    {item.solution.category}
                  </span>
                </div>
                <CardDescription>{item.solution.suggestion}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm">Anwendung:</h4>
                    <p className="text-sm">{item.solution.application}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Wirkung:</h4>
                    <p className="text-sm">{item.solution.effect}</p>
                  </div>
                  {item.solution.precaution && (
                    <div>
                      <h4 className="font-medium text-sm text-amber-600">Vorsicht:</h4>
                      <p className="text-sm text-amber-700">{item.solution.precaution}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-heilkunst-purple/20 bg-gradient-to-br from-white to-heilkunst-purple-light/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-heilkunst-purple-dark flex items-center gap-2">
                  <RefreshCcw className="h-5 w-5" />
                  Alternative
                </CardTitle>
                <CardDescription>{item.alternative.suggestion}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm">Anwendung:</h4>
                    <p className="text-sm">{item.alternative.application}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Wirkung:</h4>
                    <p className="text-sm">{item.alternative.effect}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {item.supplement && (
              <Card className="border-heilkunst-beige/40 bg-gradient-to-br from-white to-heilkunst-beige/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-heilkunst-brown flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Ergänzung
                  </CardTitle>
                  <CardDescription>{item.supplement.suggestion}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-medium text-sm">Begründung:</h4>
                    <p className="text-sm">{item.supplement.reason}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>
      
      <div className="bg-muted p-4 rounded-lg text-sm">
        <p className="font-medium mb-1">Wichtiger Hinweis:</p>
        <p>Die dargestellten Informationen dienen ausschließlich der Information und ersetzen nicht den Rat eines Arztes oder Heilpraktikers. Bei anhaltenden oder schwerwiegenden Beschwerden wenden Sie sich bitte an einen Gesundheitsexperten.</p>
      </div>
    </div>
  );
};

export default ResultsDisplay;
