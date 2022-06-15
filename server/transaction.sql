START TRANSACTION
INSERT INTO customer (customer_name,email,phone,cardno) VALUES($1,$2,$3,$4)
INSERT INTO bookings (book_ref,book_date,total_amount,num_passengers) VALUES($1,CURRENT_TIMESTAMP,$2,$3)
INSERT INTO ticket (ticket_no,book_ref,passenger_name) VALUES($1,$2,$3)
INSERT INTO ticket_flights (ticket_no,flight_id,passenger_name,email,phone,fare_conditions,amount) VALUES ($1,$2,$3,$4,$5,'Economy',$6)
INSERT INTO ticket (ticket_no,book_ref,passenger_name) VALUES($1,$2,$3)
INSERT INTO ticket_flights (ticket_no,flight_id,passenger_name,email,phone,fare_conditions,amount) VALUES ($1,$2,$3,$4,$5,'Economy',$6)
INSERT INTO ticket (ticket_no,book_ref,passenger_name) VALUES($1,$2,$3)
INSERT INTO ticket_flights (ticket_no,flight_id,passenger_name,email,phone,fare_conditions,amount) VALUES ($1,$2,$3,$4,$5,'Economy',$6)
INSERT INTO ticket (ticket_no,book_ref,passenger_name) VALUES($1,$2,$3)
INSERT INTO ticket_flights (ticket_no,flight_id,passenger_name,email,phone,fare_conditions,amount) VALUES ($1,$2,$3,$4,$5,'Economy',$6)
INSERT INTO ticket (ticket_no,book_ref,passenger_name) VALUES($1,$2,$3)
INSERT INTO ticket_flights (ticket_no,flight_id,passenger_name,email,phone,fare_conditions,amount) VALUES ($1,$2,$3,$4,$5,'Economy',$6)
COMMIT TRANSACTION;
START TRANSACTION
UPDATE flights SET seats_available=seats_available-$1 WHERE flight_id = $2
UPDATE flights SET seats_booked=seats_booked+$1 WHERE flight_id = $2
COMMIT TRANSACTION;