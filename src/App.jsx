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

  const [cart, setCart] = useState([]);
  const [amountPaid, setAmountPaid] = useState('');
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemEmoji, setNewItemEmoji] = useState('🍔');

  const [customItems, setCustomItems] = useState(items);

  const addItem = (item) => {
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

  const removeItem = (itemName) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.name === itemName ? { ...i, qty: i.qty - 1 } : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  const clearOrder = () => {
    setCart([]);
    setAmountPaid('');
  };

  const addCustomItem = () => {
    if (!newItemName || !newItemPrice) return;

    const newItem = {
      name: newItemName,
      price: parseFloat(newItemPrice),
      emoji: newItemEmoji || '🍔',
    };

    setCustomItems((prev) => [...prev, newItem]);

    setNewItemName('');
    setNewItemPrice('');
    setNewItemEmoji('🍔');
    setShowAddItem(false);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const paid = parseFloat(amountPaid) || 0;
  const change = paid - total;

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-6">
          <h1 className="text-4xl font-bold mb-6 text-center">
            Concession Stand Register
          </h1>

          <div className="
  grid gap-4
  grid-cols-2
  sm:grid-cols-3
  lg:grid-cols-4
  landscape:grid-cols-5
  portrait:grid-cols-2
">
            {customItems.map((item) => (
              <button
                key={item.name}
                onClick={() => addItem(item)}
                
<button
  key={item.name}
  onClick={() => addItem(item)}
  className="
    bg-blue-500 hover:bg-blue-600 active:scale-95 transition
    rounded-2xl text-white
    min-h-[160px]
    landscape:min-h-[120px]
    flex flex-col items-center justify-center
    gap-2
    shadow-lg
  "
>
  <div className="text-5xl mb-2">{item.emoji}</div>
  <div className="text-2xl font-bold">{item.name}</div>
  <div className="text-lg">${item.price.toFixed(2)}</div>
</button>
                <div className="text-2xl font-bold">{item.name}</div>
                <div className="text-lg">${item.price.toFixed(2)}</div>
              </button>
            ))}
          </div>

          <div className="mt-6">
            <button
              onClick={() => setShowAddItem(!showAddItem)}
              className="w-full bg-green-500 hover:bg-green-600 text-white rounded-2xl p-4 text-2xl font-bold shadow-lg"
            >
              + Add New Menu Item
            </button>

            {showAddItem && (
              <div className="bg-gray-100 rounded-2xl p-4 mt-4 space-y-3 shadow-inner">
                <input
                  type="text"
                  placeholder="Item Name"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full border rounded-xl p-3"
                />

                <input
                  type="number"
                  placeholder="Price"
                  value={newItemPrice}
                  onChange={(e) => setNewItemPrice(e.target.value)}
                  className="w-full border rounded-xl p-3"
                />

                <input
                  type="text"
                  placeholder="Emoji"
                  value={newItemEmoji}
                  onChange={(e) => setNewItemEmoji(e.target.value)}
                  className="w-full border rounded-xl p-3"
                />

                <button
                  onClick={addCustomItem}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl p-3 font-bold"
                >
                  Save Item
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 flex flex-col">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Current Order
          </h2>

          <div className="flex-1 overflow-auto space-y-3 mb-4">
            {cart.length === 0 ? (
              <div className="text-gray-500 text-center mt-10">
                No items added
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.name} className="flex justify-between items-center bg-gray-100 rounded-xl p-3">
                  <div>
                    <div className="font-bold text-lg">
                      {item.emoji} {item.name}
                    </div>
                    <div>
                      {item.qty} × ${item.price.toFixed(2)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="font-bold text-lg">
                      ${(item.qty * item.price).toFixed(2)}
                    </div>

                    <button
                      onClick={() => removeItem(item.name)}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-3 py-1"
                    >
                      −
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t pt-4 space-y-4">
            <div className="flex justify-between text-2xl font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div>
              <label className="block font-semibold mb-1">Amount Paid</label>
              <input
                type="number"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
                className="w-full border rounded-xl p-3 text-xl"
              />
            </div>

            <div className="bg-green-100 rounded-2xl p-4 text-center">
              <div className="text-lg font-semibold">Change Due</div>
              <div className="text-4xl font-bold">
                ${change >= 0 ? change.toFixed(2) : '0.00'}
              </div>
            </div>

            <button
              onClick={clearOrder}
              className="w-full bg-black hover:bg-gray-800 text-white text-xl rounded-2xl p-4 font-bold"
            >
              Clear Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


