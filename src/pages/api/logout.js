export const DELETE = async ({request, cookies}) => {
  try{
    cookies.delete("token",{
        httpOnly: true,
        secure: true,
        path: "/", 
    });
  return new Response(
    JSON.stringify({token: null, user: null}),
    {
      status: 200,
      statusText: "OK",
      headers: {
        "content-type": "application/json",
      },

    }
  )
  }catch(error){
    console.log(error);
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