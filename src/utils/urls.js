export const ServerURL =
  process.env.NODE_ENV === "dev"
    ? `http://localhost:9000`
    : // : `https://sleepy-wildwood-72675.herokuapp.com`
      `https://5fhn5vxu2e.execute-api.us-east-1.amazonaws.com/dev`