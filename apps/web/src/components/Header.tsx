'use client'
import { useState } from "react";
import Cart from "./Cart";

export const Header = () => {
  const [user, setUser] = useState(false)
  return (
    <div>
      <h1>Header</h1>


      
      {user ? (
        <Cart />
      ) : (
        null
      )}
    </div>
  );
};
