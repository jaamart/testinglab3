DROP TABLE IF EXISTS clients, months, bookkeeping;

CREATE TABLE clients (
  clientid INTEGER PRIMARY KEY,
  clientname text NOT NULL,
  shortname TEXT NOT NULL,
  corporateform TEXT,
  bank TEXT,
  endofyear INTEGER NOT NULL,
  booksfrequency INTEGER
);

INSERT INTO
  clients (clientid, clientname, shortname, corporateform, bank, endofyear, booksfrequency)
VALUES
  (1, 'Krebet Redovisning AB', 'Krebet', 'AB', 'Sparbanken', 2, 1),
  (2, 'Martikainen Måleri', 'M Måleri', 'EF', 'SEB', 12, 3),
  (3, 'Yellow Beak', 'YB', 'AB', 'Svea Bank', 8, 3),
  (4, 'TRIM-LINE Borås', 'Trim-Line', 'EF', 'Nordea', 12, 1);

CREATE TABLE months (
  monthId INTEGER PRIMARY KEY,
  monthName TEXT
);

INSERT INTO
  months (monthId, monthName)
VALUES
  (1, 'Januari'),
  (2, 'Februari'),
  (3, 'Mars'),
  (4, 'April'),
  (5, 'Maj'),
  (6, 'Juni'),
  (7, 'Juli'),
  (8, 'Augusti'),
  (9, 'September'),
  (10, 'Oktober'),
  (11, 'November'),
  (12, 'December');

CREATE TABLE bookkeeping (
  recordId SERIAL PRIMARY KEY,
  clientid INT REFERENCES clients(clientID),
  monthId INT REFERENCES months(monthId),
  year INT,
  IsBookkeepingDone BOOLEAN
);

CREATE OR REPLACE FUNCTION insert_bookkeeping_data(
  clientID INT
)
RETURNS VOID AS $$
DECLARE
  i INT;
BEGIN
  FOR i IN 1..12 LOOP
    -- Använd INSERT INTO för att lägga till rader i tabellen
    INSERT INTO bookkeeping (clientId, monthId, year, IsBookkeepingDone)
    VALUES (clientID, i, 2024, false);
  END LOOP;
END;
$$ LANGUAGE plpgsql;

SELECT insert_bookkeeping_data(1);
SELECT insert_bookkeeping_data(2);
SELECT insert_bookkeeping_data(3);
SELECT insert_bookkeeping_data(4);
