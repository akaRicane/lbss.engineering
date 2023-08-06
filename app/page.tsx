// page: home
'use client'

import { useCoreContext } from "./contexts/CoreContext";
import HoveredButton from './components/HoveredButton';
import HoveredLink from './components/HoveredLink';

export default function Home() {

  const { counter } = useCoreContext();

  return (
    <main>
      <div className="flex flex-col">
        <p>Counter: {counter}</p>
        <HoveredLink linkID='products' linkTarget='/products'></HoveredLink>
        <HoveredLink linkID='about' linkTarget='/about'></HoveredLink>
      </div>
    </main>
  );
}
