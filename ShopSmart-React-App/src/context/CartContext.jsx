import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);
const sameId = (a, b) => String(a) === String(b);

function readStorage(key) {
  if (!key) return [];
  try {
    const data = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

// A different account gets a fresh provider instance, preventing
// one user's cart or wishlist from being saved under another account.
export function CartProvider({ currentUser, children }) {
  const identity = String(currentUser?.email || currentUser?.id || "")
    .trim().toLowerCase();
  const owner = identity ? encodeURIComponent(identity) : "";
  return (
    <UserCartProvider key={owner ? `user:${owner}` : "guest"} owner={owner}>
      {children}
    </UserCartProvider>
  );
}

function UserCartProvider({ owner, children }) {
  const cartKey = owner ? `shopsmartCart:${owner}` : null;
  const wishlistKey = owner ? `shopsmartWishlist:${owner}` : null;
  const [cart, setCart] = useState(() => readStorage(cartKey));
  const [wishlist, setWishlist] = useState(() => readStorage(wishlistKey));
  const [storageError, setStorageError] = useState("");
  const isLoggedIn = Boolean(owner);

  useEffect(() => {
    if (!owner) return;
    try {
      localStorage.setItem(cartKey, JSON.stringify(cart));
      localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
      setStorageError("");
    } catch {
      setStorageError("Unable to save shopping data. Please check browser storage.");
    }
  }, [owner, cartKey, wishlistKey, cart, wishlist]);

  const addToCart = (product) => {
    if (!isLoggedIn || product?.id == null) return false;
    setCart((items) => {
      const existing = items.find((item) => sameId(item.productId ?? item.id, product.id));
      if (existing) {
        return items.map((item) => sameId(item.id, existing.id)
          ? { ...item, quantity: Number(item.quantity || 1) + 1 }
          : item);
      }
      return [...items, { ...product, id: String(product.id), productId: product.id, quantity: 1 }];
    });
    return true;
  };

  const removeFromCart = (id) => {
    if (!isLoggedIn) return false;
    setCart((items) => items.filter((item) => !sameId(item.id, id)));
    return true;
  };

  // Compatible with the existing Cart.jsx: (item, absoluteQuantity).
  // Also accepts (id, absoluteQuantity).
  const updateCartQuantity = (itemOrId, quantity) => {
    if (!isLoggedIn) return false;
    const id = typeof itemOrId === "object" ? itemOrId?.id : itemOrId;
    const next = Number(quantity);
    if (id == null || !Number.isInteger(next)) return false;
    if (next <= 0) return removeFromCart(id);
    setCart((items) => items.map((item) => sameId(item.id, id)
      ? { ...item, quantity: next } : item));
    return true;
  };

  const clearCart = () => {
    if (!isLoggedIn) return false;
    setCart([]);
    return true;
  };

  const isWishlisted = (id) => wishlist.some((item) => sameId(item.id, id));

  const toggleWishlist = (product) => {
    if (!isLoggedIn || product?.id == null) return false;
    setWishlist((items) => items.some((item) => sameId(item.id, product.id))
      ? items.filter((item) => !sameId(item.id, product.id))
      : [...items, { ...product }]);
    return true;
  };

  const removeFromWishlist = (id) => {
    if (!isLoggedIn) return false;
    setWishlist((items) => items.filter((item) => !sameId(item.id, id)));
    return true;
  };

  const cartCount = cart.reduce((total, item) => total + Number(item.quantity || 1), 0);
  const cartTotal = cart.reduce((total, item) => total + Number(item.price || 0) * Number(item.quantity || 1), 0);

  return (
    <CartContext.Provider value={{
      cart, wishlist, cartCount, cartTotal, wishlistCount: wishlist.length,
      isLoggedIn, storageError, addToCart, removeFromCart, updateCartQuantity,
      clearCart, isWishlisted, toggleWishlist, removeFromWishlist,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider.");
  return context;
}

export default CartProvider;