
import React from 'react';
import Header from '@/components/Header';
import { Input } from '@/components/ui/input';
import CategoryCard from '@/components/CategoryCard';
import { KnowledgeCategory } from '@/types';
import { Search } from 'lucide-react';

const categories: KnowledgeCategory[] = [
  {
    id: "nat-remedies",
    title: "Natürliche Heilmittel",
    description: "Entdecken Sie die heilende Kraft der Natur mit pflanzlichen, tierischen und mineralischen Heilmitteln.",
    iconName: "leaf",
    subcategories: ["Heilpflanzen", "Ätherische Öle", "Honig & Propolis", "Tonerde & Salze"]
  },
  {
    id: "toxic",
    title: "Toxische Substanzen",
    description: "Informationen über natürliche Gifte und deren Symptome sowie Gegenmaßnahmen.",
    iconName: "droplet",
    subcategories: ["Pflanzengifte", "Tiergifte", "Antidote", "Erste Hilfe"]
  },
  {
    id: "practices",
    title: "Heilpraktiken & Methoden",
    description: "Traditionelle und alternative Ansätze zur Förderung von Gesundheit und Wohlbefinden.",
    iconName: "book",
    subcategories: ["Ayurveda", "TCM", "Akupunktur", "Aromatherapie", "Historische Verfahren"]
  },
  {
    id: "symptoms",
    title: "Symptome & Beschwerden",
    description: "Verstehen Sie verschiedene Symptome und ihre möglichen Ursachen aus ganzheitlicher Perspektive.",
    iconName: "heart",
    subcategories: ["Physische Symptome", "Psychische Zustände", "Chronische Erkrankungen"]
  },
  {
    id: "application",
    title: "Anwendung & Vorsorge",
    description: "Anleitungen zur richtigen Anwendung von Heilmitteln und präventive Maßnahmen.",
    iconName: "shield",
    subcategories: ["Zubereitung & Dosierung", "Sicherheitsinformationen", "Präventive Maßnahmen"]
  }
];

const Knowledge = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-semibold mb-6 text-heilkunst-purple-dark">
          Heilkunst-Wissensbank
        </h1>
        
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="In der Wissensbank suchen..." 
            className="pl-10 border-heilkunst-purple/20 focus:border-heilkunst-purple transition-colors"
          />
        </div>
        
        <h2 className="text-xl font-medium mb-4 text-heilkunst-green-dark">
          Hauptkategorien
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
        
        <div className="mt-12 bg-heilkunst-beige/30 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold text-heilkunst-brown mb-3">
            Über unsere Wissensbank
          </h2>
          <p className="mb-4">
            Die Heilkunst-KI-Kompass Wissensbank bündelt Erkenntnisse aus verschiedenen Bereichen der traditionellen und natürlichen Heilkunde. Unser Ziel ist es, dieses wertvolle Wissen zugänglich und nutzbar zu machen.
          </p>
          <p>
            Jede Interaktion mit unserem System hilft uns, die Wissensbasis zu erweitern und die Qualität der Informationen kontinuierlich zu verbessern. Wir laden Sie ein, dieses wachsende Archiv zu erkunden und zu seinem Wachstum beizutragen.
          </p>
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

export default Knowledge;
