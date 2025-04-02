
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { KnowledgeCategory } from '@/types';
import { Leaf, Droplet, BookOpen, HeartPulse, Shield } from 'lucide-react';

interface CategoryCardProps {
  category: KnowledgeCategory;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const getIcon = () => {
    switch(category.iconName) {
      case 'leaf':
        return <Leaf className="h-6 w-6 text-heilkunst-green" />;
      case 'droplet':
        return <Droplet className="h-6 w-6 text-red-500" />;
      case 'book':
        return <BookOpen className="h-6 w-6 text-heilkunst-purple" />;
      case 'heart':
        return <HeartPulse className="h-6 w-6 text-pink-500" />;
      case 'shield':
        return <Shield className="h-6 w-6 text-blue-500" />;
      default:
        return <Leaf className="h-6 w-6 text-heilkunst-green" />;
    }
  };
  
  return (
    <Card className="heilkunst-card group cursor-pointer hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-start justify-between">
          {getIcon()}
          <div className="w-full ml-2">
            <CardTitle className="text-lg font-semibold group-hover:text-heilkunst-purple transition-colors">
              {category.title}
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {category.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {category.subcategories.slice(0, 3).map((subcat, idx) => (
            <Badge key={idx} variant="outline" className="bg-white/70">
              {subcat}
            </Badge>
          ))}
          {category.subcategories.length > 3 && (
            <Badge variant="outline" className="bg-white/70">
              +{category.subcategories.length - 3} mehr
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
