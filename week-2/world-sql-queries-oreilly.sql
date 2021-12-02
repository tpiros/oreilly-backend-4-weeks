SELECT * FROM country;

SELECT Name, HeadOfState FROM country;

SELECT Code, Name FROM country limit 10;

SELECT Code, Name FROM country limit 10, 5;

SELECT Name, HeadOfState, FORMAT(Population, 0) FROM country
WHERE Population < 10000000;

SELECT COUNT(Name) FROM country
WHERE Population < 10000000;

SELECT Name, HeadOfState, FORMAT(Population, 0) FROM country
WHERE HeadOFState = "Elisabeth II";

SELECT Name, HeadOfState, FORMAT(Population, 0) FROM country
WHERE HeadOFState IN ("Elisabeth II", "Albert II");

SELECT Name, Population from city;

SELECT Name, Population FROM city
WHERE Population = (SELECT Min(Population) FROM city);

SELECT Name, Population FROM city
WHERE Population = (SELECT Max(Population) FROM city);

SELECT Name, Population from city
WHERE Population BETWEEN 2000000 AND 3000000;

SELECT Name, Population from city
WHERE Population BETWEEN 2000000 AND 3000000
ORDER BY Name;

SELECT Name, Population from city
WHERE Population BETWEEN 2000000 AND 3000000
ORDER BY Population DESC;

SELECT Name, District, Population FROM city WHERE District = 'New York';

SELECT District, SUM(Population) FROM city WHERE District = 'New York' GROUP BY District;

SELECT District, SUM(Population)
FROM city
WHERE CountryCode = 'USA'
GROUP BY District
HAVING SUM(Population) > 3000000
ORDER BY SUM(Population) DESC;

SELECT * FROM city ci
JOIN country co ON ci.CountryCode = co.Code
WHERE ci.Name = "London";

SELECT * FROM city ci
JOIN country co ON ci.CountryCode = co.Code
and ci.Name = "London";

-- Index

-- SHOW INDEX FROM city;
CREATE INDEX my_idx ON city (Name);
DROP INDEX my_idx ON city;
EXPLAIN SELECT * FROM city WHERE Name = 'London';