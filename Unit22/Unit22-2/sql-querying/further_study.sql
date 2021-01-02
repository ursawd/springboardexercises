--  FS1. Find the name and rating of the top rated apps in 
--  each category, among apps that have been installed at 
--  least 50,000 times.
   SELECT app_name, rating, category FROM analytics
   WHERE (rating, category)in(
   SELECT MAX(rating), category FROM analytics
      WHERE min_installs >= 50000
      GROUP BY category)

--  FS2. Find all the apps that have a name similar to “facebook”.
SELECT  app_name
FROM analytics
WHERE app_name LIKE '%facebook%'  

--  FS3. Find all the apps that have more than 1 genre.
SELECT  app_name ,genres
FROM analytics
WHERE array_length(genres,1)>1  

--  FS4. Find all the apps that have education as one of their genres.
SELECT  app_name,genres
FROM analytics
WHERE array_position (genres,'Education') >0  