USE tlp_perfumedb;

-- Bảng Brands
CREATE TABLE IF NOT EXISTS Brands (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    country VARCHAR(100)
) ENGINE=InnoDB;

-- Bảng Categories
CREATE TABLE IF NOT EXISTS Categories (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
) ENGINE=InnoDB;

-- Bảng Payment_Methods
CREATE TABLE IF NOT EXISTS Payment_Methods (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    method_name VARCHAR(255) NOT NULL,
    details TEXT
) ENGINE=InnoDB;

-- Bảng Roles
CREATE TABLE IF NOT EXISTS Roles (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL,
    permissions TEXT
) ENGINE=InnoDB;

-- Bảng Order_Status
CREATE TABLE IF NOT EXISTS Order_Status (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(255) NOT NULL,
    description TEXT
) ENGINE=InnoDB;

-- Bảng Promotions
CREATE TABLE IF NOT EXISTS Promotions (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    promo_code VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    discount_percentage DECIMAL(3,2) NOT NULL CHECK (discount_percentage >= 0 AND discount_percentage <= 1),
    start_date DATE,
    end_date DATE
) ENGINE=InnoDB;

-- Bảng Customers
CREATE TABLE IF NOT EXISTS Customers (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    address TEXT,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Bảng Products
CREATE TABLE IF NOT EXISTS Products (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    image_url VARCHAR(255),
    brand_id INT,
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (brand_id) REFERENCES Brands(ID) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (category_id) REFERENCES Categories(ID) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Bảng Admins
CREATE TABLE IF NOT EXISTS Admins (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES Roles(ID) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Bảng Cart
CREATE TABLE IF NOT EXISTS Cart (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES Customers(ID) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Bảng Wishlist
CREATE TABLE IF NOT EXISTS Wishlist (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES Customers(ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(ID) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE (customer_id, product_id)
) ENGINE=InnoDB;

-- Bảng Orders
CREATE TABLE IF NOT EXISTS Orders (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    payment_method_id INT, -- Made nullable
    total_amount DECIMAL(10,2) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status_id INT, -- Made nullable
    FOREIGN KEY (customer_id) REFERENCES Customers(ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (payment_method_id) REFERENCES Payment_Methods(ID) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (status_id) REFERENCES Order_Status(ID) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Bảng Shipping
CREATE TABLE IF NOT EXISTS Shipping (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL UNIQUE,
    shipping_method VARCHAR(255),
    shipping_address TEXT,
    shipping_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tracking_number VARCHAR(100),
    FOREIGN KEY (order_id) REFERENCES Orders(ID) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Bảng Order_Details
CREATE TABLE IF NOT EXISTS Order_Details (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    promo_code_id INT,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (promo_code_id) REFERENCES Promotions(ID) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Bảng Reviews
CREATE TABLE IF NOT EXISTS Reviews (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    customer_id INT NOT NULL,
    content TEXT,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES Products(ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES Customers(ID) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Bảng Cart_Items
CREATE TABLE IF NOT EXISTS Cart_Items (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES Cart(ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(ID) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE (cart_id, product_id)
) ENGINE=InnoDB;

-- Tạo chỉ mục để tối ưu hóa các truy vấn thường xuyên
CREATE INDEX idx_products_brand_id ON Products(brand_id);
CREATE INDEX idx_products_category_id ON Products(category_id);
CREATE INDEX idx_orders_customer_id ON Orders(customer_id);
CREATE INDEX idx_orders_payment_method_id ON Orders(payment_method_id);
CREATE INDEX idx_orders_status_id ON Orders(status_id);
CREATE INDEX idx_order_details_order_id ON Order_Details(order_id);
CREATE INDEX idx_order_details_product_id ON Order_Details(product_id);
CREATE INDEX idx_order_details_promo_code_id ON Order_Details(promo_code_id);
CREATE INDEX idx_reviews_product_id ON Reviews(product_id);
CREATE INDEX idx_reviews_customer_id ON Reviews(customer_id);
CREATE INDEX idx_cart_items_cart_id ON Cart_Items(cart_id);
CREATE INDEX idx_cart_items_product_id ON Cart_Items(product_id);
CREATE INDEX idx_admins_role_id ON Admins(role_id);
CREATE INDEX idx_wishlist_customer_id ON Wishlist(customer_id);
CREATE INDEX idx_wishlist_product_id ON Wishlist(product_id);