class UserController {
  foo(req, res) {
    res.send("Hello from foo");
  }

  bar(req, res) {
    res.send("Hello from bar");
  }

  qux(req, res) {
    res.send("Hello from qux");
  }

  find(req, res) {
    res.send("Hello from find");
  }
}

module.exports = new UserController()
