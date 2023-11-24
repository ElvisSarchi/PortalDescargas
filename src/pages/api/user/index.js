import API from "../../../Hooks/API";

export const POST = async ({ request, cookies }) => {
  try {
    const { name } = await request.json();
    const { updateProfile } = API({ token: cookies.get("token").value });
    const resp = await updateProfile({ name });
    const user = JSON.parse(cookies.get("user")?.value);
    user.name = name;
    cookies.set("user", user, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      expires: new Date(Date.now() + 60 * 60 * 1000 * 24),
    });

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
