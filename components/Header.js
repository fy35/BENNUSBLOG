import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { getCategories } from '../services';

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((result) => setCategories(result));
  }, []);

  return (
    <div className="px-10-mb-8 container mx-auto">
      <div className="inline-block w-full border-b-[1px] py-8">
        <div className="block text-center md:float-left">
          <Link href="/">
            <span className="cursor-pointer text-4xl font-bold text-white neonText tracking-widest">
              LightpinkParadise
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories.map((category, index) => (
            <Link key={index} href={`/category/${category.slug}`}>
              <span className="mt-2 ml-4 cursor-pointer align-middle font-semibold text-white md:float-right">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
