import API from "../../../Hooks/API";

export const GET = async ({ request, cookies }) => {
  try {
    //console.log(identification, password);
    const { getDocuments } = API({ token: cookies.get("token").value });
    const { documents } = await getDocuments();
    return new Response(JSON.stringify({ documents }), {
      status: 200,
      statusText: "OK",
      headers: {
        "content-type": "application/json",
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
