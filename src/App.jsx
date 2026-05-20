import React, { useState, useRef } from 'react';

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

  const audioRef = useRef(null);

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
    <div className="min-h-screen bg-gray-100 p-4 font-sans select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-6">
          <h1 className="text-4xl font-bold mb-6 text-center">
            Concession Stand Register
          </h1>

          <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((item) => (
              <button
                key={item.name}
                onClick={() => addItem(item)}
                className="bg-blue-500 hover:bg-blue-600 active:scale-95 transition rounded-3xl text-white min-h-[180px] flex flex-col items-center justify-center gap-2 shadow-xl"
              >
                <div className="text-5xl">{item.emoji}</div>
                <div className="text-xl font-bold text-center">{item.name}</div>
                <div>${item.price.toFixed(2)}</div>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-3xl shadow-xl p-6 flex flex-col">

          <h2 className="text-3xl font-bold mb-4 text-center">
            Cash + Order
          </h2>

          {/* CASH BUTTONS */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {cashOptions.map((val) => (
              <button
                key={val}
                onClick={() => addCash(val)}
                className="bg-green-500 hover:bg-green-600 text-white rounded-xl p-3 font-bold text-lg"
              >
                +${val}
              </button>
            ))}
          </div>

          <div className="text-center text-2xl font-bold mb-4">
            Paid: ${amountPaid.toFixed(2)}
          </div>

          {/* CART */}
          <div className="flex-1 overflow-auto space-y-2 mb-4">
            {cart.map((item) => (
              <div key={item.name} className="flex justify-between bg-gray-100 p-2 rounded-xl">
                <div>
                  {item.emoji} {item.name} x{item.qty}
                </div>
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

          {/* TOTAL */}
          <div className="border-t pt-3">
            <div className="text-xl font-bold flex justify-between">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="text-green-600 text-2xl font-bold mt-2 text-center">
              Change: ${change >= 0 ? change.toFixed(2) : '0.00'}
            </div>

            <button
              onClick={clearOrder}
              className="w-full mt-3 bg-black text-white p-3 rounded-xl"
            >
              Clear
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
