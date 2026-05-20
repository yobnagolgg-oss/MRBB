import React, { useState } from 'react';
import './App.css';

export default function App() {
  const items = [
    { name: 'Applesauce', price: 1.0, emoji: '🍎' },
    { name: "Arby’s Sandwich", price: 3.5, emoji: '🥪' },
    { name: 'Candy / Gum', price: 2.0, emoji: '🍬' },
    { name: 'Chips', price: 1.0, emoji: '🥔' },
    { name: 'Chobani Flip', price: 2.0, emoji: '🥣' },
    { name: 'Coffee', price: 2.0, emoji: '☕' },
    { name: 'Corn Dog', price: 2.5, emoji: '🌭' },
    { name: 'Gatorade', price: 3.0, emoji: '🐊' },
    { name: 'Giant Pickle', price: 1.0, emoji: '🥒' },
    { name: 'Hotdog', price: 2.5, emoji: '🌭' },
    { name: 'Icee', price: 1.5, emoji: '🧊' },
    { name: 'Jesy’s Scoop', price: 4.0, emoji: '🍨' },
    { name: 'Jesy’s SpongeBob Bar', price: 4.0, emoji: '🧽' },
    { name: 'Nachos', price: 3.0, emoji: '🧀' },
    { name: 'Pepperoni Roll', price: 4.0, emoji: '🍕' },
    { name: 'Pop', price: 3.0, emoji: '🥤' },
    { name: 'Popcorn', price: 1.0, emoji: '🍿' },
    { name: 'Pretzel', price: 2.5, emoji: '🥨' },
    { name: 'Root Beer Float', price: 4.0, emoji: '🍺' },
    { name: 'Seeds', price: 2.5, emoji: '🌻' },
    { name: 'Water', price: 1.0, emoji: '💧' },
    { name: 'Ring Pop / Blow Pop / Airhead', price: 0.5, emoji: '🍭' },
    { name: 'Cup of Cheese', price: 0.5, emoji: '🧀' },
  ];

  const cashOptions = [1, 5, 10, 20, 50, 100];

  const [cart, setCart] = useState([]);
  const [amountPaid, setAmountPaid] = useState(0);
  const [darkMode, setDarkMode] = useState(true);

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
          i.name === item.name
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }

      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeItem = (name) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.name === name
            ? { ...i, qty: i.qty - 1 }
            : i
        )
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

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const change = amountPaid - total;

  return (
    <div className={darkMode ? "app dark" : "app"}>

      {/* HEADER */}
      <div className="header">
        <h1>Concessions Register</h1>

        <button
          className="mode-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div className="layout">

        {/* LEFT SIDE */}
        <div className="card">

          <div className="item-grid">
            {items.map((item) => (
              <button
                key={item.name}
                className="item-btn"
                onClick={() => addItem(item)}
              >
                <div className="item-emoji">
                  {item.emoji}
                </div>

                <div className="item-name">
                  {item.name}
                </div>

                <div className="item-price">
                  ${item.price.toFixed(2)}
                </div>
              </button>
            ))}
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="card">

          {/* CASH BUTTONS */}
          <div className="cash-grid">
            {cashOptions.map((val) => (
              <button
                key={val}
                className="cash-btn"
                onClick={() => addCash(val)}
              >
                +${val}
              </button>
            ))}
          </div>

          {/* PAID */}
          <div className="paid-box">
            Paid: ${amountPaid.toFixed(2)}
          </div>

          {/* CART */}
          <div className="cart-box">
            {cart.length === 0 ? (
              <div className="empty-cart">
                No items added
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.name}
                  className="cart-row"
                >
                  <div>
                    {item.emoji} {item.name} x{item.qty}
                  </div>

                  <div>
                    ${(item.qty * item.price).toFixed(2)}

                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.name)}
                    >
                      −
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* TOTAL */}
          <div className="total-box">

            <div className="total-row">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="change-box">
              Change: $
              {change >= 0
                ? change.toFixed(2)
                : '0.00'}
            </div>

            <button
              className="clear-btn"
              onClick={clearOrder}
            >
              Clear Order
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}
