import React, { useState } from 'react';

export default function App() {
  const items = [
    { name: 'Applesauce', price: 1.0, emoji: '🍎' },
    { name: "Arby’s Sandwich", price: 3.5, emoji: '🥪' },
    { name: 'Candy / Gum', price: 2.0, emoji: '🍬' },
    { name: 'Chips', price: 1.0, emoji: '🥔' },
    { name: 'Chobani Flip', price: 2.0, emoji: '🥣' },
    { name: 'Coffee', price: 2.0, emoji: '☕' },
    { name: 'Corn Dog', price: 2.5, emoji: '🌭' },
    { name: 'Gatorade', price: 3.0, emoji: '🥤' },
    { name: 'Giant Pickle', price: 1.0, emoji: '🥒' },
    { name: 'Hotdog', price: 2.5, emoji: '🌭' },
    { name: 'Jesy’s Scoop', price: 4.0, emoji: '🍨' },
    { name: 'Jesy’s SpongeBob Bar', price: 4.0, emoji: '🧽' },
    { name: 'Nachos', price: 3.0, emoji: '🧀' },
    { name: 'Pepperoni Roll', price: 4.0, emoji: '🍕' },
    { name: 'Pop', price: 3.0, emoji: '🥤' },
    { name: 'Popcorn', price: 1.0, emoji: '🍿' },
    { name: 'Pretzel', price: 2.5, emoji: '🥨' },
    { name: 'Root Beer Float', price: 4.0, emoji: '🥤' },
    { name: 'Seeds', price: 2.5, emoji: '🌻' },
    { name: 'Water', price: 1.0, emoji: '💧' },
    { name: 'Ring Pop / Blow Pop / Airhead', price: 0.5, emoji: '🍭' },
    { name: 'Cup of Cheese', price: 0.5, emoji: '🧀' },
  ];

  const cashOptions = [1, 5, 10, 20, 50, 100];

  const [cart, setCart] = useState([]);
  const [amountPaid, setAmountPaid] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const bg = darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black";
  const card = darkMode ? "bg-gray-800 text-white" : "bg-white text-black";

  const playBeep = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.value = 600;
    gain.gain.value = 0.05;

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  };

  const addItem = (item) => {
    playBeep();

    setCart((prev) => {
      const existing = prev.find((i) => i.name === item.name);

      if (existing) {
        return prev.map((i) =>
          i.name === item.name ? { ...i, qty: i.qty + 1 } : i
        );
      }

      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeItem = (name) => {
    setCart((prev) =>
      prev
        .map((i) => (i.name === name ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const addCash = (value) => {
    playBeep();
    setAmountPaid((prev) => prev + value);
  };

  const clearOrder = () => {
    setCart([]);
    setAmountPaid(0);
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const change = amountPaid - total;

  return (
    <div className={`min-h-screen ${bg} p-3 transition`}>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold">Concession POS</h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-xl bg-indigo-500 text-white"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* ITEMS */}
        <div className={`lg:col-span-2 ${card} rounded-2xl p-3 shadow-lg`}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">

            {items.map((item) => (
              <button
                key={item.name}
                onClick={() => addItem(item)}
                className="
                  bg-gradient-to-br from-blue-500 to-indigo-600
                  hover:scale-105 active:scale-95 transition
                  text-white rounded-2xl
                  p-4 min-h-[140px]
                  flex flex-col justify-center items-center
                  shadow-md
                "
              >
                <div className="text-4xl">{item.emoji}</div>
                <div className="text-sm font-bold text-center">{item.name}</div>
                <div className="text-xs opacity-90">${item.price.toFixed(2)}</div>
              </button>
            ))}

          </div>
        </div>

        {/* CART */}
        <div className={`${card} rounded-2xl p-3 flex flex-col`}>

          {/* CASH BUTTONS */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {cashOptions.map((val) => (
              <button
                key={val}
                onClick={() => addCash(val)}
                className="bg-green-500 text-white rounded-xl py-2 font-bold"
              >
                +${val}
              </button>
            ))}
          </div>

          <div className="text-center font-bold text-lg mb-2">
            Paid: ${amountPaid.toFixed(2)}
          </div>

          <div className="flex-1 overflow-auto space-y-2">
            {cart.map((item) => (
              <div key={item.name} className="flex justify-between text-sm">
                <div>{item.emoji} {item.name} x{item.qty}</div>
                <div>
                  ${(item.qty * item.price).toFixed(2)}
                  <button
                    onClick={() => removeItem(item.name)}
                    className="ml-2 text-red-500 font-bold"
                  >
                    −
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t mt-2 pt-2">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="text-green-500 text-xl font-bold text-center mt-2">
              Change: ${change >= 0 ? change.toFixed(2) : '0.00'}
            </div>

            <button
              onClick={clearOrder}
              className="w-full mt-2 bg-black text-white py-2 rounded-xl"
            >
              Clear
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
