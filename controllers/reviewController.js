import { createReview, getReviewByUserAndEvent } from '../models/reviewModel.js';

export const addReview = async (req, res) => {
  const { event_id, rating, comment } = req.body;
  const user_id = req.session.user.user_id;

  // Validate rating range (e.g., 1 to 5)
  if (rating < 1 || rating > 5) {
    return res.status(400).send("Rating must be between 1 and 5");
  }

  // Validate that comment is not empty
  if (!comment || comment.trim().length === 0) {
    return res.status(400).send("Comment cannot be empty");
  }

  try {
    // Check if the user has already reviewed this event
    const existingReview = await getReviewByUserAndEvent(user_id, event_id);
    if (existingReview) {
      return res.status(400).send("You have already reviewed this event");
    }

    // Create the review
    await createReview(user_id, event_id, rating, comment);

    // Redirect to the event details page
    res.redirect(`/events/event/${event_id}`);
  } catch (err) {
    console.error("Error adding review:", err);
    return res.status(500).send("Error adding review");
  }
};
