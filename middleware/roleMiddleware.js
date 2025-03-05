export const ensureAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
      next();
    } else {
      res.redirect('/auth/login');
    }
  };
  
  export const ensureAdmin = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role === 'admin') {
      next();
    } else {
      res.status(403).send('Access denied.');
    }
  };
  
  export const ensureOrganizer = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role === 'organizer') {
      next();
    } else {
      res.status(403).send('Access denied.');
    }
  };
  
  export const ensureAttendee = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role === 'attendee') {
      next();
    } else {
      res.status(403).send('Access denied.');
    }
  };
  