SELECT flight_id, ticket_no, passenger_name, email, phone FROM ticket_flights ORDER BY flight_id;
SELECT flight_id, departure_airport, arrival_airport,scheduled_departure::date, scheduled_arrival::date, seats_available, cost, movie, meal FROM flights WHERE seats_available > 0 ORDER BY departure_airport;