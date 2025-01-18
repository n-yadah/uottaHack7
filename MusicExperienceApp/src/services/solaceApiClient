import mqtt from "mqtt";
import { solaceConfig } from "../../solace.config";

const connectToSolace = () => {
  const client = mqtt.connect(solaceConfig.host, {
    username: solaceConfig.username,
    password: solaceConfig.password,
    clientId: solaceConfig.clientId,
  });

  client.on("connect", () => {
    console.log("Connected to Solace!");
    client.subscribe("music/vibration", (err) => {
      if (!err) console.log("Subscribed to topic: music/vibration");
    });
  });

  client.on("message", (topic, message) => {
    console.log(`Message from ${topic}:`, message.toString());
  });
};
