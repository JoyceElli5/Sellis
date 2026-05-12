class ResourceNotFoundException extends Error {
  constructor(resource, field, value) {
    super(`${resource} not found with ${field}: ${value}`);
    this.status = 404;
  }
}

class BadRequestException extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

module.exports = { ResourceNotFoundException, BadRequestException };
