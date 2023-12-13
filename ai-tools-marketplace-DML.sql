-- Artificial Intelligence Tools Marketplace 
-- Jin Huang

-- Citation for the following queries 
-- Date: 12/08/2023
-- Used basic structure and modified with values for our database 
-- Adapted from sample sql queries on Project Step 3 Draft Version page
-- Source URL: https://canvas.oregonstate.edu/courses/1933532/assignments/9297505
-- Source URL: https://canvas.oregonstate.edu/courses/1933532/pages/exploration-mysql-cascade?module_item_id=23359460

------------------
-- Users --
------------------
-- Select all records in the Users table
SELECT * FROM Users;

-- Select all records in the Users table for Search 
SELECT * FROM Users WHERE user_name LIKE "%${req.query.user_name}%";

-- Select via search
SELECT * FROM Users WHERE user_name LIKE "%${req.query.user_name}%";


-- Add a new user with values provided from the backend (:)
INSERT INTO Users (
	user_name,
	user_location,
	user_website,
	user_industry
) VALUES (
	'${data.user_name}', 
	'${data.user_location}', 
	'${data.user_website}', 
	'${data.user_industry}'
);

-- Update an existing user with values provided from the backend(:)
UPDATE Users 
SET 
	user_website = '${user_website}' WHERE user_id = ${user_id};

-- Delete an existing user with values provided from the backend(:)
DELETE FROM Users WHERE user_id = ${user_id};

------------------
-- Orders --
------------------
-- Select all records in the Orders table 
SELECT
	o.order_id,
	o.user_id,
	u.user_name,
	o.order_date,
	o.order_amount,
	o.payment_complete
FROM 
	Orders o 
LEFT JOIN 
	Users u ON o.user_id = u.user_id
	;

-- SELECT via search
SELECT 
	o.order_id, 
	o.user_id, 
	u.user_name, 
	o.order_date, 
	o.order_amount, 
	o.payment_complete 

FROM Orders o 
LEFT JOIN Users u ON o.user_id = u.user_id WHERE o.order_id = ${req.query.order_id}

-- Add a new order with values provided from the backend (:)
INSERT INTO Orders(
	user_id,
	order_date,
	order_amount,
	payment_complete
) VALUES (
	'${data.user_id}', 
	'${data.order_date}', 
	${data.order_amount}, 
	${data.payment_complete}
);
-- Update an existing order with values provided from the backend(:)
UPDATE Orders 
SET user_id = :user_id,
	order_date = :order_date,
	order_amount = :order_amount,
	payment_complete = :order_amount
WHERE order_id = :order_id_from_html;

-- Delete an existing order with values provided from the backend(:)
DELETE FROM Orders WHERE order_id = :order_id_from_html;

------------------
-- Developers --
------------------
-- Select all records in the Developers table
SELECT * FROM Developers;

-- SELECT via search
SELECT * FROM Developers WHERE dev_name LIKE "%${req.query.dev_name}%";

-- Add a new developer with values provided from the backend (:)
INSERT INTO Developers(
	dev_name,
	dev_location,
	dev_website
) VALUES (
	'${data.dev_name}', 
	'${data.dev_location}', 
	'${data.dev_website}'
);

-- Delete an existing developer with values provided from the backend(:)
DELETE FROM Developers WHERE dev_id = ${dev_id};

------------------
-- AI Tools --
------------------
-- Select all records in the AITools table
SELECT * FROM AITools;

-- Select all records in the AITools table after Search
SELECT * FROM AITools WHERE tool_name LIKE "%${req.query.tool_name}%";

-- Add a new AI Tool with values provided from the backend (:)
INSERT INTO AITools(
	tool_name,
	tool_type,
	price,
	release_date,
	category
) VALUES (
	'${data.tool_name}', 
	'${data.tool_type}', 
	${data.price}, 
	'${data.release_date}', 
	'${data.category}'
);

-- Delete an existing AI Tool with values provided from the backend(:)
DELETE FROM AITools WHERE tool_id = ${tool_id};

------------------
-- Downloads --
------------------
-- Select all records in the Downloads table
SELECT
	d.download_id,
	d.tool_id,
	a.tool_name,
	d.user_id,
	u.user_name,
	d.order_id,
	o.order_date,
	d.download_date,
	d.download_success
FROM 
	Downloads d 
LEFT JOIN 
	AITools a ON d.tool_id = a.tool_id
LEFT JOIN 
	Users u ON d.user_id = u.user_id
LEFT JOIN 
	Orders o ON d.order_id = o.order_id 
	;

-- Select all records in the Downloads table after Search
SELECT 
	d.download_id, 
	d.tool_id, 
	a.tool_name, 
	d.user_id, 
	u.user_name, 
	d.order_id, 
	o.order_date, 
	d.download_date, 
	d.download_success 
FROM Downloads d 
LEFT JOIN 
	AITools a ON d.tool_id = a.tool_id 
LEFT JOIN 
	Users u ON d.user_id = u.user_id 
LEFT JOIN 
	Orders o ON d.order_id = o.order_id 
WHERE d.download_id = ${req.query.download_id}
	;

-- Add a new Download record with values provided from the backend (:)
INSERT INTO Downloads(
	tool_id,
	user_id,
	order_id,
	download_date,
	download_success
) VALUES (
	${data.tool_id}, 
	${data.user_id}, 
	${data.order_id}, 
	'${data.download_date}', 
	${data.download_success}
);
-- Update an existing Download record with values provided from the backend(:)
UPDATE Downloads 
SET tool_id = :tool_id,
	user_id = :user_id,
	order_id = :order_id,
	download_date = :download_date,
	download_success = download_success
WHERE download_id = :download_id_from_html;

-- Delete an existing Download record with values provided from the backend(:)
DELETE FROM Downloads WHERE download_id = ${download_id};

---------------------
-- OrderDetails --M:M
---------------------
-- Select all records in the order details table
SELECT
	od.order_details_id, 
	od.order_id,
	o.user_id,
	u.user_name,
	od.tool_id,
	a.tool_name
FROM 
	OrderDetails od
LEFT JOIN 
	Orders o ON od.order_id = o.order_id
LEFT JOIN 
	Users u ON o.user_id = u.user_id
LEFT JOIN 
	AITools a ON od.tool_id = a.tool_id
	;

-- SELECT via search
SELECT
	od.order_details_id, 
	od.order_id,
	o.user_id,
	u.user_name,
	od.tool_id,
	a.tool_name
FROM 
	OrderDetails od
LEFT JOIN 
	Orders o ON od.order_id = o.order_id
LEFT JOIN 
	Users u ON o.user_id = u.user_id
LEFT JOIN 
	AITools a ON od.tool_id = a.tool_id
WHERE od.order_id = ${req.query.order_id}
	;

-- Add a new order details record with values provided from the backend (:)
INSERT INTO OrderDetails(
	order_id,
	tool_id
) VALUES (
	${data.order_id}, 
	${data.tool_id}
);

-- Delete an existing order details record with values provided from the backend(:)
DELETE FROM OrderDetails WHERE order_details_id = ${order_details_id};

--------------------
-- DevDetails --M:M
--------------------
-- Select all records in the developer details table
SELECT
	dd.dev_details_id,
	dd.tool_id,
	a.tool_name,
	dd.dev_id,
	d.dev_name 
FROM 
	DevDetails dd 
LEFT JOIN 
	AITools a ON dd.tool_id = a.tool_id
LEFT JOIN 
	Developers d ON dd.dev_id = d.dev_id
	;

-- Add a new developer details record with values provided from the backend (:)
INSERT INTO DevDetails(
	tool_id,
	dev_id
) VALUES (
	${data.tool_id},
	${data.dev_id}
);

-- Update an existing order details record with values provided from the backend(:)
UPDATE DevDetails 
SET 
	tool_id = ${tool_id},
	dev_id = ${dev_id} 
WHERE dev_details_id = ${dev_details_id};

-- Delete an existing order details record with values provided from the backend(:)
DELETE FROM DevDetails WHERE dev_details_id =  ${dev_details_id};

