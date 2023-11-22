import API from "../../Hooks/API";
export const POST = async ({request, cookies}) => {
  try{
  const { identification, password } = await request.json();
  const {login}= API({token:``});
  const {token, user} = await login({ identification, password });
  cookies.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    expires: new Date(Date.now() + 60 * 60 * 1000),
  });

  return new Response(
    JSON.stringify({token, user}),
    {
      status: 200,
      statusText: "OK",
      headers: {
        "content-type": "application/json",
      },

    }
  )
  }catch(error){
    return new Response(
      JSON.stringify(error),
      {
        status: 400,
        statusText: "Bad Request",
        headers: {
          "content-type": "application/json",
        },
  
      }
    )
  }
}