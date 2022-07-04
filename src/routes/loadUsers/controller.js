const controller = require("./../controller");

//-----------------------------------------------------

module.exports = new (class extends controller {
  //----------lode Users Controller-----
  async loadUsers(req, res) {
    let user = await this.User.find().exec();
    this.response({ res, code: 200, message: "loaded All Users", data: user });
  }
})();
