const errorHandler = (err, req, res, next) => {
  if (err.name === "ErrorNotFound") {
    res.status(404).json({ name: err.name, message: err.message });
  } else if (err.name === "Unauthenticated") {
    res.status(401).json({ name: err.name, message: "Unauthenticated" });
  } else if (err.name === "Unauthorized") {
    res.status(403).json({ name: err.name, message: "Unauthorized" });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = errorHandler;
