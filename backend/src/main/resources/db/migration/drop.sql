USE tlp_perfumedb;

-- Drop dependent tables first
DROP TABLE IF EXISTS Cart_Items;
DROP TABLE IF EXISTS Wishlist;
DROP TABLE IF EXISTS Order_Details;
DROP TABLE IF EXISTS Shipping;
DROP TABLE IF EXISTS Reviews;

-- Drop intermediate tables
DROP TABLE IF EXISTS Cart;
DROP TABLE IF EXISTS Orders;

-- Drop reference tables
DROP TABLE IF EXISTS Promotions;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Admins;

-- Drop parent tables last
DROP TABLE IF EXISTS Payment_Methods;
DROP TABLE IF EXISTS Order_Status;
DROP TABLE IF EXISTS Roles;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Brands;