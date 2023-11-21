import API from "../../Hooks/API";
export const GET = async ({ request, cookies }) => {
  try {
    //console.log(identification, password);
    const { verify } = API({ token: cookies.get("token").value });
    const resp = await verify();

    console.log('entro a verificar');

    return new Response(JSON.stringify({ token, user }), {
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
