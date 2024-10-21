import { Card } from "antd";

export interface INumber {
  title: string;
  value: string;
}

function NumberCard({ title, value }: INumber) {
  return (
    <Card className="shadow-sm">
      <div className="flex flex-col gap-2">
        <h3 className="text-4xl">{title}</h3>
        <div>{value}</div>
      </div>
    </Card>
  );
}

export function Numbers({ numbers }: { numbers: INumber[] }) {
  return (
    <section
      id="numbers"
      className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4"
    >
      {numbers.map((number) => (
        <NumberCard key={number.title} {...number} />
      ))}
    </section>
  );
}
