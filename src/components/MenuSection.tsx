'use client';
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const MenuSection = ({ items, title }) => (
  <AccordionItem value={title.toLowerCase()}>
    <AccordionTrigger className="text-lg font-semibold">{title}</AccordionTrigger>
    <AccordionContent>
      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardHeader className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{item.name}</CardTitle>
                  {item.description && (
                    <CardDescription className="mt-1">{item.description}</CardDescription>
                  )}
                </div>
                {item.tag && (
                  <Badge variant="secondary" className="ml-2">
                    {item.tag}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              {item.ingredients && (
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">Ingredients: </span>
                  {item.ingredients.join(', ')}
                </div>
              )}
              {item.allergens && item.allergens.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {item.allergens.map((allergen) => (
                    <Badge key={allergen} variant="outline">
                      {allergen}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </AccordionContent>
  </AccordionItem>
);

export default MenuSection;
