//requerir model

const getRegisteredUsers = (req, res) => {
    res.status(200).send("Aquí irán los usuarios registrados");
    //Recoge datos de la base de datos SQL de los usuarios y los pinta
}

const signup = (req, res) => {
    res.status(200).send("Aquí irá el registro");
}

const loggedUser = (req, res) => {
    res.status(200).send("Aquí irá la vista del usuario registrado");
    //Esto va a llevar un middleware y condicional
}

module.exports = { getRegisteredUsers, signup, loggedUser };