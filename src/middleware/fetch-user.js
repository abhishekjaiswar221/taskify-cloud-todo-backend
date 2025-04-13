import jwt from "jsonwebtoken";

const { verify } = jwt;

const fetchUser = (req, res, next) => {
  //Get user forms the jwt token and adds it to the req object.
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ Error: "Please authenticate using a valid token" });
  }
  try {
    const data = verify(token, process.env.JWT_SECRET);
    req.user = data.user;
  } catch (error) {
    res
      .status(401)
      .send({ Error: "Please authenticate using a valid  token" }, error);
  }
  next();
};
export default fetchUser;
