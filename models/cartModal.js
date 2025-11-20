const db = require("../db");

// yeh model sirf DB queries export karega

module.exports = {
  getCartByUserId: (userId, callback) => {
    db.query("SELECT * FROM cart WHERE userId=?", [userId], callback);
  },

  createCart: (userId, restaurantId, callback) => {
    db.query(
      "INSERT INTO cart (userId, restaurantId) VALUES (?,?)",
      [userId, restaurantId],
      callback
    );
  },

  addCartItem: (cartId, itemId, name, price, callback) => {
    db.query(
      "INSERT INTO cart_items (cartId, itemId, name, price) VALUES (?,?,?,?)",
      [cartId, itemId, name, price],
      callback
    );
  },

  getCartItem: (cartId, itemId, callback) => {
    db.query(
      "SELECT * FROM cart_items WHERE cartId=? AND itemId=?",
      [cartId, itemId],
      callback
    );
  },

  increaseQty: (cartId, itemId, callback) => {
    db.query(
      "UPDATE cart_items SET quantity = quantity + 1 WHERE cartId=? AND itemId=?",
      [cartId, itemId],
      callback
    );
  },

  updateQty: (qty, cartId, itemId, callback) => {
    db.query(
      "UPDATE cart_items SET quantity=? WHERE cartId=? AND itemId=?",
      [qty, cartId, itemId],
      callback
    );
  },

  deleteItem: (cartId, itemId, callback) => {
    db.query(
      "DELETE FROM cart_items WHERE cartId=? AND itemId=?",
      [cartId, itemId],
      callback
    );
  },

  clearCart: (userId, callback) => {
    db.query("DELETE FROM cart WHERE userId=?", [userId], callback);
  }
};
