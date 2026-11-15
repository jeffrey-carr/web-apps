import { ConnectionMessage } from 'types/sse';
import { makeRequest, sleep } from '.';
import { RouteInformation } from '../types';

export const AvailableSSEStatuses = [
  'connected',
  'connecting',
  'reconnecting',
  'disconnected',
] as const;
export type SSEStatus = (typeof AvailableSSEStatuses)[number];

export const AvailableSSELevels = ['connection', 'error', 'warning', 'info'] as const;
export type SSELevel = (typeof AvailableSSELevels)[number];

// The minimum length of time we wait before attempting to reconnect
const MIN_RECONNECT_BACKOFF = 1000; // 1 second
// The max length we wait for a backoff in milliseconds
const MAX_RECONNECT_BACKOFF = 60000; // 1 minute

export type SSEMessage<T> = {
  level: SSELevel;
  data?: T;
  action?: string;
  error?: {
    message: string;
    stackTrack?: any;
  };
};

export class SSEConnection {
  private status: SSEStatus = 'disconnected';
  private eventSource: EventSource | undefined;

  constructor(
    private endpoint: RouteInformation,
    private disconnectEndpoint: RouteInformation,
    private onerror: (message: SSEMessage<unknown>) => void,
    private onmessage: (message: SSEMessage<unknown>) => void,
    private onstatuschange?: (status: SSEStatus) => void
  ) {}

  // Public methos //

  /**
   *  connect connects to the SSE endpoint of the server
   */
  async connect() {
    this.updateStatus('connecting');
    await this.connectToServer();
    return;
  }

  async reconnect() {
    if (this.status === 'connected') return;
    this.updateStatus('reconnecting');

    let backoff = MIN_RECONNECT_BACKOFF;
    let attempts = 0;

    while (this.status === 'reconnecting') {
      try {
        await this.connectToServer();
      } catch (_) {
        backoff = Math.min(backoff * 2, MAX_RECONNECT_BACKOFF);
        await sleep(backoff);
      }

      attempts++;
    }
  }

  async disconnect() {
    await makeRequest(this.disconnectEndpoint);

    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = undefined;
    }

    this.updateStatus('disconnected');
  }

  getStatus(): SSEStatus {
    return this.status;
  }

  // Private methods //
  private async connectToServer(): Promise<EventSource> {
    return new Promise<EventSource>((resolve, reject) => {
      const ev = new EventSource(this.endpoint.path);
      ev.onopen = () => {
        console.log('Connection opened, waiting for server response');
      };

      ev.onerror = err => {
        console.error('Error from BE', err);
        this.disconnect();
        reject(err);
      };

      // Wait for the original "connected" message from the server
      ev.onmessage = (me: MessageEvent) => {
        let message: ConnectionMessage;
        try {
          message = JSON.parse(me.data) as ConnectionMessage;
        } catch (err) {
          console.error('Failed to parse server message', err);
          return;
        }

        // We are looking for specific messages
        if (message.level !== 'connection') {
          return;
        }

        // Unexpected, keep waiting
        if (message.data.state === 'disconnected') {
          return;
        }
        if (message.data.state === 'lobby_closed') {
          reject('lobby closed');
          return;
        }

        ev.onmessage = this.handleMessage;
        ev.onerror = this.handleErr;

        this.eventSource = ev;
        this.updateStatus('connected');

        resolve(ev);
      };
    });
  }

  private handleErr = (ev: Event) => {
    if (this.eventSource?.readyState === EventSource.CONNECTING) {
      this.updateStatus('reconnecting');
      return;
    }

    this.updateStatus('disconnected');
    this.handleMessage(ev);
  };

  private handleMessage = <T>(ev: Event) => {
    const em = ev as MessageEvent;

    try {
      const data = JSON.parse(em.data) as SSEMessage<T>;
      this.routeMessage(data);
    } catch (err) {
      this.routeMessage({
        level: 'error',
        error: {
          message: 'error parsing message from server',
          stackTrack: err,
        },
      });
      return;
    }
  };

  private routeMessage<T>(message: SSEMessage<T>) {
    switch (message.level) {
      case 'connection':
        const connectionMessage = message as ConnectionMessage;
        switch (connectionMessage.data.state) {
          case 'connected':
            this.updateStatus('connected');
            break;
          case 'disconnected':
            this.reconnect();
            break;
          case 'lobby_closed':
            this.disconnect();
            break;
          default:
            console.error('Unknown connection state from server', connectionMessage.data);
        }
        return;
      case 'error':
        this.onerror(message);
        return;
      default:
        this.onmessage(message);
    }
  }

  private updateStatus(status: SSEStatus) {
    this.status = status;
    this.onstatuschange?.(status);
  }
}
