import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const products = [
  {
    id: 1,
    name: "Produto 1",
    price: 10,
  },
  {
    id: 2,
    name: "Produto 2",
    price: 20,
  },
  {
    id: 3,
    name: "Produto 3",
    price: 30,
  },
  {
    id: 4,
    name: "Produto 4",
    price: 40,
  },
  {
    id: 5,
    name: "Produto 5",
    price: 50,
  },
  {
    id: 6,
    name: "Produto 6",
    price: 60,
  },
];

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  const addToCart = (product) => {
    const existingCartItem = cartItems.find((item) => item.id === product.id);
    if (existingCartItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      localStorage.setItem(
        "cartItems",
        JSON.stringify([...cartItems, { ...product, quantity: 1 }])
      );
    }
  };

  const removeFromCart = (product) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
    );
    const filteredCartItems = updatedCartItems.filter(
      (item) => item.quantity > 0
    );
    setCartItems(filteredCartItems);
    localStorage.setItem("cartItems", JSON.stringify(filteredCartItems));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  return (
    <div className="container">
      <h1 className="mt-4">Produtos:</h1>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4" key={product.id}>
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="card-title">{product.name}</h3>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Preço: R${product.price}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(product)}
                >
                  Adicionar ao carrinho
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h1 className="mt-4">Carrinho:</h1>
      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio!</p>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Quantidade</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeFromCart(item)}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {cartItems.length > 0 && (
        <>
          <p>
            Total: R$
            {cartItems.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0
            )}
          </p>
          <button className="btn btn-danger" onClick={clearCart}>
            Limpar carrinho.
          </button>
        </>
      )}
    </div>
  );
};

export default App;
