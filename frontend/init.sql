DROP TABLE IF EXISTS clients;

CREATE TABLE clients (
  clientid INTEGER PRIMARY KEY,
  clientname text NOT NULL,
  shortname TEXT NOT NULL,
  corporateform TEXT,
  bank TEXT,
  endofyear INTEGER NOT NULL
);

INSERT INTO clients (clientid, clientname, shortname, corporateform, bank, endofyear)
  VALUES (1, 'Krebet Redovisnings AB', 'Krebet', 'AB', 'Sparbanken', 2);

INSERT INTO clients (clientid, clientname, shortname, corporateform, bank, endofyear)
  VALUES (2, 'Martikainen Måleri', 'M Måleri', 'EF', 'SEB', 12);

INSERT INTO clients (clientid, clientname, shortname, corporateform, bank, endofyear)
  VALUES (3, 'Yellow Beak', 'YB', 'AB', 'Svea Bank', 8);

INSERT INTO clients (clientid, clientname, shortname, corporateform, bank, endofyear)
  VALUES (4, 'TRIM-LINE Borås', 'Trim-Line', 'EF', 'Nordea', 12);
