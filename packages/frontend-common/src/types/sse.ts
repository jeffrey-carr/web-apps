export const MESSAGE_LEVELS = ['connection', 'error', 'warning', 'info'] as const;
export type MessageLevel = (typeof MESSAGE_LEVELS)[number];

/** Message is the shape of a message that comes over SSE */
export type Message<T> = {
  level: MessageLevel;
  data: T;
};

/** GenericMessage is the shape of a generic message from the BE.
 * If your app isn't using any special messages, it's probably this. */
export type GenericMessage = Message<{ message: string }>;

const CONNECTION_STATES = ['connected', 'disconnected', 'lobby_closed'] as const;
export type ConnectionState = (typeof CONNECTION_STATES)[number];

/** ConnectionMessage is the shape of the message the BE sends to the FE
 * about its connection state*/
export type ConnectionMessage = Message<{ state: ConnectionState }>;
