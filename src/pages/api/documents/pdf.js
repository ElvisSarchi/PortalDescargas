import API from "../../../Hooks/API";

export const POST = async ({ request, cookies }) => {
  try {
    //console.log(identification, password);
    const { id, typeDocument } = await request.json();
    const { getPDF } = API({ token: cookies.get("token").value });
    const resp = await getPDF({ id, typeDocument });
    if (resp.status === 200) {
      return new Response(resp.data, {
        status: 200,
        statusText: "OK",
        headers: {
          "content-type": "application/pdf",
        },
      });
    }
    if (resp.status === 400)
      return new Response(resp, {
        status: 400,
        statusText: "Bad Request",
        headers: {
          "content-type": "application/json",
        },
      });
    if (resp.status === 500)
      return new Response(resp, {
        status: 500,
        statusText: "Internal Server Error",
        headers: {
          "content-type": "application/json",
        },
      });
    return new Response(resp.data, {
      status: 200,
      statusText: "OK",
      headers: {
        "content-type": "application/pdf",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 400,
      statusText: "Bad Request",
      headers: {
        "content-type": "application/json",
      },
    });
  }
};
