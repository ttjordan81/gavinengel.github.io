// Load required packages
var Timezone = require('../models/timezone');

// Create endpoint /api/timezones for POST
exports.postTimezones = function(req, res) {
  // Create a new instance of the Timezone model
  var timezone = new Timezone();

  // Set the timezone properties that came from the POST data
  timezone.userId = req.user._id;
  timezone.city = req.body.city;
  timezone.designation = req.body.designation;
  timezone.zonename = req.body.zonename;
  timezone.difference = req.body.difference;


  // Save the timezone and check for errors
  timezone.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Timezone added to the app!', data: timezone });
  });
};

// Create endpoint /api/timezones for GET
exports.getTimezones = function(req, res) {
  // Use the Timezone model to find all timezone
  Timezone.find({ userId: req.user._id }, function(err, timezones) {
    if (err)
      res.send(err);

    res.json(timezones);
  });
};

// Create endpoint /api/timezones/:timezone_id for GET
exports.getTimezone = function(req, res) {
  // Use the Timezone model to find a specific timezone
  Timezone.find({ userId: req.user._id, _id: req.params.timezone_id }, function(err, timezone) {
    if (err)
      res.send(err);

    res.json(timezone);
  });
};

// Create endpoint /api/timezones/:timezone_id for PUT
exports.putTimezone = function(req, res) {
  // Use the Timezone model to find a specific timezone
  Timezone.update({ userId: req.user._id, _id: req.params.timezone_id }, { quantity: req.body.quantity }, function(err, num, raw) {
    if (err)
      res.send(err);

    res.json({ message: num + ' updated' });
  });
};

// Create endpoint /api/timezones/:timezone_id for DELETE
exports.deleteTimezone = function(req, res) {
  // Use the Timezone model to find a specific timezone and remove it
  Timezone.remove({ userId: req.user._id, _id: req.params.timezone_id }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Timezone removed from the app!' });
  });
};
