import { DragHandle, SwapyItem, SwapyLayout, SwapySlot } from '@/components/ui/Swapy';
import { useMemo, useState } from 'react';
import { type SlotItemMapArray, utils } from 'swapy';

type Item = {
  id: string;
  title: string;
  bgColor: string;
  iconBgColor: string;
  className?: string;
  description?: string;
};

const initialItems: Item[] = [
  {
    id: '1',
    title: '⚡ Elite Technique & Form',
    bgColor: 'bg-blue-400',
    iconBgColor: 'bg-blue-100',
    className: 'lg:col-span-4 sm:col-span-7 col-span-12',
    description: 'Master foundational mechanics, balance, and precision through structured step-by-step guidance.',
  },
  {
    id: '2',
    title: '🎯 Personalized Coaching',
    bgColor: 'bg-pink-300',
    iconBgColor: 'bg-pink-100',
    className: 'lg:col-span-3 sm:col-span-5 col-span-12',
    description: 'Tailored routines and video breakdowns designed for your specific skill level and goals.',
  },
  {
    id: '3',
    title: '🧘‍♀️ Flexibility & Mobility',
    bgColor: 'bg-green-400',
    iconBgColor: 'bg-green-100',
    className: 'lg:col-span-5 sm:col-span-5 col-span-12',
    description: 'Targeted conditioning programs designed to improve mobility while preventing common injuries.',
  },
  {
    id: '4',
    title: '📈 Progressive Curriculum',
    bgColor: 'bg-yellow-300',
    iconBgColor: 'bg-yellow-100',
    className: 'lg:col-span-5 sm:col-span-7 col-span-12',
    description: 'From basic tumbling to advanced routines—a structured roadmap for consistent progression.',
  },
  {
    id: '5',
    title: '💪 Core & Strength Building',
    bgColor: 'bg-purple-300',
    iconBgColor: 'bg-purple-100',
    className: 'lg:col-span-4 sm:col-span-6 col-span-12',
    description: 'Gymnastics-specific functional conditioning engineered to build body control and power.',
  },
  {
    id: '6',
    title: '🌐 Global Online Community',
    bgColor: 'bg-cyan-300',
    iconBgColor: 'bg-cyan-100',
    className: 'lg:col-span-3 sm:col-span-6 col-span-12',
    description: 'Train anywhere with direct feedback, accountability, and a supportive network of athletes.',
  },
];

function SwapyHandle() {
  const [slotItemMap, setSlotItemMap] = useState<SlotItemMapArray>(
    utils.initSlotItemMap(initialItems, 'id')
  );

  const slottedItems = useMemo(
    () => utils.toSlottedItems(initialItems, 'id', slotItemMap),
    [initialItems, slotItemMap]
  );

  return (
    <div className='max-w-7xl mx-auto p-4 md:p-8 flex flex-col'>
      <div>
        <h1 className='text-4xl md:text-4xl font-bold text-white text-center'>
          Our Program includes 
        </h1>
        <h2 className=' text-white text-center leading-relaxed max-w-2xl mx-auto mt-2'>
          Just like the below cards, our program is designed to be flexible and interactive to your needs, Swap the cards 👇
        </h2>
      </div>
      <SwapyLayout
        id='swapy'
        className='max-w-7xl mx-auto flex flex-col bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm rounded-2xl mt-12 p-6 md:p-8 overflow-hidden'
        config={{
          swapMode: 'hover',
        }}
        onSwap={(event: { newSlotItemMap: { asArray: any } }) => {
          console.log('Swap detected!', event.newSlotItemMap.asArray);
        }}
      >
        {/* grid-rows-2 forces the cards to stretch vertically and fill top-to-bottom */}
        <div className='grid max-w-7xl h-full grid-cols-12 grid-rows-none gap-4 md:gap-6'>
          {slottedItems.map(({ itemId }) => {
            const item = initialItems.find((i) => i.id === itemId);
            return (
              <SwapySlot
                key={itemId}
                className={`swapyItem rounded-xl h-full ${item?.className}`}
                id={itemId}
              >
                <SwapyItem
                  id={itemId}
                  className={`relative rounded-xl h-full flex flex-col justify-center items-center gap-3 p-6 md:p-8 ${item?.bgColor}`}
                >
                  <DragHandle />
                  <h3 className='text-xl md:text-2xl font-bold text-slate-900 text-center'>{item?.title}</h3>
                  <p className='text-sm md:text-base text-slate-800/90 text-center leading-relaxed max-w-sm'>{item?.description}</p>
                </SwapyItem>
              </SwapySlot>
            );
          })}
        </div>
      </SwapyLayout>
    </div>
  );
}

export default SwapyHandle;