const getUserByEmail = async (user_email) => {
  let result = await fetch(
    `${process.env.PRODUCTION_DOMAIN}/api/users?email=${user_email}`
  );
  let response = await result.json();
  let { email, password } = response[0];
  return { email, password };
};

module.exports = { getUserByEmail };
