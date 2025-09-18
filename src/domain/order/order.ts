export type OrderProps = {
  buyer: { name: string; cpf: string };
  items: Array<{ name: string; quantity: number; price: number }>;
  status: 'pendente' | 'na entrega' | 'faturado' | 'entregue' | 'cancelado';
};

export class Order {
  constructor(private readonly props: OrderProps) {}

  get buyer(): { name: string; cpf: string } {
    return this.props.buyer;
  }

  get items(): Array<{ name: string; quantity: number; price: number }> {
    return this.props.items;
  }

  get status():
    | 'pendente'
    | 'na entrega'
    | 'faturado'
    | 'entregue'
    | 'cancelado' {
    return this.props.status;
  }

  static create(props: OrderProps): Order {
    return new Order(props);
  }

  public updateStatus(
    status: 'pendente' | 'na entrega' | 'faturado' | 'entregue' | 'cancelado',
  ): 'pendente' | 'na entrega' | 'faturado' | 'entregue' | 'cancelado' {
    if (this.props.status === 'entregue') {
      throw new Error('blocked');
    }
    return (this.props.status = status);
  }
}
