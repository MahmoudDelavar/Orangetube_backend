const controller = require("./../controller");

//-----------------------------------------------------

module.exports = new (class extends controller {
  //----------lode Users Controller-----
  async loadUsers(req, res) {
    let user = await this.User.find()
      .select({ name: 1, email: 1, createdAt: 1 })
      .sort({ createdAt: 1 })
      .exec();
    this.response({ res, code: 200, message: "loaded All Users", data: user });
  }
})();
