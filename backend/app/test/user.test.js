const db = require("../models");
const { deleteUser, getUsers } = require('../controllers/user.controller');
// userController.test.js
const { Op } = require('sequelize');

// Mock the req and res objects to simulate a request and response
const req = {};

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

// Test case for getUsers
test('getUsers should return the correct user list', async () => {
  // Mock the database operation to return the expected result
  db.user.findAll = jest.fn(() => Promise.resolve([{ id: 1, role: 'CANDIDATE' }, { id: 2, role: 'EMPLOYER' }])); // Assuming two users with roles CANDIDATE and EMPLOYER
  // Call the async function
  await getUsers(req, res);

  // Assert that db.user.findAll was called with the correct query parameters
  expect(db.user.findAll).toHaveBeenCalledWith({
    where: {
      [Op.or]: [{ role: 'CANDIDATE' }, { role: 'EMPLOYER' }],
    },
  });

  // Assert that res.status was called with 200
  expect(res.status).toHaveBeenCalledWith(200);

  // Assert that res.json was called with the correct response object
  expect(res.json).toHaveBeenCalledWith({ userList: [{ id: 1, role: 'CANDIDATE' }, { id: 2, role: 'EMPLOYER' }] });
});

test('getUsers should return 400 status with error message', async () => {
  // Mock the database operation to return the expected result
  db.user.findAll = jest.fn(() => Promise.resolve(null));
  // Call the async function
  await getUsers(req, res);

  // Assert that db.user.findAll was called with the correct query parameters
  expect(db.user.findAll).toHaveBeenCalledWith({
    where: {
      [Op.or]: [{ role: 'CANDIDATE' }, { role: 'EMPLOYER' }],
    },
  });

  // Assert that res.status was called with 200
  expect(res.status).toHaveBeenCalledWith(400);

  // Assert that res.json was called with the correct response object
  expect(res.json).toHaveBeenCalledWith({ statusText: "No Users." });
});

// Test case for deleteUser
test('deleteUser should delete the user and return the correct count', async () => {
  // Mock the req and res objects to simulate a request and response
  const req = { params: { id: 1 } }; // Replace 1 with a valid user ID

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  // Mock the database operation with a mock function to return the expected result
  db.user.destroy = jest.fn(() => Promise.resolve(1)); // Assuming 1 is the number of deleted records

  // Call the async function
  await deleteUser(req, res);

  // Assert that db.user.destroy was called with the correct userId
  expect(db.user.destroy).toHaveBeenCalledWith({ where: { id: 1 } });

  // Assert that res.status was called with 200
  expect(res.status).toHaveBeenCalledWith(200);

  // Assert that res.json was called with the correct response object
  expect(res.json).toHaveBeenCalledWith({ count: 1 });
});



