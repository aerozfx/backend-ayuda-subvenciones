const checkUser = (req, res, next) => {
  if (req.body.email !== "" && req.body.password !== "") {
    let { email, password } = req.body;
    fetch(`http://localhost:3000/api/users?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data[0]?.email) {
          next();
        } else {
          res.send("error");
        }
      });
  } else {
    res.status(200).send("Debes rellenar los campos");
  }
};

module.exports = { checkUser };
