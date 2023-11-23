export const GET = async ({ request, cookies }) => {
  try {
    //console.log(identification, password);
    const token = cookies.get("token")?.value;
    if (!token) {
      return new Response(JSON.stringify({ token: null, user: null }), {
        status: 401,
        statusText: "Unauthorized",
        headers: {
          "content-type": "application/json",
        },
      });
    }
    return new Response(JSON.stringify({ token }), {
      status: 200,
      statusText: "OK",
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      status: 400,
      statusText: "Bad Request",
      headers: {
        "content-type": "application/json",
      },
    });
  }
};
