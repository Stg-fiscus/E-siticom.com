import { IUser } from "@types";
import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

(window as any).Pusher = Pusher;

export const usePusher = (): Pusher => (window as any).Pusher;

export const useEcho = (user: IUser, host: string): Echo =>
  new Echo({
    broadcaster: "pusher",
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    wsHost: import.meta.env.VITE_PUSHER_HOST,
    wsPort: import.meta.env.VITE_PUSHER_PORT,
    wssPort: import.meta.env.VITE_PUSHER_WSS_PORT,
    forceTLS: true,
    disableStats: true,
    enabledTransports: ["ws", "wss"],
    authorizer: (channel: any, options: any) => {
      return {
        authorize: (socketId: any, callback: any) => {
          axios
            .post(
              `${host}/broadcasting/auth`,
              {
                socket_id: socketId,
                channel_name: channel.name,
              },
              {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              },
            )
            .then((response) => {
              callback(null, response.data);
            })
            .catch((error) => {
              callback(error);
            });
        },
      };
    },
  });
