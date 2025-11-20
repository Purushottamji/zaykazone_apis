const Cart = require("../models/cartModel");


// Add to cart

exports.addToCart = (req, res) => {
  const { userId, itemId, name, price, restaurantId } = req.body;

  Cart.getCartByUserId(userId, (err, result) => {
    if (err) return res.json(err);

    if (result.length === 0) {

      // create new cart
      Cart.createCart(userId, restaurantId, (err, cartRes) => {
        if (err) return res.json(err);

        const cartId = cartRes.insertId;

        Cart.addCartItem(cartId, itemId, name, price, () =>
          res.json({ message: "Item added to cart" })
        );
      });

    } else {
      const cart = result[0];

      if (cart.restaurantId != restaurantId) {
        return res.json({
          error: true,
          message: "Your cart has items from another restaurant"
        });
      }

      const cartId = cart.id;

      Cart.getCartItem(cartId, itemId, (err, itemRes) => {
        if (itemRes.length > 0) {
          Cart.increaseQty(cartId, itemId, () =>
            res.json({ message: "Quantity increased" })
          );
        } else {
          Cart.addCartItem(cartId, itemId, name, price, () =>
            res.json({ message: "Item added to cart" })
          );
        }
      });
    }
  });
};


// Update Quantity

exports.updateQuantity = (req, res) => {
  const { userId, itemId, quantity } = req.body;

  Cart.getCartByUserId(userId, (err, result) => {
    if (result.length === 0)
      return res.json({ message: "Cart not found" });

    const cartId = result[0].id;

    if (quantity === 0) {
      Cart.deleteItem(cartId, itemId, () =>
        res.json({ message: "Item removed" })
      );
    } else {
      Cart.updateQty(quantity, cartId, itemId, () =>
        res.json({ message: "Quantity updated" })
      );
    }
  });
};


// Remove Item

exports.removeItem = (req, res) => {
  const { userId, itemId } = req.body;

  Cart.getCartByUserId(userId, (err, result) => {
    const cartId = result[0].id;

    Cart.deleteItem(cartId, itemId, () =>
      res.json({ message: "Item removed successfully" })
    );
  });
};


// Clear Cart

exports.clearCart = (req, res) => {
  const { userId } = req.body;

  Cart.clearCart(userId, () => {
    res.json({ message: "Cart cleared" });
  });
};
