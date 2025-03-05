// controllers/eventController.js
import { 
    createEvent, 
    getAllEvents, 
    getEventById, 
    updateEvent as updateEventModel, 
    deleteEvent as deleteEventModel 
  } from '../models/eventModel.js';
  import db from '../config/db.js';
  
  // For attendees (all events)
  export const getEvents = (req, res) => {
    getAllEvents((err, results) => {
      if (err) return res.status(500).send('Error fetching events');
      res.render('index', { events: results, user: req.session.user });
    });
  };
  
  export const getEventDetails = (req, res) => {
    const event_id = req.params.event_id;
  
    getEventById(event_id, (err, results) => {
      if (err) return res.status(500).send('Error fetching event details');
      if (results.length === 0) return res.status(404).send('Event not found');
  
      // Ensure user data is passed (from session or request object)
      res.render('eventDetails', { 
        event: results[0], 
        user: req.session.user || null  // Ensure user is defined
      });
    });
  };
  
  // Organizer: Render form to create a new event
  export const renderCreateForm = (req, res) => {
    // Query the database for all event categories
    db.execute('SELECT * FROM EventCategories', (err, categories) => {
      if (err) {
        console.error("Error retrieving categories:", err);
        return res.status(500).send("Internal server error");
      }
      // Render the event creation page and pass the categories
      res.render('eventCreate', { categories, user: req.session.user });
    });
  };
  // Organizer: Create a new event

export const createNewEvent = (req, res) => {
    console.log("Request Body:", req.body);
  
    // Ensure the user is logged in
    if (!req.session.user || !req.session.user.user_id) {
      console.error("No user found in session.");
      return res.status(401).send("User not authenticated");
    }
    
    let { category_id, title, description, event_date, location, available_seats, price } = req.body;
    const organizer_id = req.session.user.user_id;
    
    // Validate required fields
    if (!category_id || !title || !event_date || !location || !available_seats || !price) {
      console.error("Missing required fields:", { category_id, title, event_date, location, available_seats, price });
      return res.status(400).send("Missing required fields");
    }
    
    // Log and convert event_date from "YYYY-MM-DDTHH:mm" to "YYYY-MM-DD HH:mm:ss"
    console.log("Original event_date:", event_date);
    event_date = event_date.replace('T', ' ') + ':00';
    console.log("Converted event_date:", event_date);
    
    // Check if the provided category_id exists in the EventCategories table
    db.execute('SELECT * FROM EventCategories WHERE category_id = ?', [category_id], (err, results) => {
      if (err) {
        console.error("Error checking category:", err);
        return res.status(500).send("Internal server error");
      }
      if (results.length === 0) {
        console.error("Invalid category id:", category_id);
        return res.status(400).send("Invalid category id. Please select a valid category.");
      }
      
      // If category exists, proceed to create the event
      createEvent(
        organizer_id,
        category_id,
        title,
        description,
        event_date,
        location,
        available_seats,
        price,
        (err, result) => {
          if (err) {
            console.error("Error creating event:", err);
            return res.status(500).send('Error creating event');
          }
          console.log("Event created successfully:", result);
          res.redirect('/events/manage');
        }
      );
    });
  };
  
  // Organizer: Render edit form for an event
  export const renderEditForm = (req, res) => {
    const event_id = req.params.event_id;
    getEventById(event_id, (err, results) => {
      if (err) return res.status(500).send('Error fetching event details');
      if (results.length === 0) return res.status(404).send('Event not found');
      res.render('eventEdit', { event: results[0] });
    });
  };
  
  // Organizer: Update an event
  export const updateEvent = (req, res) => {
    const event_id = req.params.event_id;
    const updatedData = req.body;
    updateEventModel(event_id, updatedData, (err, result) => {
      if (err) return res.status(500).send('Error updating event');
      res.redirect('/events/manage');
    });
  };
  
  // Organizer: Delete an event
  export const deleteEvent = (req, res) => {
    const event_id = req.params.event_id;
    deleteEventModel(event_id, (err, result) => {
      if (err) return res.status(500).send('Error deleting event');
      res.redirect('/events/manage');
    });
  };
  
  // Organizer: Get events created by the organizer
  export const getOrganizerEvents = (req, res) => {
    const organizer_id = req.session.user.user_id;
    const query = 'SELECT * FROM Events WHERE organizer_id = ?';
    db.execute(query, [organizer_id], (err, results) => {
      if (err) return res.status(500).send('Error fetching your events');
      res.render('organizerDashboard', { events: results, user: req.session.user });
    });
  };


  
  