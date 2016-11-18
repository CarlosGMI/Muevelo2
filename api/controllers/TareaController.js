/**
 * TareaController
 *
 * @description :: Server-side logic for managing Tareas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = 
{	
	tarea2: function(req, res, next){
		Tarea.find(function foundTarea (err, tarea) {
			if (err) return next(err);

			res.view({
				tarea: tarea
			});
		});
	},


	queries: function(req, res, next)
	{
		var id = req.param('idq');
		console.log("ENTRE"+id);
		if(id == 1)
		{
			var q1 = "Select w.Pelicula, concat(w.Nombre,' ',w.Apellido) as NombreActor, w.Categoria, w.Ingles, w.Descripcion, w.Ciudades from (select f.title as Pelicula, a.first_name as Nombre, a.last_name as Apellido, category.name as Categoria, IF (`language`.name = 'English', ' true', ' false') as Ingles, f.description as Descripcion, count(c.city_id) as Ciudades from film f inner join film_actor fa on f.film_id = fa.film_id inner join actor a on a.actor_id = fa.actor_id inner join film_category fc on f.film_id = fc.film_id inner join category on fc.category_id = category.category_id inner join `language` on f.language_id = `language`.language_id inner join inventory i on i.film_id = f.film_id inner join store on store.store_id = i.store_id inner join address ad on ad.address_id = store.address_id inner join city c on c.city_id = ad.city_id group by f.film_id order by category.name) w;"
			Tarea.query(q1, function(err, results)
			{
				if (err) return res.serverError(err);
				console.log(results);
	  			return res.view({query1: results, id: id});
			});
		}
		else if(id == 2)
		{
			var q2 = "select concat(nombre,' ',apellido) as Empleado, RentasTotales, GananciaTotal from (select s.first_name as nombre, s.last_name as apellido, count(p.rental_id) as RentasTotales, sum(p.amount) as GananciaTotal from staff s inner join payment p on s.staff_id = p.staff_id group by s.staff_id order by RentasTotales desc limit 1) a;"
			Tarea.query(q2, function(err, results)
			{
				if (err) return res.serverError(err);
				console.log("length"+results.length);
	  			return res.view({query2: results, id: id});
			});
		}
		else if(id == 3)
		{
			var q3 = "select f.title as PeliculasNuncaRentadas from film f left outer join inventory i on f.film_id = i.film_id left outer join rental r on r.inventory_id = i.inventory_id where (r.inventory_id IS NULL) group by f.title;"
			Tarea.query(q3, function(err, results)
			{
				if (err) return res.serverError(err);
				console.log(results);
	  			return res.view({query3: results, id: id});
			});
		}
		else
		{
			var q4 = "select distinct concat(d.first_name,' ', d.last_name) as Cliente from( select DATEDIFF(b.return_date,b.rental_date) as dif, c.first_name, c.last_name from payment a inner join rental b on a.rental_id = b.rental_id inner join customer c on b.customer_id = c.customer_id having dif > 3 order by first_name ) d;"
			Tarea.query(q4, function(err, results)
			{
				if (err) return res.serverError(err);
				console.log(results);
	  			return res.view({query4: results, id: id});
			});
		}
	}	
};

