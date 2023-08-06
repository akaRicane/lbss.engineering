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
        <HoveredLink linkID='LINK_TO_PRODUCTS' linkTarget='/products'></HoveredLink>
        <HoveredLink linkID='LINK_TO_ABOUT' linkTarget='/about'></HoveredLink>
      </div>
    </main>
  );
}
