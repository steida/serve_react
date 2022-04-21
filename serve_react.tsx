import { opine } from "https://deno.land/x/opine@2.1.5/mod.ts";
import React, { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom-server";

function Html() {
  return (
    <html>
      <head>
        <title>React in Deno</title>
        <script defer src="/scripts/client.js"></script>
      </head>
      <body>
        <div id="app" />
      </body>
    </html>
  );
}

const app = opine();

const fileName = Deno.args[0];

app.get("/scripts/client.js", async (_req, res) => {
  const client = await Deno.emit(fileName, {
    bundle: "module",
    compilerOptions: {
      lib: ["dom", "dom.iterable", "esnext"],
    },
    check: false,
    importMap: JSON.parse(Deno.readTextFileSync("./import_map.json")),
    importMapPath: "file:///import_map.json",
  });

  const js = client.files["deno:///bundle.js"];
  res.type("application/javascript").send(js);
});

app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>${renderToStaticMarkup(<Html />)}`);
});

app.listen(3000, () =>
  console.log("server has started on http://localhost:3000 🚀")
);
