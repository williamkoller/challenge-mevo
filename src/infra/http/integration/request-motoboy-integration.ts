import { Injectable } from '@nestjs/common';

enum StatusIntegration {
  sucess = 'sucess',
  failed = 'failed',
}

@Injectable()
export class RequestMotoboyIntegration {
  public requestMotoboy(orderId: string): Promise<string | Error> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let status: StatusIntegration;
        const falhou = Math.random() < 0.25;
        if (falhou) {
          return reject(
            new Error(
              `[MOTOBOY] Falha ao agendar entrega do pedido ${orderId}`,
            ),
          );
        }
        console.log(`[MOTOBOY] Pedido ${orderId} enviado para entrega.`);
        resolve((status = StatusIntegration.sucess));
      }, 1000); // simula delay de 1 segundo
    });
  }
}
