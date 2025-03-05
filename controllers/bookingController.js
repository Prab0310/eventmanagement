// controllers/bookingController.js
import { createBooking } from '../models/bookingModel.js';
import { createPayment } from '../models/paymentModel.js';

export const bookEvent = (req, res) => {
  const { event_id, seat_number, payment_method, amount, event_title } = req.body;
  console.log(req.body);
  const user_id = req.session.user.user_id;
  
  // Insert booking with pending payment status
  // In controllers/bookingController.js
createBooking(user_id, event_id, seat_number, 'pending', (err, bookingResult) => {
  if (err) return res.status(500).send('Error booking event');
  
  // Ensure the parameters are correct and that a valid callback function is provided
  createPayment(bookingResult.insertId, amount, payment_method, 'pending', (err, paymentResult) => {
    if (err) return res.status(500).send('Error processing payment');
    
    // Date of payment
    let datepayment = new Date();
    res.render('bookingConfirmation', { 
      booking: {
        event_title,
        seat_number,
        payment_status: 'pending',
        booking_date: datepayment
      }
    });
  });
});

};
