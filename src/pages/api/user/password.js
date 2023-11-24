import API from "../../../Hooks/API";

export const POST = async ({ request, cookies }) => {
  try {
    const { password, newPassword } = await request.json();
    const { updatePassword } = API({ token: cookies.get("token").value });
    const resp = await updatePassword({ password, newPassword });
    console.log(resp);
    return new Response(resp.data, {
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
