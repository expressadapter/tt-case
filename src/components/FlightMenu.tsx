'use client';

import React, { useEffect, useId, useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/use-media-query';
import Image from 'next/image';
import { useTransitionRouter } from 'next-view-transitions';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import useSessionStorage from '@/hooks/useSessionStorage';
import { Chatbot } from './chat/Chatbot';
import { v4 as uuidv4 } from "uuid";


function ItemDetails({ item }) {
  return (
    <div>
      <div className="relative mb-4 h-60 w-full">
        <Image
          src={item.image}
          alt={item.name}
          layout="fill"
          objectFit="cover"
          priority
          className="rounded-lg"
        />
        <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      <div>
        <p className="text-lg font-semibold">{item.name}</p>
        {item.category && <p className="text-sm text-muted-foreground">{item.category}</p>}

        {item.description && (
          <p className="mb-4 mt-2 text-sm leading-relaxed text-muted-foreground">
            {item.chefs_description}
          </p>
        )}
        <div className="mb-2">
          <h4 className="font-medium">Ingredients</h4>
          <div className="flex flex-wrap gap-2">
            {item.ingredients.map((ingredient, index) => (
              <Badge key={index} variant="primary">
                {ingredient}
              </Badge>
            ))}
          </div>
        </div>

        {item.allergens.length > 0 && (
          <div className="mb-2">
            <h4 className="font-medium">Allergens</h4>
            <div className="flex flex-wrap gap-2">
              {item.allergens.map((allergen, index) => (
                <Badge key={index} variant="destructive">
                  {allergen}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="mb-2">
          <h4 className="font-medium">Dietary Information</h4>
          <div className="flex flex-wrap gap-2">
            {item.dietaryInfo.map((info, index) => (
              <Badge key={index} variant="secondary">
                {info}
              </Badge>
            ))}
          </div>
        </div>

      </div>
      <Chatbot menuItem={item.name} />
    </div>
  );
}

function MenuSection({ item }) {
  const uniqueId = useId();

  const isMobile = useMediaQuery('(max-width: 640px)');
  const DetailsWrapper = isMobile ? Drawer : Dialog;
  const DetailsTrigger = isMobile ? DrawerTrigger : DialogTrigger;
  const DetailsContent = isMobile ? DrawerContent : DialogContent;

  const renderItem = (item = false) => (
    <div key={uniqueId} className={`relative rounded-md border p-2`}>
      <div className="flex items-center space-x-4">
        <Image
          src={item.image}
          alt={item.name}
          width={100}
          height={100}
          className="rounded-sm object-cover"
        />
        <div className="flex-1">
          <p className="text-sm">{item.name}</p>
          {item.description && <p className="text-xs text-muted-foreground">{item.description}</p>}
          <div className="mt-2 flex items-center space-x-2">
            <DetailsWrapper>
              <DetailsTrigger asChild>
                <Button variant="link" className="h-auto p-0 text-sm">
                  View Details
                </Button>
              </DetailsTrigger>
              <DetailsContent className={isMobile ? 'h-[80vh]' : 'max-w-xl'}>
                <ScrollArea className={isMobile ? 'h-full' : 'max-h-[80vh]'}>
                  <div className="p-4">
                    <ItemDetails item={item} />
                  </div>
                </ScrollArea>
              </DetailsContent>
            </DetailsWrapper>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="">
      {/* Regular items */}
      {item && !item.alternativeGroups && <div className="mb-2">{renderItem(item)}</div>}

      {/* Alternative groups */}
      {item.alternativeGroups && (
        <div className="mb-4">
          <p className="mb-1 mt-4 text-center text-lg font-medium">
            Please choose from our selection
          </p>

          {item.alternativeGroups.map((group, groupIndex) => (
            <div className="mb-2">
              <div>
                {group.alternationType && (
                  <p className="mt-2 text-center text-lg font-medium">{group.alternationType}</p>
                )}
                {group.items.map((item, itemIndex) => (
                  <div key={uniqueId} className={itemIndex > 0 ? 'mt-2' : ''}>
                    {renderItem(item)}
                  </div>
                ))}
              </div>

              {groupIndex === item.alternativeGroups.length - 1 && (
                <div className="mt-4 flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 300 20"
                    className="w-1/2 font-medium"
                  >
                    <path
                      d="M0 10 H130 M170 10 H300"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                    <circle cx="150" cy="10" r="2" fill="currentColor" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function InflightMenu() {
  const [selectedTiming, setSelectedTiming] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  const router = useTransitionRouter();
  const t = useTranslations();
  const searchParams = useSearchParams();
  const data = searchParams.get('data');
  const [menuData, setMenuData] = useSessionStorage('menuData');
  const [userId, setUserId] = useSessionStorage('userId');

  useEffect(() => {
    setIsMounted(true);

    if(!userId){
      setUserId(uuidv4())
    }
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex w-full flex-wrap justify-center">
      {!selectedTiming ? (
        <div className="w-full md:w-2/3">
          {menuData?.map((timing, index) => (
            <Button
              key={timing.id}
              variant="outline"
              onClick={() => setSelectedTiming(timing)}
              className={`h-auto w-full justify-between p-4 text-left ${index > 0 ? 'mt-4' : ''}`}
            >
              <span className="font-medium">{timing.title}</span>
              <ChevronRight className="h-5 w-5" />
            </Button>
          ))}
        </div>
      ) : (
        <div className="w-full md:w-2/3">
          {selectedTiming?.items.map((item, index) => (
            <div key={item.name} className={index > 0 ? 'mt-2' : ''}>
              <MenuSection item={item} />
            </div>
          ))}
        </div>
      )}

      <div className="w-full md:w-2/3">
        <div className="text-center text-xs text-muted-foreground">
          <Separator className="my-4" />
          <p>
            All our meals are prepared in accordance with Islamic principles. We apologize if
            occasionally your selection is not available. Catering service is impracticable during
            take off and landing periods. Thank you for your understanding.
          </p>
        </div>
        <div className={`flex flex-row justify-center gap-4 pt-4`}>
          <Button
            className="mb-4 h-12 w-full transition-all duration-300 sm:w-auto"
            onClick={() => setSelectedTiming(null)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('Return')}
          </Button>
        </div>
      </div>
      <Chatbot />
    </div>
  );
}
