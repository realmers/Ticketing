import nats from "node-nats-streaming";

const stan = nats.connect("gittix", "abc", { url: "http://localhost:4222" });

stan.on("connect", () => {
	console.log("Publisher connected to NATS");
});
