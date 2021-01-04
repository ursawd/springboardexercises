-- write your queries here
SELECT  *
FROM owners o
FULL JOIN vehicles v
ON o.id = v.owner_id ; 

SELECT  o.first_name,o.last_name,COUNT(*)
FROM owners o
JOIN vehicles v
ON o.id = v.owner_id
GROUP BY  o.first_name,o.last_name
ORDER BY o.first_name;

select o.first_name, o.last_name, round(avg(v.price)) as average_price, count(*)
from owners o
join vehicles v on o.id= v.owner_id
group by (o.first_name, o.last_name)
having round(avg(v.price)) > 10000 and count(*) >1
order by first_name desc
;

