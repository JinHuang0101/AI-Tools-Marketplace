-- Artificial Intelligence Tools Marketplace 
-- Group 9
-- Jin Huang
-- Citation for the following queries 
-- Date: 12/08/2023
-- Used basic structure and modified with values for our database 
-- Adapted from sample sql queries on Project Step 3 Draft Version page
-- Source URL: https://canvas.oregonstate.edu/courses/1933532/assignments/9297505

-- Disable foreign key checks and autocommit as recommended in assignment doc
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Developers;
DROP TABLE IF EXISTS AITools;
DROP TABLE IF EXISTS Downloads;
DROP TABLE IF EXISTS OrderDetails;
DROP TABLE IF EXISTS DevDetails;


CREATE TABLE Users(
	user_id int NOT NULL AUTO_INCREMENT,
	user_name varchar(50),
	user_location varchar(50),
	user_website varchar(50),
	user_industry varchar(50),
	PRIMARY KEY (user_id)
);

CREATE TABLE Orders (
	order_id int NOT NULL AUTO_INCREMENT,
	user_id int,
	order_date datetime,
	order_amount int,
	payment_complete BOOLEAN NOT NULL DEFAULT 0,
	PRIMARY KEY (order_id),
	FOREIGN KEY (user_id) 
		REFERENCES Users(user_id)
		ON DELETE CASCADE
);

CREATE TABLE Developers(
	dev_id int NOT NULL AUTO_INCREMENT,
	dev_name varchar(50),
	dev_location varchar(50),
	dev_website varchar(50),
	PRIMARY KEY (dev_id)
);

CREATE TABLE AITools(
	tool_id int NOT NULL AUTO_INCREMENT,
	tool_name varchar(50),
	tool_type varchar(50),  
	price decimal(19,2),
	release_date datetime,
	category varchar(50),
	PRIMARY KEY (tool_id)
);

CREATE TABLE Downloads(
	download_id int NOT NULL AUTO_INCREMENT,
	tool_id int, 
	user_id int, 
	order_id int,
	download_date datetime,
	download_success BOOLEAN NOT NULL DEFAULT 0,
	PRIMARY KEY (download_id),
	FOREIGN KEY (tool_id) 
		REFERENCES AITools(tool_id)
		ON DELETE CASCADE,
	FOREIGN KEY (user_id) 
		REFERENCES Users(user_id)
		ON DELETE CASCADE,
	FOREIGN KEY (order_id) 
		REFERENCES Orders(order_id)
		ON DELETE CASCADE
);

CREATE TABLE OrderDetails(
	order_details_id int NOT NULL AUTO_INCREMENT,
	order_id int,
	tool_id int, 
	PRIMARY KEY (order_details_id),
	CONSTRAINT OrderDetails_OrderID FOREIGN KEY (order_id)
	REFERENCES Orders(order_id)
	ON DELETE CASCADE,
	CONSTRAINT OrderDetails_ToolID FOREIGN KEY (tool_id)
	REFERENCES AITools(tool_id)
	ON DELETE CASCADE
);

CREATE TABLE DevDetails(
	dev_details_id int NOT NULL AUTO_INCREMENT,
	tool_id int,
	dev_id int,
	PRIMARY KEY (dev_details_id),
	CONSTRAINT DevDetails_ToolID FOREIGN KEY (tool_id)
	REFERENCES AITools(tool_id)
	ON DELETE CASCADE,
	CONSTRAINT DevDetails_DevID FOREIGN KEY (dev_id)
	REFERENCES Developers(dev_id)
	ON DELETE CASCADE
);


INSERT INTO Users (
	user_name,
	user_location,
	user_website,
	user_industry
)
VALUES
(
	"Nick James",
	"Boston, MA",
	NULL,
	NULL
),
(
	"Elias Davidson",
	"Seattle, WA",
	"www.eliasdavidson.com",
	"tech"
),
(
	"Alice Larson",
	"San Diego, CA",
	"www.alicelarson.com",
	"finance"
);

SELECT * FROM Users;

INSERT INTO Orders(
	user_id,
	order_date,
	order_amount,
	payment_complete
)
VALUES
(
	"2",
	"20231023",
	"50",
	TRUE
),
(
	"1",
	"20230910",
	"20",
	TRUE
),
(
	"3",
	"20220508",
	"79",
	TRUE
);

SELECT * FROM Orders;

INSERT INTO Developers(
	dev_name,
	dev_location,
	dev_website
)
VALUES
(
	"John Ayers",
	"Los Angeles, CA",
	"www.johnayers.com"
),
(
	"Emily Than",
	"San Francisco, CA",
	"www.emilythan.io"
),
(
	"Blake Aldin",
	"Autin, TX",
	"www.blakealdin.com"
);

SELECT * FROM Developers;

INSERT INTO AITools(
	tool_name,
	tool_type,
	price,
	release_date,
	category
)
VALUES
(
	"email ai",
	"text",
	"30",
	"20230210",
	"email assistant"
),
(
	"post ai",
	"text",
	"20",
	"20220110",
	"social media assistant"
),
(
	"smart image",
	"image",
	"59",
	"20230501",
	"business"
);

SELECT * FROM AITools;

INSERT INTO Downloads(
	tool_id,
	user_id,
	order_id,
	download_date,
	download_success
)
VALUES(
	"1",
	"2",
	"1",
	"20231024",
	TRUE
),
(
	"2",
	"2",
	"1",
	"20231024",
	TRUE
),
(
	"1",
	"1",
	"2",
	"20230910",
	TRUE
),
(
	"3",
	"3",
	"3",
	"20220510",
	FALSE
),
(
	"2",
	"3",
	"3",
	"20220515",
	TRUE
);

SELECT * FROM Downloads;

INSERT INTO OrderDetails(
	order_id,
	tool_id
)
VALUES
(
	"1",
	"1"
),
(
	"1",
	"2"
),
(
	"2",
	"1"
),
(
	"3",
	"3"
),
(
	"3",
	"2"
);


SELECT * FROM OrderDetails;

INSERT INTO DevDetails(
	tool_id,
	dev_id
)
VALUES
(
	"1",
	"2"
),
(
	"1",
	"3"
),
(
	"2",
	"1"
),
(
	"3",
	"1"
),
(
	"3",
	"2"
);

SELECT * FROM DevDetails;


SET FOREIGN_KEY_CHECKS=1;
COMMIT;
