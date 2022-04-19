const express = require('express');
const router = new express.Router();
const ExpressError = require('../expressError');
const items = require('../fakeDb'); // empty array

/** GET LIST OF SHOPPING ITEMS */
router.get('/', (req, res) => {
  res.json({ items });
});

/** ADD AN ITEM TO LIST */
router.post('/', (req, res, next) => {
  try {
    if (!req.body.name || !req.body.price)
      throw new ExpressError('Name and Price are required', 400);
    const newItem = { name: req.body.name, price: req.body.price };
    items.push(newItem);
    return res.status(201).json({ added: newItem });
  } catch (e) {
    return next(e);
  }
});

/** DISPLAY SINGLE ITEM'S NAME AND PRICE */
router.get('/:name', (req, res) => {
  const foundItem = items.find(item => item.name === req.params.name); //find item with that :name
  if (foundItem === undefined) {
    throw new ExpressError('Item not found', 404);
  }
  return res.json({ item: foundItem });
});

/** UPDATE NAME OR PRICE OF ITEM */
router.patch('/:name', (req, res) => {
  const foundItem = items.find(item => item.name === req.params.name);
  if (foundItem === undefined) {
    throw new ExpressError('Item not found', 404);
  }
  foundItem.name = req.body.name;
  foundItem.price = req.body.price;
  return res.json({ updated: foundItem });
});

/** DELETE A SPECIFIC ITEM FROM THE ARRAY */
router.delete('/:name', (req, res) => {
  const foundItem = items.find(item => item.name === req.params.name);
  if (foundItem === -1) {
    throw new ExpressError('Item not found', 404);
  }
  items.splice(foundItem, 1);
  return res.json({ message: 'Deleted' });
});

module.exports = router;
