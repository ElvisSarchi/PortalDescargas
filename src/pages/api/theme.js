export const GET = async ({ request, cookies }) => {
  try {
    //console.log(identification, password);
    const theme = cookies.get("theme")?.value || "light";

    return new Response(JSON.stringify({ theme }), {
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

export const POST = async ({ request, cookies }) => {
  try {
    const { theme } = await request.json();
    cookies.set("theme", theme, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });

    return new Response(JSON.stringify({ theme }), {
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
