'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronRight, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMediaQuery } from "@/hooks/use-media-query";
import menuData from './menu-data.json';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  image: string;
  ingredients: string[];
  allergens?: string[];
  selectionGroup: string;
  optional?: boolean;
}


const IngredientsList = ({ ingredients, allergens }: { ingredients: string[]; allergens?: string[] }) => (
  <div className="mt-2">
    <div className="flex gap-1 flex-wrap">
      {ingredients.map((ingredient, index) => (
        <Badge key={index} variant="secondary">{ingredient}</Badge>
      ))}
    </div>
    {allergens && allergens.length > 0 && (
      <div className="mt-2">
        <span className="text-red-600 font-medium">Alerjenler: </span>
        {allergens.join(', ')}
      </div>
    )}
  </div>
);

const ItemDetails = ({ item }: { item: MenuItem }) => (
  <ScrollArea className="h-[calc(100vh-10rem)] pr-4">
    <Image
      src={item.image}
      alt={item.name}
      width={400}
      height={300}
      className="w-full h-48 object-cover rounded-lg mb-4"
    />
    <h4 className="text-xl font-semibold mb-2">{item.name}</h4>
    <p className="text-gray-700 mb-4">{item.description}</p>

    <div className="space-y-4">
      <div>
        <h5 className="text-lg font-medium text-gray-900 mb-2">İçindekiler</h5>
        <IngredientsList
          ingredients={item.ingredients}
          allergens={item.allergens}
        />
      </div>
    </div>
  </ScrollArea>
);

const MenuItem = ({ item, selected, onSelect, disabled }: {
  item: MenuItem;
  selected: boolean;
  onSelect: (item: MenuItem) => void;
  disabled: boolean;
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <Card className={`mb-4 transition-all ${selected ? 'border-red-500 bg-red-50' : ''} ${disabled ? 'opacity-50' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4" onClick={() => !disabled && onSelect(item)}>
          <Image
            src={item.image}
            alt={item.name}
            width={96}
            height={96}
            className="rounded-lg object-cover"
          />
          <div className="flex-grow">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg text-slate-800 mb-1">{item.name}</CardTitle>
              {!disabled && (
                <div className="flex items-center">
                  <span className={`mr-2 text-sm ${selected ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                    {selected ? 'Seçildi' : 'Seç'}
                  </span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selected ? 'border-red-500 bg-red-500' : 'border-gray-300'
                    }`}>
                    {selected && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
            {isDesktop ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="text-sm text-red-600 mt-2 p-0">
                    Detayları göster
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Ürün Detayları</DialogTitle>
                  </DialogHeader>
                  <ItemDetails item={item} />
                </DialogContent>
              </Dialog>
            ) : (
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="link" className="text-sm text-red-600 mt-2 p-0">
                    Detayları göster
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Ürün Detayları</DrawerTitle>
                  </DrawerHeader>
                  <div className="p-4">
                    <ItemDetails item={item} />
                  </div>
                </DrawerContent>
              </Drawer>
            )}
          </div>
        </div>



      </CardContent>
    </Card>
  );
};

const MenuSection = ({ title, items, selections, onSelect }: {
  title: string;
  items: MenuItem[];
  selections: Record<string, MenuItem | null>;
  onSelect: (item: MenuItem) => void;
}) => {
  if (!items?.length) return null;

  const getIsDisabled = (item: MenuItem) => {
    if (item.optional) return false;
    if (!item.selectionGroup) return false;

    const groupSelection = selections[item.selectionGroup];
    return groupSelection && groupSelection.id !== item.id || false;
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4 text-red-700">{title}</h3>
      <div>
        {items.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            selected={selections[item.selectionGroup]?.id === item.id}
            onSelect={onSelect}
            disabled={getIsDisabled(item)}
          />
        ))}
      </div>
    </div>
  );
};

const FlightMenu = () => {
  const [selections, setSelections] = useState<Record<string, MenuItem | null>>({});

  const handleSelect = (item: MenuItem) => {
    if (!item.selectionGroup) return;

    setSelections(prev => ({
      ...prev,
      [item.selectionGroup]: prev[item.selectionGroup]?.id === item.id ? null : item
    }));
  };

  const handleSubmit = () => {
    const requiredGroups = ['starter', 'main', 'dessert'];
    const missingSelections = requiredGroups.filter(group => !selections[group]);

    if (missingSelections.length > 0) {
      alert(`Lütfen şu kategorilerden seçim yapınız: ${missingSelections.join(', ')}`);
      return;
    }

    console.log('Seçilen menü:', selections);
    alert('Menü seçiminiz kaydedildi!');
  };

  return (

    <div>
      <MenuSection
        title="Başlangıçlar"
        items={menuData.mainMenu.starters}
        selections={selections}
        onSelect={handleSelect}
      />
      <MenuSection
        title="Ana Yemekler"
        items={menuData.mainMenu.mainCourses}
        selections={selections}
        onSelect={handleSelect}
      />
      <MenuSection
        title="Tatlılar"
        items={menuData.mainMenu.desserts}
        selections={selections}
        onSelect={handleSelect}
      />

      <Button
        onClick={handleSubmit}
        className="w-full mt-6"
      >
        Menü Seçimimi Onayla
      </Button>
      {menuData.metadata?.notice && (
        <div className="text-sm text-gray-600 text-center p-4">
          {menuData.metadata.notice}
        </div>
      )}
    </div>



  );
};

export default FlightMenu;
