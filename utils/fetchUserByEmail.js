const getUserByEmail = async (user_email) => {
  let result = await fetch(`http://localhost:3000/api?email=${user_email}`);
  let response = await result.json();
  let { email, password } = response[0];
  return { email, password };
};

module.exports = { getUserByEmail };
