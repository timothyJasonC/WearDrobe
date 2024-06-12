'use client'
import { product } from '@/lib/product';
import  { useState } from 'react'
import AddToCartButton from './AddToCartButton';

export default function AddToCart() {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md">
      <img src={'https://images.unsplash.com/photo-1649390329051-dd09cd47fb1f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJhanV8ZW58MHx8MHx8fDA%3D'} alt="Product Image" className="w-full h-auto" />
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="text-xl text-red-600 mt-2">Rp {product.price}</p>
      <p className="mt-4">{product.description}</p>
      <div className="mt-4">
        <label htmlFor="color-select" className="block text-sm font-medium text-gray-700">
          Choose a color:
        </label>
        <select
          id="color-select"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={(e) => {
            const selected = product.colors.find(color => color.value === e.target.value);
            if (selected) {
              setSelectedColor(selected);
            }
          }}
        >
          {product.colors.map(color => (
            <option key={color.value} value={color.value} data-price={color.price}>
              {color.label} (+Rp {color.price})
            </option>
          ))}
        </select>
      </div>
     
      <AddToCartButton selectedColor={selectedColor.id}/>
    </div>
  )
}
