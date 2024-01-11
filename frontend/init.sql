DROP TABLE IF EXISTS clients, months, bookkeeping, vat, eoy;

-- Table clients
CREATE TABLE clients (
  clientid INTEGER PRIMARY KEY,
  clientname text NOT NULL,
  shortname TEXT NOT NULL,
  corporateform TEXT,
  bank TEXT,
  endofyear INTEGER NOT NULL,
  booksfrequency INTEGER,
  VATfrequency INTEGER
);

INSERT INTO
  clients (clientid, clientname, shortname, corporateform, bank, endofyear, booksfrequency, VATfrequency)
VALUES
  (1, 'Krebet Redovisning AB', 'Krebet', 'AB', 'Sparbanken', 2, 1, 1),
  (2, 'Martikainen Måleri', 'M Måleri', 'EF', 'SEB', 12, 1, 3),
  (3, 'Yellow Beak', 'YB', 'AB', 'Svea Bank', 8, 3, 1),
  (4, 'TRIM-LINE Borås', 'Trim-Line', 'EF', 'Nordea', 12, 3, 12);

-- table months
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

--table bookkeeping
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
    INSERT INTO bookkeeping (clientId, monthId, year, IsBookkeepingDone)
    VALUES (clientID, i, 2024, false);
  END LOOP;
END;
$$ LANGUAGE plpgsql;

SELECT insert_bookkeeping_data(1);
SELECT insert_bookkeeping_data(2);
SELECT insert_bookkeeping_data(3);
SELECT insert_bookkeeping_data(4);

--table vat
CREATE TABLE vat (
  recordId SERIAL PRIMARY KEY,
  clientid INT REFERENCES clients(clientID),
  monthId INT REFERENCES months(monthId),
  year INT,
  IsVATDone BOOLEAN
);

CREATE OR REPLACE FUNCTION insert_vat_data(
  clientID INT
)
RETURNS VOID AS $$
DECLARE
  i INT;
BEGIN
  FOR i IN 1..12 LOOP
    INSERT INTO vat (clientId, monthId, year, IsVATDone)
    VALUES (clientID, i, 2024, false);
  END LOOP;
END;
$$ LANGUAGE plpgsql;

SELECT insert_vat_data(1);
SELECT insert_vat_data(2);
SELECT insert_vat_data(3);
SELECT insert_vat_data(4);

-- table end of year
CREATE TABLE eoy (
  recordId SERIAL PRIMARY KEY,
  clientid INT REFERENCES clients(clientID),
  year INT,
  IsStartDone BOOLEAN,
  IsBooksDone BOOLEAN,
  IsReportDone BOOLEAN,
  IsTaxDone BOOLEAN,
  IsReportFiled BOOLEAN,
  IsTaxFiled BOOLEAN
);

INSERT INTO eoy (clientId, year, IsStartDone, IsBooksDone, IsReportDone, IsTaxDone, IsReportFiled, IsTaxFiled)
VALUES
  (1, 2024, true, true, false, false, false, false),
  (2, 2024, true, true, false, false, false, false),
  (3, 2024, true, true, false, false, false, false),
  (4, 2024, true, true, false, false, false, false);
