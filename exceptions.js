const ErrorCodes = {
  DUP_ENTRY: 0,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500
};

class Exception {
  constructor(errorCode, msg) {
    this.msg = msg;
    this.errorCode = errorCode;
  }
}

class HTTPException extends Exception {
  constructor(statusCode, msg) {
    super(statusCode, msg)
    this.statusCode = statusCode;
  }

  toJSON() {
    return {
      msg: this.msg
    };
  }
}

function defaultErrorMapper(err) {
  if (err instanceof HTTPException) {
    return Promise.resolve(err);
  } else if (err instanceof Exception) {
    switch (err.errorCode) {
      case ErrorCodes.DUP_ENTRY:
        return Promise.resolve(new HTTPException(ErrorCodes.BAD_REQUEST, err.msg));
      default:
        return Promise.reject(`Unknown exception type: ${err}`)
    }
  }
  return Promise.reject(`Unknown exception type: ${err}`)
}

module.exports.renderError = function renderError(res) {
  return function(unmappedErr, errorMapper = defaultErrorMapper) {
    errorMapper(unmappedErr)
      .then((err) => {
        if (err instanceof HTTPException) {
          res.status(err.statusCode).send(err.toJSON());
          return Promise.resolve();
        } else {
          return Promise.reject("Couldn't handle unknown Exception type");
        }
      });
  };
}

module.exports.BadRequest = function BadRequest(msg) {
  return new HTTPException(400, msg);
}

module.exports.DuplicateEntry = function DuplicateEntry(msg) {
  return new Exception(ErrorCodes.DUP_ENTRY, msg);
}
