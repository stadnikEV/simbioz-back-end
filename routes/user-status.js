const defineApp = require('../utils/define-app');

const userStatus = (req, res, next) => {
  let User = null;
  let app = defineApp(req.url);

  if (app === 'driver') {
    User = require('../models/user-driver');
  } else {
    User = require('../models/user-passenger');
  }

  if (!req.session.userId || req.session.app !== app) {
    res.json({
      "status": "unknown"
    });
    return;
  }

  User.findById(req.session.userId)
    .then((user) => {
      res.json({
        "status": user.userStatus,
      });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = userStatus;
