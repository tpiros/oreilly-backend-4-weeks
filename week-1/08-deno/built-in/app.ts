const server = Deno.listen({ port: 8080 });
console.log(`Server is up 🚀 http://localhost:8080/`);

for await (const conn of server) {
  serveHttp(conn);
}

async function serveHttp(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);

  for await (const requestEvent of httpConn) {
    const body = `Your user-agent is: ${
      requestEvent.request.headers.get('user-agent') ?? 'Unknown'
    }`;
    requestEvent.respondWith(
      new Response(body, {
        status: 200,
      })
    );
  }
}
