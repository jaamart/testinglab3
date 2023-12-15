DROP TABLE IF EXISTS clients;

CREATE TABLE clients (
  clientid INTEGER PRIMARY KEY,
  clientname text NOT NULL,
  shortname TEXT NOT NULL,
  bank TEXT,
  endofyear INTEGER NOT NULL
);

INSERT INTO clients (clientid, clientname, shortname, bank, endofyear)
  VALUES (1, 'IT-högskolan', 'ITHS', 'Nordea', 12);
