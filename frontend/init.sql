DROP TABLE IF EXISTS clients;

CREATE TABLE clients (
  clientid INTEGER PRIMARY KEY,
  clientname text NOT NULL,
  shortname TEXT NOT NULL,
  corporateform TEXT,
  bank TEXT,
  endofyear INTEGER NOT NULL,
  booksfrequency INTEGER
);

INSERT INTO clients (clientid, clientname, shortname, corporateform, bank, endofyear, booksfrequency)
  VALUES (1, 'Krebet Redovisning AB', 'Krebet', 'AB', 'Sparbanken', 2, 1);

INSERT INTO clients (clientid, clientname, shortname, corporateform, bank, endofyear, booksfrequency)
  VALUES (2, 'Martikainen Måleri', 'M Måleri', 'EF', 'SEB', 12, 3);

INSERT INTO clients (clientid, clientname, shortname, corporateform, bank, endofyear, booksfrequency)
  VALUES (3, 'Yellow Beak', 'YB', 'AB', 'Svea Bank', 8, 3);

INSERT INTO clients (clientid, clientname, shortname, corporateform, bank, endofyear, booksfrequency)
  VALUES (4, 'TRIM-LINE Borås', 'Trim-Line', 'EF', 'Nordea', 12, 1);
